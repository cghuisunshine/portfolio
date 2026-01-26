(function () {
  "use strict";

  // Demo content (static). Keep this file GitHub Pages-friendly.
  window.DEMO = {
    person: {
      name: "Peter Chen",
      role: "Full Stack Engineer & AI Specialist",
      location: "Vancouver, BC, Canada",
      email: "cghui.sunshine@gmail.com",
      phone: "+1 587 438 3825",
      linkedinLabel: "www.linkedin.com/in/peter-guanghuichen",
      linkedinUrl: "https://www.linkedin.com/in/peter-guanghuichen",
    },
    projects: [
      {
        id: "00000000-0000-0000-0000-000000000001",
        title: "Conway's Game of Life",
        description: "Cellular automaton visualizer.",
        image: "assets/placeholder-300x300.png",
        link: "https://example.com/game-of-life",
        keywords: ["algorithms", "simulation"],
        details:
          "A fast, interactive simulation with controls for speed, patterns, and live cell counts. Built to illustrate emergent behavior with a clean UI and predictable performance.",
      },
      {
        id: "00000000-0000-0000-0000-000000000002",
        title: "Generative Type Playground",
        description: "Interactive typography experiments driven by user input.",
        image: "assets/placeholder-300x300.png",
        link: "https://example.com/generative-type",
        keywords: ["creative coding", "interaction"],
        details:
          "A sandbox for exploring procedural typography: parameterized glyph shapes, motion presets, and exportable snapshots. Focus: playful interaction with professional polish.",
      },
      {
        id: "00000000-0000-0000-0000-000000000003",
        title: "Inclusive Transit Map",
        description: "Accessibility-focused redesign of a metro guidance system.",
        image: "assets/placeholder-300x300.png",
        link: "https://example.com/transit-map",
        keywords: ["ux", "accessibility", "wayfinding"],
        details:
          "A map and guidance system emphasizing contrast, hierarchy, and screen-reader-friendly structure. Includes a route finder and clear transfer instructions.",
      },
    ],
    posts: [
      {
        slug: "shipping-with-constraints",
        title: "Shipping with constraints",
        createdAt: "2026-01-01",
        excerpt:
          "How to choose what to build (and what to cut) when timeline, scope, and polish compete.",
        content:
          "Constraints are design inputs. The fastest teams treat limitations as a brief: define the goal, name the tradeoffs, and ship a coherent slice.\n\nA useful pattern: decide what must be true at launch, and what can be improved later. If the core loop is solid and the interface is legible, iteration becomes a product advantage.",
      },
      {
        slug: "interfaces-that-explain",
        title: "Interfaces that explain themselves",
        createdAt: "2025-12-10",
        excerpt:
          "Small copy choices and structure changes that reduce support tickets.",
        content:
          "Good UI is a conversation. Labels, affordances, and feedback should answer: What is happening? What should I do next?\n\nWhen you can, replace alerts with context. Show intent, not just state: instead of 'Error', say what failed and how to fix it.",
      },
    ],
  };
})();
