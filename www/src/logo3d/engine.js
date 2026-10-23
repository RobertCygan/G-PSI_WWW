// @ts-nocheck
const TEX = 512;
const scratch = {
  solid: new Uint8Array(TEX * TEX),
  vis: new Uint8Array(TEX * TEX),
  q: new Int32Array(TEX * TEX),
};

export function mountLogo(canvas, options = {}) {
  const src = options.src ?? "./assets/intro.mp4";
  const poster = options.poster ?? "./assets/poster.png";
  const reduced =
    options.reduced ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
  });
  if (!gl) return mountFlat(canvas, { src, poster, reduced });

  const program = programOf(gl);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1, 0, 0, 0, 1, -1, 0, 1, 0, -1, 1, 0, 0, 1, 1, 1, 0, 1, 1,
    ]),
    gl.STATIC_DRAW,
  );

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const work = document.createElement("canvas");
  work.width = TEX;
  work.height = TEX;
  const ctx = work.getContext("2d", { willReadFrequently: true });

  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = !reduced;
  video.loop = false;
  video.poster = poster;
  video.setAttribute("playsinline", "");
  video.style.cssText = "position:fixed;width:2px;height:2px;opacity:0;pointer-events:none";
  document.body.appendChild(video);

  const pointer = { x: 0, y: 0 };
  const onMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointer.y = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  };
  canvas.addEventListener("pointermove", onMove);

  let frame = 0;
  let stopped = false;
  const draw = () => {
    if (stopped) return;
    resize(canvas);
    const image = reduced ? null : video;
    paint(ctx, image, posterImage);
    const pixels = ctx.getImageData(0, 0, TEX, TEX);
    cutBackground(pixels);
    ctx.putImageData(pixels, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, work);
    render(gl, program, buffer, pose(video, pointer, reduced));
    if (!reduced) frame = requestAnimationFrame(draw);
  };

  const posterImage = new Image();
  posterImage.src = poster;

  const start = () => {
    if (reduced) {
      posterImage.onload = () => draw();
      if (posterImage.complete) draw();
      return;
    }
    video.play().catch(() => {});
    frame = requestAnimationFrame(draw);
  };

  if (video.readyState >= 2) start();
  else video.addEventListener("loadeddata", start, { once: true });

  return {
    destroy() {
      stopped = true;
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onMove);
      video.remove();
      video.pause();
      video.removeAttribute("src");
      video.load();
    },
  };
}

function mountFlat(canvas, { src, poster, reduced }) {
  const ctx = canvas.getContext("2d");
  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.playsInline = true;
  let frame = 0;
  let stopped = false;
  const draw = () => {
    if (stopped) return;
    const size = resize2d(canvas);
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(video.readyState >= 2 ? video : posterImage, 0, 0, size, size);
    if (!reduced && video.readyState >= 2) {
      const pixels = ctx.getImageData(0, 0, size, size);
      cutBackground(pixels);
      ctx.putImageData(pixels, 0, 0);
    }
    if (!reduced) frame = requestAnimationFrame(draw);
  };
  const posterImage = new Image();
  posterImage.src = poster;
  posterImage.onload = () => {
    if (reduced) {
      resize2d(canvas);
      ctx.drawImage(posterImage, 0, 0, canvas.width, canvas.height);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      cutBackground(pixels);
      ctx.putImageData(pixels, 0, 0);
    }
  };
  if (!reduced) {
    video.addEventListener("loadeddata", () => {
      video.play().catch(() => {});
      frame = requestAnimationFrame(draw);
    });
  }
  return {
    destroy() {
      stopped = true;
      cancelAnimationFrame(frame);
      video.pause();
    },
  };
}

function resize2d(canvas) {
  const size = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)) || TEX;
  if (canvas.width !== size) {
    canvas.width = size;
    canvas.height = size;
  }
  return size;
}

function paint(ctx, video, poster) {
  ctx.clearRect(0, 0, TEX, TEX);
  if (video && video.readyState >= 2) ctx.drawImage(video, 0, 0, TEX, TEX);
  else if (poster && poster.complete && poster.naturalWidth) ctx.drawImage(poster, 0, 0, TEX, TEX);
}

function cutBackground(image) {
  const { data, width: w, height: h } = image;
  const n = w * h;
  const solid = scratch.solid;
  const vis = scratch.vis;
  const q = scratch.q;
  solid.fill(0);
  vis.fill(0);
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const m = r > g ? (r > b ? r : b) : g > b ? g : b;
    const rg = r > g ? r : g;
    if ((b - rg > 10 && b > 32) || m > 34) solid[i] = 1;
  }
  let qe = 0;
  let qs = 0;
  const push = (i) => {
    if (vis[i] || solid[i]) return;
    vis[i] = 1;
    q[qe++] = i;
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (qs < qe) {
    const i = q[qs++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x + 1 < w) push(i + 1);
    if (y > 0) push(i - w);
    if (y + 1 < h) push(i + w);
  }
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    if (vis[i]) {
      data[p + 3] = 0;
      continue;
    }
    const x = i % w;
    const y = (i / w) | 0;
    const edge =
      (x > 0 && vis[i - 1]) ||
      (x + 1 < w && vis[i + 1]) ||
      (y > 0 && vis[i - w]) ||
      (y + 1 < h && vis[i + w]);
    if (!edge) {
      data[p + 3] = 255;
      continue;
    }
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const m = r > g ? (r > b ? r : b) : g > b ? g : b;
    data[p + 3] = m > 96 ? 255 : Math.max(0, Math.min(255, (m - 16) * 4));
  }
}

function pose(video, pointer, reduced) {
  if (reduced) return { x: pointer.x * 0.08, y: pointer.y * 0.1, z: 0 };
  const t = video.currentTime || 0;
  const intro = Math.min(1, t / 1.8);
  const e = 1 - (1 - intro) ** 3;
  if (intro < 1) {
    return {
      x: (1 - e) * 0.12 + pointer.x * 0.08,
      y: (1 - e) * 0.2 + pointer.y * 0.1,
      z: (1 - e) * -0.28,
    };
  }
  return {
    x: Math.cos(t * 0.5) * 0.035 + pointer.x * 0.08,
    y: Math.sin(t * 0.65) * 0.05 + pointer.y * 0.1,
    z: 0,
  };
}

function resize(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(2, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(2, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

function render(gl, program, buffer, poseValue) {
  const w = gl.canvas.width;
  const h = gl.canvas.height;
  gl.viewport(0, 0, w, h);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(program.pos);
  gl.vertexAttribPointer(program.pos, 3, gl.FLOAT, false, 20, 0);
  gl.enableVertexAttribArray(program.uv);
  gl.vertexAttribPointer(program.uv, 2, gl.FLOAT, false, 20, 12);
  const mvp = new Float32Array(16);
  camera(mvp, w / h, poseValue.x, poseValue.y, poseValue.z);
  gl.uniformMatrix4fv(program.mvp, false, mvp);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function camera(out, aspect, rotX, rotY, z) {
  const p = new Float32Array(16);
  const v = new Float32Array(16);
  const m = new Float32Array(16);
  const pv = new Float32Array(16);
  perspective(p, 0.62, aspect, 0.1, 20);
  identity(v);
  v[14] = -2.7;
  model(m, rotX, rotY, z);
  multiply(pv, p, v);
  multiply(out, pv, m);
}

function model(m, rotX, rotY, z) {
  const cx = Math.cos(rotX);
  const sx = Math.sin(rotX);
  const cy = Math.cos(rotY);
  const sy = Math.sin(rotY);
  m[0] = cy;
  m[1] = sx * sy;
  m[2] = cx * sy;
  m[3] = 0;
  m[4] = 0;
  m[5] = cx;
  m[6] = -sx;
  m[7] = 0;
  m[8] = -sy;
  m[9] = sx * cy;
  m[10] = cx * cy;
  m[11] = 0;
  m[12] = 0;
  m[13] = 0;
  m[14] = z;
  m[15] = 1;
}

function identity(m) {
  m.fill(0);
  m[0] = m[5] = m[10] = m[15] = 1;
}

function perspective(m, fov, aspect, near, far) {
  m.fill(0);
  const f = 1 / Math.tan(fov / 2);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
}

function multiply(out, a, b) {
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] =
        a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
  }
}

function programOf(gl) {
  const vs = compile(
    gl,
    gl.VERTEX_SHADER,
    `attribute vec3 aPos;attribute vec2 aUv;uniform mat4 uMvp;varying vec2 vUv;void main(){vUv=aUv;gl_Position=uMvp*vec4(aPos*0.92,1.0);}`,
  );
  const fs = compile(
    gl,
    gl.FRAGMENT_SHADER,
    `precision mediump float;uniform sampler2D uMap;varying vec2 vUv;void main(){vec4 c=texture2D(uMap,vUv);if(c.a<0.04) discard;gl_FragColor=c;}`,
  );
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return {
    program,
    pos: gl.getAttribLocation(program, "aPos"),
    uv: gl.getAttribLocation(program, "aUv"),
    mvp: gl.getUniformLocation(program, "uMvp"),
  };
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

if (typeof document !== "undefined") {
  const auto = document.querySelector("canvas[data-logo3d]");
  if (auto) {
    mountLogo(auto, {
      src: auto.getAttribute("data-src") || "./assets/intro.mp4",
      poster: auto.getAttribute("data-poster") || "./assets/poster.png",
    });
    document.querySelectorAll("[data-bg]").forEach((button) => {
      button.addEventListener("click", () => {
        document.body.dataset.bg = button.getAttribute("data-bg") || "dark";
      });
    });
  }
}
