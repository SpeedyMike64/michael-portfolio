/*
  CONTENT — the only file you need to edit by hand (or ask me to edit).
  - Paste Vimeo / YouTube links into `video`. Leave "" until you have one.
  - Replace anything in [square brackets].
  - Images: put files in /assets/img/ and use e.g. "assets/img/whatif-bts-01.jpg".
*/

window.SITE = {
  name: "Michael Chan",
  email: "michaelkwanlapchan@gmail.com",
  location: "London, UK",
  availability: "Open to in-house roles",
  linkedin: "https://www.linkedin.com/in/[your-handle]",
  instagram: "https://www.instagram.com/[your-handle]",
  youtube: "https://www.youtube.com/@[your-handle]",
  cv: "assets/cv.pdf",
  portrait: "",
  bio: "I'm a London-based director and editor. At Pencil Spaces I lead video: I turn a brief into scripts, storyboards and shot lists, work with the design and copy teams to build it, direct the shoot, and edit the final film. [One more line on what drives your work.]",
  experience: [
    { role: "[Job title]", org: "Pencil Spaces", years: "[Year] – now" },
    { role: "[Job title]", org: "[Previous employer]", years: "[Years]" }
  ],
  tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "[Camera kit]"],
  roll: [
    ["Concept & script", "Lead"],
    ["Storyboards & shot list", "Lead"],
    ["Casting & locations", "Lead"],
    ["Direction", "Lead"],
    ["Edit, sound & grade", "Lead"],
    ["Design", "With the design team"],
    ["Copy", "With the copy team"]
  ]
};

/*
  roles: any of "directed", "edited"
  chapters: the brief-to-result story. Each chapter has a director note and an editor note.
  The two notes are the "commentary tracks" on the project page.
*/
window.PROJECTS = [
  {
    slug: "what-if",
    title: "What If?",
    client: "Pencil Spaces",
    kind: "Brand film",
    year: "2026",
    roles: ["directed", "edited"],
    roleLine: "Concept · Direction · Edit",
    logline: "[One-line logline — what the film is about and who it is for.]",
    video: "",
    runtime: "[0:00]",
    result: "[Real result — views, sign-ups, or how the team used it.]",
    chapters: [
      { tc: "00:00", title: "The brief",
        media: ["Brief / deck page"],
        director: "[What the client asked for, and the one thing you decided the film had to make people feel.]",
        editor: "[What you knew the edit would need before a frame was shot — runtime, cutdowns, aspect ratios.]" },
      { tc: "00:12", title: "The boards",
        media: ["Storyboard 01", "Storyboard 02", "Storyboard 03"],
        director: "[The idea in a sentence, and how the boards gave design and copy something concrete to build against.]",
        editor: "[How you boarded for the cut — the transitions, match cuts or beats you planned on paper.]" },
      { tc: "00:31", title: "The shoot",
        media: ["BTS photo", "BTS photo", "BTS photo", "Shot list page"],
        director: "[Casting, location, and one call you made on the day that changed the film.]",
        editor: "[What you shot for the edit — coverage, cutaways, safety takes, room tone.]" },
      { tc: "00:48", title: "The cut",
        media: ["Edit timeline", "Before grade", "After grade"],
        director: "[Where the cut departed from the boards, and why the story is better for it.]",
        editor: "[Structure, pacing, sound and grade — the edit decision you are proudest of.]" },
      { tc: "01:05", title: "The result",
        media: ["Final frame", "Vertical cutdown", "Where it ran"],
        director: "[What the film did for the business. Real numbers only.]",
        editor: "[What you delivered — master, cutdowns, captions, formats.]" }
    ],
    credits: [["Written, directed & edited by", "Michael Chan"], ["Design", "[Name]"], ["Copy", "[Name]"], ["Camera", "[Name]"], ["Cast", "[Names]"], ["Music", "[Track / library]"]]
  },
  {
    slug: "apple-collab",
    title: "Apple × Pencil Spaces",
    client: "Apple",
    kind: "Partner film",
    year: "2026",
    roles: ["directed", "edited"],
    roleLine: "Direction · Edit",
    logline: "[One line on the collaboration.]",
    video: "",
    runtime: "[0:00]",
    result: "[Real result.]",
    chapters: null,
    credits: [["Director & editor", "Michael Chan"]]
  },
  {
    slug: "spacebar",
    title: "Spacebar",
    client: "Pencil Spaces",
    kind: "Product teaser",
    year: "2026",
    roles: ["directed", "edited"],
    roleLine: "Direction · Edit",
    logline: "A teaser for our new AI product, before it launches.",
    video: "",
    runtime: "[0:00]",
    result: "[Real result.]",
    chapters: null,
    credits: [["Director & editor", "Michael Chan"]]
  },
  {
    slug: "launch-demo",
    title: "Launch Demo",
    client: "Pencil Spaces",
    kind: "Launch video",
    year: "2026",
    roles: ["directed", "edited"],
    roleLine: "Direction · Edit",
    logline: "Show the product working, in time for launch.",
    video: "",
    runtime: "[0:00]",
    result: "[Real result.]",
    chapters: null,
    credits: [["Director & editor", "Michael Chan"]]
  },
  {
    slug: "feature-series",
    title: "Feature Series",
    client: "Pencil Spaces",
    kind: "Product feature videos",
    year: "2026",
    roles: ["edited"],
    roleLine: "Script · Edit",
    logline: "Explain each new feature clearly, on a regular schedule.",
    video: "",
    runtime: "[0:00]",
    result: "[Real result.]",
    chapters: null,
    credits: [["Editor", "Michael Chan"]]
  },
  {
    slug: "tutor-white-label",
    title: "Tutor White-Label",
    client: "Pencil Spaces",
    kind: "30s animated spot",
    year: "2026",
    roles: ["edited"],
    roleLine: "Script · Edit",
    logline: "A 30-second video tutors can forward to parents.",
    video: "",
    runtime: "0:30",
    result: "[Real result.]",
    chapters: null,
    credits: [["Editor", "Michael Chan"]]
  }
];
