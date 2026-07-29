// Static reference data describing each platform's posting rules.
// Used to render the "Platform constraints" panel in the composer.

const PLATFORMS = [
  {
    id: "x",
    name: "X",
    tagline: "Short and timely updates with a maximum of 4 hashtags.",
    maxHashtags: 4,
    maxCharacters: 280,
  },
  {
    id: "instagram",
    name: "Instagram",
    tagline: "Visual-first posts with media recommended and up to 30 hashtags.",
    maxHashtags: 30,
    maxCharacters: 2200,
  },
  {
    id: "facebook",
    name: "Facebook",
    tagline: "Longer-form updates that support links, media, and polls.",
    maxHashtags: 10,
    maxCharacters: 63206,
  },
  {
    id: "reddit",
    name: "Reddit",
    tagline: "Community-first posts; keep titles clear and avoid heavy self-promotion.",
    maxHashtags: 0,
    maxCharacters: 40000,
  },
  {
    id: "quora",
    name: "Quora",
    tagline: "Answer-style posts that read like helpful, in-depth explanations.",
    maxHashtags: 0,
    maxCharacters: 20000,
  },
  {
    id: "pinterest",
    name: "Pinterest",
    tagline: "Visual pins with a short, descriptive, keyword-rich caption.",
    maxHashtags: 20,
    maxCharacters: 500,
  },
];

module.exports = PLATFORMS;
