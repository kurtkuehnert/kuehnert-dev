export type Lang = "en" | "de";

export interface LanguageConfig {
  code: Lang;
  name: string;
  nativeName: string;
  gradientTheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Content {
  hero: {
    name: string;
    tagline: string;
    ctaContact: string;
  };
  about: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      description: string;
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      technologies: string;
      link?: string;
      images?: Array<{
        src: string;
        alt: string;
        title?: string;
      }>;
    }>;
  };
  publications: {
    title: string;
    items: Array<{
      title: string;
      authors: string;
      venue: string;
      year: string;
      link?: string;
      abstract?: string;
      keywords?: string[];
    }>;
  };
  education: {
    title: string;
    items: Array<{
      institution: string;
      degree: string;
      grade: string;
      period: string;
    }>;
  };
}

export const languages: Record<Lang, LanguageConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    gradientTheme: {
      primary: "#EF8222",
      secondary: "#C62B45",
      accent: "#EF8222",
    },
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    gradientTheme: {
      primary: "#19D2B9",
      secondary: "#1B88B8",
      accent: "#19D2B9",
    },
  },
};

export const content: Record<Lang, Content> = {
  en: {
    hero: {
      name: "Kurt Kühnert",
      tagline:
        "Software Engineer specializing in geospatial technology and computer graphics, with expertise in GPU-based algorithms and large-scale terrain rendering.",
      ctaContact: "Contact",
    },
    about: {
      title: "About Me",
      content:
        "Experienced Software Engineer specializing in software development and computer graphics, with a strong focus on geospatial technology. Known for being detail-oriented and adaptable, I effectively tackle complex challenges with a commitment to precision. My expertise includes large-scale terrain rendering and the implementation of GPU-based algorithms. I excel at applying my skills to develop software that visualizes complex datasets, translating intricate information into clear insights that support informed decision-making. I am always eager to learn new technologies and transfer my skills to various topics within computer science.",
    },
    experience: {
      title: "Experience",
      items: [
        {
          company: "Argeo",
          role: "Software Developer",
          period: "Oct 2023 - Jul 2025 (1 year 10 months)",
          description:
            "Developed the spherical terrain rendering feature for the open-source Bevy Terrain library using Rust and WebGPU to enhance the visualization of geospatial datasets. Implemented high-precision mesh subdivision based on the WGS84 ellipsoid to alleviate floating point imprecision on the GPU.",
        },
        {
          company: "Foresight Spatial Labs",
          role: "Software Developer",
          period: "Mar 2023 - Apr 2023 (2 months)",
          description:
            "Developed the Compatible Particle-In-Cell (CPIC) algorithm for a Material Point Method (MPM) particle simulation. Enabled two-way coupling between particles and rigid bodies through the implementation of the CPIC algorithm.",
        },
      ],
    },
    publications: {
      title: "Publications",
      items: [
        {
          title:
            "A Novel Approach to Real-Time Rendering of Large-Scale Terrains Employing Uniform Distance-Dependent Level of Detail and Chunked Clipmaps",
          authors: "Kurt Kühnert; Tom Uhlmann; Guido Brunnett",
          venue: "VR/AR Workshop",
          year: "2023",
          link: "https://doi.org/10.18420/vrar2023_3387",
          abstract:
            "Large-scale terrain rendering in real-time is difficult and still an active topic of research. These landscapes are enormous in scale, so an effective level of detail strategy is needed. It is essential to represent the geometry and the terrain data seamlessly at various distances in order to ensure a constant visual quality free of artifacts. This paper introduces a novel terrain rendering approach that builds and improves upon state of the art methods. By using the cutting-edge Uniform Distance-Dependent Level of Detail (UDLOD) triangulation method, a seamless and effective mesh representation is produced. In order to create a dense and temporally consistent triangulated mesh, this fully GPU-based algorithm divides a quadtree covering the terrain into small tiles that can be culled in parallel and are morphed seamlessly in the vertex shader. With the proposed Chunked Clipmap, effective out-of-core paging of terrain data is made possible by combining the advantages of quadtrees and clipmaps. This data structure supports trilinear and anisotropic filtering, constant time view-dependent access, and graceful degradation in the event that data is not available. Together, these otherwise separate techniques allow for the real-time rendering of massive real-world terrains, as we will show on a dataset covering the entire Free State of Saxony at a resolution of one square meter.",
          keywords: [
            "Terrain Rendering",
            "UDLOD",
            "Chunked Clipmap",
            "Level of Detail",
            "Height Field",
          ],
        },
      ],
    },
    projects: {
      title: "Projects",
      items: [
        {
          title: "Bevy Terrain",
          description:
            "Bevy Terrain is an open-source library designed for visualizing geospatial datasets with a focus on high-performance rendering and intuitive user experience. Built using Rust and WebGPU, the library features advanced terrain rendering techniques, including spherical terrain support and high-precision mesh subdivision, to provide seamless and accurate visualizations of large-scale terrains.",
          technologies: "Rust, WebGPU, Bevy, GDAL, Geospatial",
          link: "https://github.com/kurtkuehnert/bevy_terrain",
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          institution: "Technische Universität Chemnitz",
          degree: "Master of Science - MS Computer Science",
          grade: "1.2",
          period: "Oct 2023 - Sep 2025 (2 years)",
        },
        {
          institution: "Technische Universität Chemnitz",
          degree: "Bachelor of Science - BS Computer Science",
          grade: "1.1",
          period: "Oct 2019 - Sep 2023 (3 years 11 months)",
        },
      ],
    },
  },
  de: {
    hero: {
      name: "Kurt Kühnert",
      tagline:
        "Softwareentwickler mit Schwerpunkt Geodaten und Computergrafik, Experte für GPU-basierte Algorithmen und großflächiges Terrain-Rendering.",
      ctaContact: "Kontakt",
    },
    about: {
      title: "Über mich",
      content:
        "Erfahrener Softwareentwickler mit Spezialisierung auf Softwareentwicklung und Computergrafik, mit starkem Fokus auf Geodatentechnologie. Bekannt für Detailorientierung und Anpassungsfähigkeit, bewältige ich komplexe Herausforderungen effektiv mit einem Engagement für Präzision. Meine Expertise umfasst großflächiges Terrain-Rendering und die Implementierung GPU-basierter Algorithmen. Ich bin bestrebt, meine Fähigkeiten zur Entwicklung von Software einzusetzen, die komplexe Datensätze visualisiert und komplizierte Informationen in klare Erkenntnisse übersetzt, die fundierte Entscheidungsfindung unterstützen. Ich bin immer bereit, neue Technologien zu lernen und meine Fähigkeiten auf verschiedene Themen innerhalb der Informatik zu übertragen.",
    },
    experience: {
      title: "Berufserfahrung",
      items: [
        {
          company: "Argeo",
          role: "Software Developer",
          period: "Okt 2023 - Jul 2025 (1 Jahr 10 Monate)",
          description:
            "Entwicklung der sphärischen Terrain-Rendering-Funktion für die Open-Source Bevy Terrain Bibliothek mit Rust und WebGPU zur Verbesserung der Visualisierung von Geodatensätzen. Implementierung hochpräziser Mesh-Subdivision basierend auf dem WGS84-Ellipsoid zur Behebung von Floating-Point-Ungenauigkeiten auf der GPU.",
        },
        {
          company: "Foresight Spatial Labs",
          role: "Software Developer",
          period: "Mär 2023 - Apr 2023 (2 Monate)",
          description:
            "Entwicklung des Compatible Particle-In-Cell (CPIC) Algorithmus für eine Material Point Method (MPM) Partikelsimulation. Ermöglichung der Zwei-Wege-Kopplung zwischen Partikeln und starren Körpern durch die Implementierung des CPIC-Algorithmus.",
        },
      ],
    },
    publications: {
      title: "Publikationen",
      items: [
        {
          title:
            "A Novel Approach to Real-Time Rendering of Large-Scale Terrains Employing Uniform Distance-Dependent Level of Detail and Chunked Clipmaps",
          authors: "Kurt Kühnert; Tom Uhlmann; Guido Brunnett",
          venue: "VR/AR Workshop",
          year: "2023",
          link: "https://doi.org/10.18420/vrar2023_3387",
          abstract:
            "Das Echtzeit-Rendering großflächiger Terrains ist schwierig und weiterhin ein aktives Forschungsthema. Diese Landschaften sind enormen Ausmaßes, daher wird eine effektive Level-of-Detail-Strategie benötigt. Es ist essentiell, die Geometrie und Terraindaten nahtlos in verschiedenen Entfernungen darzustellen, um eine konstante visuelle Qualität ohne Artefakte zu gewährleisten. Diese Arbeit stellt einen neuartigen Terrain-Rendering-Ansatz vor, der auf dem Stand der Technik aufbaut und diesen verbessert. Durch die Verwendung der hochmodernen Uniform Distance-Dependent Level of Detail (UDLOD) Triangulationsmethode wird eine nahtlose und effektive Mesh-Darstellung erzeugt. Um ein dichtes und zeitlich konsistentes trianguliertes Mesh zu erstellen, teilt dieser vollständig GPU-basierte Algorithmus einen das Terrain abdeckenden Quadtree in kleine Kacheln auf, die parallel gecullt und nahtlos im Vertex-Shader gemorpht werden können. Mit der vorgeschlagenen Chunked Clipmap wird effektives Out-of-Core-Paging von Terraindaten ermöglicht, indem die Vorteile von Quadtrees und Clipmaps kombiniert werden. Diese Datenstruktur unterstützt trilineare und anisotrope Filterung, konstante Zeit-ansichtsabhängigen Zugriff und graceful Degradation falls Daten nicht verfügbar sind. Zusammen ermöglichen diese ansonsten separaten Techniken das Echtzeit-Rendering massiver realer Terrains, wie wir an einem Datensatz zeigen werden, der den gesamten Freistaat Sachsen mit einer Auflösung von einem Quadratmeter abdeckt.",
          keywords: [
            "Terrain Rendering",
            "UDLOD",
            "Chunked Clipmap",
            "Level of Detail",
            "Höhenfeld",
          ],
        },
      ],
    },
    projects: {
      title: "Projekte",
      items: [
        {
          title: "Bevy Terrain",
          description:
            "Bevy Terrain ist eine Open-Source-Bibliothek zur Visualisierung von Geodatensätzen mit Fokus auf Hochleistungs-Rendering und intuitive Benutzererfahrung. Entwickelt mit Rust und WebGPU bietet die Bibliothek fortschrittliche Terrain-Rendering-Techniken, einschließlich sphärischer Terrain-Unterstützung und hochpräziser Mesh-Subdivision, um nahtlose und präzise Visualisierungen großskaliger Terrains zu ermöglichen.",
          technologies: "Rust, WebGPU, Bevy, GDAL, Geodaten",
          link: "https://github.com/kurtkuehnert/bevy_terrain",
        },
      ],
    },
    education: {
      title: "Bildung",
      items: [
        {
          institution: "Technische Universität Chemnitz",
          degree: "Master of Science - MS Informatik",
          grade: "1,2",
          period: "Okt 2023 - Sep 2025 (2 Jahre)",
        },
        {
          institution: "Technische Universität Chemnitz",
          degree: "Bachelor of Science - BS Informatik",
          grade: "1,1",
          period: "Okt 2019 - Sep 2023 (3 Jahre 11 Monate)",
        },
      ],
    },
  },
};

export const defaultLang: Lang = "en";

export function getLanguageConfig(lang: Lang): LanguageConfig {
  return languages[lang];
}

export function getContent(lang: Lang): Content {
  return content[lang];
}

export function getLegalContent(lang: Lang) {
  return {
    imprint: {
      title: lang === "de" ? "Impressum" : "Imprint",
      content:
        lang === "de"
          ? "Deutscher Impressum-Inhalt..."
          : "English imprint content...",
    },
    privacy: {
      title: lang === "de" ? "Datenschutzerklärung" : "Privacy Policy",
      content:
        lang === "de"
          ? "Deutsche Datenschutz-Inhalt..."
          : "English privacy content...",
    },
  };
}
