import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Ash M",
  EMAIL: "~",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 0,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Canvas",
  DESCRIPTION: "Aashish Manchanda, as covered in media, is a passionate product & design expert.",
};

export const THREADS: Metadata = {
  TITLE: "threads",
  DESCRIPTION: "a collection of articles on topics i am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const GALLERY: Metadata = {
  TITLE: "Gallery",
  DESCRIPTION: "A collection of visual works and designs.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://twitter.com/_manchanda_v",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/markhorn-dev"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  },
  { 
    NAME: "instagram",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  }
];
