export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
}

export interface BlogPost {
  title: string;
  publicationDate: string;
  summary: string;
  tags: string[];
  slug: string;
  content: string;
}