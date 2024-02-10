import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    projectTitle: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    imageSm: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    imageLg: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    height: z.string(),
    width: z.string(),
    imgStyle: z.string(),
    sizes: z.string(),
    tags: z.array(z.string()),
    githubLink: z.string().url(),
    liveLink: z.string().url(),
    figmaLink: z.string().url().optional(),
    left: z.boolean().optional(),
    order: z.string(),
    ogImage: z.string().url().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

const blogsCollection = defineCollection({
  type: "content",
  schema: z.object({
    blogTitle: z.string(),
    excerpt: z.string(),
    pubDate: z.date(),
    imageSm: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    imageLg: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    height: z.string(),
    width: z.string(),
    imgStyle: z.string(),
    sizes: z.string(),
    ogImage: z.string().url().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  blogs: blogsCollection,
};
