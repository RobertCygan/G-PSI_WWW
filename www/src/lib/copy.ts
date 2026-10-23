export type Lang = "no" | "en";

export type Capability = {
  id: string;
  title: string;
  text: string;
  keys: string[];
};

export type Project = {
  id: string;
  title: string;
  status: string;
  text: string;
  href: string;
  file: string;
  preview: string;
};

export type Copy = {
  meta: { homeTitle: string; homeDescription: string };
  nav: {
    home: string;
    solutions: string;
    projects: string;
    technology: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
    skip: string;
    lang: string;
  };
  hero: { position: string; prompt: string; promptLabel: string };
  home: {
    capabilitiesKicker: string;
    capabilitiesTitle: string;
    worksKicker: string;
    worksTitle: string;
    worksLead: string;
    openSurface: string;
    approachKicker: string;
    approachTitle: string;
    approach: string[];
    ctaTitle: string;
    ctaText: string;
    cta: string;
  };
  capabilities: Capability[];
  solutions: { kicker: string; title: string; lead: string };
  projects: {
    kicker: string;
    title: string;
    lead: string;
    open: string;
    running: string;
    items: Project[];
  };
  technology: {
    kicker: string;
    title: string;
    lead: string;
    items: { title: string; text: string }[];
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    items: { title: string; text: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    name: string;
    email: string;
    org: string;
    message: string;
    send: string;
    privacy: string;
    missing: string;
    invalidEmail: string;
    ready: string;
    address: string;
  };
  footer: { note: string; repo: string };
};

const capabilitiesNo: Capability[] = [
  {
    id: "ai",
    title: "Kunstig intelligens",
    text: "Modeller bare der de korter et konkret løp. Resultatet skal kunne forklares, ikke bare vises.",
    keys: ["ai", "ki", "kunstig", "modell", "intellig", "model"],
  },
  {
    id: "finance",
    title: "Finansiell intelligens",
    text: "Regnskap, satser og avvik lest som drift. Ikke enda en rapport som blir liggende.",
    keys: ["finans", "regnskap", "skatt", "økonom", "budget", "finance", "konto"],
  },
  {
    id: "data",
    title: "Dataanalyse",
    text: "Fra rå transaksjoner til en oversikt en saksbehandler faktisk kan bruke.",
    keys: ["data", "analyse", "analyt", "dashboard", "kostra"],
  },
  {
    id: "auto",
    title: "Prosessautomatisering",
    text: "Gjentatte løp i kontor og industri, koblet fra inntak til handling.",
    keys: ["auto", "prosess", "flyt", "industri", "kontor", "workflow"],
  },
  {
    id: "software",
    title: "Programvare",
    text: "Kart, kalkulatorer og interne flater. Bygget for å stå alene, ikke som en demo.",
    keys: ["program", "kode", "software", "utvikl", "app", "web", "side"],
  },
  {
    id: "gov",
    title: "GovTech",
    text: "Formet etter kommunal praksis, innsyn og de språkene arbeidet faktisk skjer på.",
    keys: ["gov", "kommune", "offent", "innsyn", "sektor"],
  },
];

const capabilitiesEn: Capability[] = [
  {
    id: "ai",
    title: "Artificial intelligence",
    text: "Models only where they shorten a concrete piece of work. The result has to be explainable, not just shown.",
    keys: ["ai", "ki", "kunstig", "modell", "intellig", "model"],
  },
  {
    id: "finance",
    title: "Financial intelligence",
    text: "Accounts, rates and exceptions read as operations. Not another report that sits unopened.",
    keys: ["finans", "regnskap", "skatt", "økonom", "budget", "finance", "konto"],
  },
  {
    id: "data",
    title: "Data analytics",
    text: "From raw transactions to a view a case worker can actually use.",
    keys: ["data", "analyse", "analyt", "dashboard", "kostra"],
  },
  {
    id: "auto",
    title: "Process automation",
    text: "Repeated office and industrial flows, connected from intake to action.",
    keys: ["auto", "prosess", "flyt", "industri", "kontor", "workflow"],
  },
  {
    id: "software",
    title: "Software engineering",
    text: "Maps, calculators and internal tools. Built to stand alone, not as a demo.",
    keys: ["program", "kode", "software", "utvikl", "app", "web", "side"],
  },
  {
    id: "gov",
    title: "GovTech",
    text: "Shaped by municipal practice, public scrutiny and the languages the work is done in.",
    keys: ["gov", "kommune", "offent", "innsyn", "sektor"],
  },
];

export const copy: Record<Lang, Copy> = {
  no: {
    meta: {
      homeTitle: "G-PSI — GovTech Solutions",
      homeDescription:
        "G-PSI bygger systemer for offentlig sektor: automatisering, analyse og programvare som kan forklares.",
    },
    nav: {
      home: "Forside",
      solutions: "Løsninger",
      projects: "Prosjekter",
      technology: "Teknologi",
      about: "Om",
      contact: "Kontakt",
      menu: "Meny",
      close: "Lukk meny",
      skip: "Hopp til innhold",
      lang: "Språk",
    },
    hero: {
      position: "Ingeniørarbeid for offentlig sektor. Automatisering, analyse og systemer som tåler innsyn.",
      prompt: "Hva skal vi automatisere?",
      promptLabel: "Hva skal vi automatisere?",
    },
    home: {
      capabilitiesKicker: "Arbeid",
      capabilitiesTitle: "Seks felt. Ingen av dem er et slagord.",
      worksKicker: "Arbeider",
      worksTitle: "Fire filer. Ingen av dem er en skisse.",
      worksLead: "Hvert arbeid er den HTML-filen som ligger i depotet. Statusen er den filen selv oppgir.",
      openSurface: "Åpne flaten",
      approachKicker: "Fremgangsmåte",
      approachTitle: "Først løpet. Så verktøyet.",
      approach: [
        "Vi starter i oppgaven som allerede finnes: et regnskap, en taksering, en kø av like saker.",
        "Automatisering kommer der stegene er stabile. Analyse der tallene allerede er der.",
        "KI brukes når den gjør et avgrenset arbeid kortere, og lar seg etterprøve.",
      ],
      ctaTitle: "Et konkret løp er nok til å begynne.",
      ctaText: "Beskriv hva som gjentas, eller hva som ikke lar seg lese i dag.",
      cta: "Ta kontakt",
    },
    capabilities: capabilitiesNo,
    solutions: {
      kicker: "Løsninger",
      title: "Det vi faktisk bygger.",
      lead: "Ikke en katalog av alt som kan hete KI. Felt der G-PSI tar arbeid fra rådata til en flate noen kan stå inne for.",
    },
    projects: {
      kicker: "Prosjekter",
      title: "Utvalg fra arbeidet. Statusen står på hver enkelt.",
      lead: "Ingen oppdiktede kunder og ingen resultattall. Det som ligger her, er filer fra depotet, med den statusen de selv har.",
      open: "Åpne filen",
      running: "Filen kjører i rammen under. Ingenting er byttet ut med en mockup.",
      items: [
        {
          id: "steigen",
          title: "Steigen — utgiftsanalyse",
          status: "Utviklingsprosjekt",
          text: "Regnskapsår 2016–2025: oversikt, kategorier, leverandører, KOSTRA, transaksjoner og datakvalitet. G-PSI Analytics, ikke merket som kommunens offisielle system.",
          href: "/prosjekter/Steigen.html",
          file: "Steigen.html",
          preview: "/prosjekter/previews/steigen.jpg",
        },
        {
          id: "skatt-kart",
          title: "Eiendomsskatt per grunnkrets",
          status: "Utviklingsprosjekt",
          text: "Kart og tabell for Steigen, med årslinje og skille mellom skatteplikt og fritak. Kartet bruker WebGL. Tabell og grafer står igjen uten.",
          href: "/prosjekter/eiendomsskatt-steigen.html",
          file: "eiendomsskatt-steigen.html",
          preview: "/prosjekter/previews/skatt.jpg",
        },
        {
          id: "kalkulator",
          title: "Beregn eiendomsskatt",
          status: "Prototype",
          text: "Filen sier det selv: ikke kommunens offisielle kalkulator. Satser fra takseringsretningslinjene 2019. Overslag for bolig, andre bygg eller tomt.",
          href: "/prosjekter/kalkulator.html",
          file: "kalkulator.html",
          preview: "/prosjekter/previews/kalkulator.jpg",
        },
        {
          id: "laanndet",
          title: "Lånndet",
          status: "Konsept",
          text: "Lei ting av folk i nærheten. En selvstendig research-demo. Annonser på siden er eksempler, ikke ekte utleie.",
          href: "/prosjekter/Laanndet.html",
          file: "Laanndet.html",
          preview: "/prosjekter/previews/laanndet.jpg",
        },
      ],
    },
    technology: {
      kicker: "Teknologi",
      title: "Slik er arbeidet skrudd sammen.",
      lead: "Ingen sertifiseringer vi ikke har, og ingen arkitekturtegning for syns skyld.",
      items: [
        {
          title: "Ingeniørgrep",
          text: "Små, lesbare flater. Et verktøy skal kunne åpnes, brukes og forklares uten en plattform rundt.",
        },
        {
          title: "Databehandling",
          text: "Rådata forblir sporbar. Aggregering er et lag oppå, ikke en erstatning for kilden.",
        },
        {
          title: "KI i løpet",
          text: "Modellen sitter i et avgrenset steg. Den får ikke lov til å være hele produktet.",
        },
        {
          title: "Informasjonssikkerhet",
          text: "Minst mulig lagres. Kontaktskjemaet på denne siden sender ingenting til en server her.",
        },
        {
          title: "Arkitektur",
          text: "Statisk der det holder. Modulært der flaten må vokse. WebGL er et tillegg, aldri en forutsetning for å lese tallene.",
        },
      ],
    },
    about: {
      kicker: "Om G-PSI",
      title: "GovTech Solutions.",
      lead: "G og Ψ sitter i samme emblem. Merket tegnes ikke om, og navnet skrives G-PSI.",
      items: [
        {
          title: "Hensikt",
          text: "Offentlig teknologi som en fagperson kan forsvare overfor innbyggeren som spør hvor tallet kommer fra.",
        },
        {
          title: "Arbeidsmåte",
          text: "Først det som gjentas eller ikke lar seg lese. Så et system som gjør akkurat det, og stopper der.",
        },
        {
          title: "Ansvar",
          text: "Vi oppgir ikke kunder vi ikke har, og ikke treffprosenter vi ikke har målt. Prosjektsidene sier hvilken status arbeidet har.",
        },
      ],
    },
    contact: {
      kicker: "Kontakt",
      title: "Skriv hva som skal bort av manuelt arbeid.",
      lead: "Meldingen åpnes i e-postprogrammet ditt til kontakt@gpsi.ai. Denne siden lagrer den ikke.",
      name: "Navn",
      email: "E-post",
      org: "Virksomhet",
      message: "Melding",
      send: "Åpne e-post",
      privacy:
        "Skjemaet sender ingenting til en server. Det legger teksten i en e-post til kontakt@gpsi.ai. Ikke ta med sensitive personopplysninger.",
      missing: "Fyll inn navn, en gyldig e-post og en melding.",
      invalidEmail: "E-postadressen ser ikke gyldig ut.",
      ready: "Hvis e-postprogrammet ikke åpnet seg, send selv til kontakt@gpsi.ai.",
      address: "kontakt@gpsi.ai",
    },
    footer: {
      note: "G-PSI · GovTech Solutions",
      repo: "Kildekode for prosjektene",
    },
  },
  en: {
    meta: {
      homeTitle: "G-PSI — GovTech Solutions",
      homeDescription:
        "G-PSI builds systems for the public sector: automation, analysis and software that can be explained.",
    },
    nav: {
      home: "Home",
      solutions: "Solutions",
      projects: "Projects",
      technology: "Technology",
      about: "About",
      contact: "Contact",
      menu: "Menu",
      close: "Close menu",
      skip: "Skip to content",
      lang: "Language",
    },
    hero: {
      position: "Engineering for the public sector. Automation, analysis and systems that hold up to scrutiny.",
      prompt: "What should we automate?",
      promptLabel: "What should we automate?",
    },
    home: {
      capabilitiesKicker: "Work",
      capabilitiesTitle: "Six fields. None of them is a slogan.",
      worksKicker: "Work",
      worksTitle: "Four files. None of them is a sketch.",
      worksLead: "Each piece of work is the HTML file that sits in the repository. The status is the one the file itself states.",
      openSurface: "Open the surface",
      approachKicker: "Approach",
      approachTitle: "The workflow first. Then the tool.",
      approach: [
        "We start from the task that already exists: an account, a valuation, a queue of identical cases.",
        "Automation goes where the steps are stable. Analysis goes where the figures are already there.",
        "AI is used when it shortens a bounded task and can be checked.",
      ],
      ctaTitle: "One concrete workflow is enough to start.",
      ctaText: "Describe what repeats, or what cannot be read today.",
      cta: "Contact",
    },
    capabilities: capabilitiesEn,
    solutions: {
      kicker: "Solutions",
      title: "What we actually build.",
      lead: "Not a catalogue of everything that can be called AI. Fields where G-PSI takes work from raw data to a surface someone can stand behind.",
    },
    projects: {
      kicker: "Projects",
      title: "A selection of the work. Each one carries its own status.",
      lead: "No invented clients and no performance figures. What is here are files from the repository, with the status they already claim.",
      open: "Open the file",
      running: "The file is running in the frame below. Nothing has been replaced with a mockup.",
      items: [
        {
          id: "steigen",
          title: "Steigen — expenditure analysis",
          status: "Development project",
          text: "Accounting years 2016–2025: overview, categories, suppliers, KOSTRA, transactions and data quality. G-PSI Analytics, not labelled as the municipality's official system.",
          href: "/prosjekter/Steigen.html",
          file: "Steigen.html",
          preview: "/prosjekter/previews/steigen.jpg",
        },
        {
          id: "skatt-kart",
          title: "Property tax by district",
          status: "Development project",
          text: "Map and table for Steigen, with a year line and a split between taxable and exempt. The map uses WebGL. The table and charts remain without it.",
          href: "/prosjekter/eiendomsskatt-steigen.html",
          file: "eiendomsskatt-steigen.html",
          preview: "/prosjekter/previews/skatt.jpg",
        },
        {
          id: "kalkulator",
          title: "Property tax estimate",
          status: "Prototype",
          text: "The file says so itself: not the municipality's official calculator. Rates from the 2019 valuation guidelines. An estimate for a home, other buildings or a plot.",
          href: "/prosjekter/kalkulator.html",
          file: "kalkulator.html",
          preview: "/prosjekter/previews/kalkulator.jpg",
        },
        {
          id: "laanndet",
          title: "Lånndet",
          status: "Concept",
          text: "Rent things from people nearby. A self-contained research demo. Listings on the page are examples, not real rentals.",
          href: "/prosjekter/Laanndet.html",
          file: "Laanndet.html",
          preview: "/prosjekter/previews/laanndet.jpg",
        },
      ],
    },
    technology: {
      kicker: "Technology",
      title: "How the work is put together.",
      lead: "No certifications we do not hold, and no architecture diagram for show.",
      items: [
        {
          title: "Engineering",
          text: "Small, readable surfaces. A tool should open, be used and be explained without a platform wrapped around it.",
        },
        {
          title: "Data processing",
          text: "Raw data stays traceable. Aggregation is a layer on top, not a replacement for the source.",
        },
        {
          title: "AI in the workflow",
          text: "The model sits in a bounded step. It is not allowed to be the whole product.",
        },
        {
          title: "Information security",
          text: "As little as possible is stored. The contact form on this site sends nothing to a server here.",
        },
        {
          title: "Architecture",
          text: "Static where that is enough. Modular where the surface has to grow. WebGL is an extra, never a requirement for reading the figures.",
        },
      ],
    },
    about: {
      kicker: "About G-PSI",
      title: "GovTech Solutions.",
      lead: "G and Ψ sit in the same emblem. The mark is not redrawn, and the name is written G-PSI.",
      items: [
        {
          title: "Purpose",
          text: "Public-sector technology a professional can defend to the resident who asks where the figure came from.",
        },
        {
          title: "Method",
          text: "First, what repeats or cannot be read. Then a system that does exactly that, and stops there.",
        },
        {
          title: "Responsibility",
          text: "We do not name clients we do not have, or accuracy figures we have not measured. Project pages state the status of the work.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Write down the manual work that should go.",
      lead: "The message opens in your mail program, addressed to kontakt@gpsi.ai. This page does not store it.",
      name: "Name",
      email: "Email",
      org: "Organisation",
      message: "Message",
      send: "Open email",
      privacy:
        "The form sends nothing to a server. It places the text in an email to kontakt@gpsi.ai. Do not include sensitive personal data.",
      missing: "Enter a name, a valid email and a message.",
      invalidEmail: "That email address does not look valid.",
      ready: "If your mail program did not open, send it yourself to kontakt@gpsi.ai.",
      address: "kontakt@gpsi.ai",
    },
    footer: {
      note: "G-PSI · GovTech Solutions",
      repo: "Source for the projects",
    },
  },
};
