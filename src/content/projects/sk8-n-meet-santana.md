---
projectTitle: "Sk8 N Meet Santana"
pubDate: 2022-12-26
excerpt: "Official website for the first non-traditional skateboarding group in Santa Ana who hosts monthly meet ups for all skill levels. Their aim is to provide thriving safe spaces for skaters who identify as female, queer, trans and/or nonbinary."
author: "Antonio Lopez"
imageSm:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705622566/portfolio/sk8-n-meet-santana/sk8nmeet-santana-cover700w_gfpq8f.webp"
  alt: "Sk8 N Meet project cover"
imageLg:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705681879/portfolio/sk8-n-meet-santana/sk8nmeet-santana-cover1000w_jwjbxl.webp"
  alt: "Sk8 N Meet project cover"
height: "370"
width: "700"
imgStyle: ""
sizes: "(max-width: 200px) 100vw, 45vw"
githubLink: "https://github.com/antonio-lopez/sk8-n-meet"
liveLink: "https://sk8nmeetsantana.com/"
figmaLink: "https://www.figma.com/file/sEyQoPJFrbL2WFhx2FFDtY/Sk8NMeet?node-id=0%3A1&t=Xbab4PpbzSwldwkS-1"
tags: ["Next JS", "Sanity io", "Cloudinary", "Storybook"]
order: "01"
ogImage: "https://res.cloudinary.com/dloisor1x/image/upload/v1707516498/portfolio/open-graph/og-image-sk8nmeet_hiy4sk.png"
ogImageAlt: "sk8 n meet santana project cover"
---

## About The Project

Sk8 N Meet Santana is a dedicated website designed to offer information about skate meetups occurring in the local Orange County / Los Angeles area. Centered in Santa Ana, this skateboarding group organizes monthly meetups open to individuals of all skill levels. Their aim is to provide thriving safe spaces for skaters who identify as female, queer, trans and/or nonbinary.

## Project Goals

The primary objective of this project was to develop a website for [Sk8 N Meet Santana](https://www.instagram.com/sk8_n_meet_santana/), aligning with their specified requirements. The implementation involved establishing a streamlined process for the team and I to manage the website's content. For content creation, editing, and deletion related to meetups, [Sanity](https://www.sanity.io/) was employed as the Content Management System (CMS). [Cloudinary](https://cloudinary.com/) served as the designated platform for image hosting and optimization. Utilizing the Cloudinary plugin within Sanity Studio simplified the process of choosing photos for a new meetup or updating existing ones.

## Built With

- [Next.js](https://nextjs.org/) - a powerful and versatile React framework that simplifies the process of building modern web applications

- [Cloudinary](https://cloudinary.com/) - a comprehensive cloud-based platform that specializes in end-to-end solutions for managing, optimizing, and delivering digital media assets

- [Sanity io](https://www.sanity.io/) - a headless content management system (CMS) designed to empower developers in building dynamic and scalable digital experiences

- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework that streamlines the process of building modern and responsive user interfaces

- [Figma](https://www.figma.com/) - a cloud-based platform for creating interactive prototypes, designing components, and sharing design systems

- [Storybook](https://storybook.js.org/) - an open-source tool for building and documenting UI components in isolation

- [Typescript](https://www.typescriptlang.org/) - a statically-typed superset of JavaScript that enhances the development experience by introducing optional static typing

## Development

This project marked a pivotal step in my ongoing journey to refine my design and Typescript skills. Equipped with client-provided mockups and organization logos, I utilized this as a foundation for constructing the wireframe and design system in Figma. Delving into research, I explored different fonts and colors and incorporated the ones that worked well with the design.

I maintained daily communication with the client throughout the design phase. Regular updates on my progress were shared, fostering an environment of continual feedback. Necessary tweaks were made along the way, refining the design to align more closely with their expectations and upon reaching a consensus on the final design, the transition to full-stack development was initiated.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288389/portfolio/sk8-n-meet-santana/Sk8_N_Meet_Santana_Website-main-page-1000w_s7hi5n.webp" alt="Sk8 N Meet project mockups" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288389/portfolio/sk8-n-meet-santana/Sk8_N_Meet_Santana_about-page-1000w_fufzpr.webp" alt="Sk8 N Meet project mockups" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706306258/portfolio/sk8-n-meet-santana/sk8nmeet-figma-1000w_py0sv4.webp" alt="Sk8 N Meet project mockups" width="700" loading="lazy" class="my-5 w-full">

Selecting the technology stack was a straightforward decision for me. Having previously employed Sanity.io and Next.js in other projects, I was impressed by the seamless integration between the two. Next.js offers versatile methods for rendering pages, including Server-side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR) with React.
In my case, I opted for SSG due to the infrequent changes in data, as skate meets were scheduled monthly. This choice ensures faster page responses since the pages are pre-generated at build time, aligning with the project's requirements for efficiency and responsiveness.

Cloudinary manages both image optimization and hosting for the project. Image transformations, like adjusting width or height, occur seamlessly through the image's URL parameters, automatically scaling the images. This simplicity enabled the creation of a reusable component that takes an image as an argument with pre-defined URL parameters. As with any hosting service, it is crucial to stay within specified thresholds to control costs. In the next section, I discuss strategies to offload transformation operations and manage hosting expenses.

I developed a content management system using Sanity.io for the database. While I retained control over keeping the content current, I also delegated specific permissions to the team, granting them the ability to create, update, and delete meetups. The meetup schema was crafted with predefined types, fields, and rules. The integration of the [Sanity-Cloudinary](https://github.com/sanity-io/sanity-plugin-cloudinary) plugin streamlined the process of selecting photos from our Cloudinary storage. This plugin automatically retrieves essential image data, including `url`, `width`, `height`, and `format`.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288389/portfolio/sk8-n-meet-santana/sanity-meetup-sample-1000w_onp9sx.webp" alt="Sk8 N Meet project content management system" width="700" loading="lazy" class="my-5 w-full">

## Challenges

While the addition of new meetup posts is infrequent, updates to existing posts may occur. To address this, I chose to implement an [Incremental Static Regeneration](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) (ISR) approach. Unfortunately, during the development phase, ISR was still in beta and incompatible with Sanity. Fortunately, Sanity provides [webhooks](https://www.sanity.io/docs/webhooks#b20c21263c8b). By configuring the webhook API, I established the ability to initiate an HTTP POST method to redeploy the website upon content additions, updates, or deletions.

To accomplish this, I set up a [deploy hook](https://vercel.com/docs/deployments/deploy-hooks) in Vercel and passed the generated URL to my Sanity webhook. It's worth noting that Sanity incorporates safeguards against multiple redeployments. Although content can be updated freely, the redeployment only triggers once the updates are published.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288787/portfolio/sk8-n-meet-santana/sanity-webhook-sample_by6wmj.webp" alt="Sk8 N Meet project webhook example" width="700" loading="lazy" class="my-5 w-full">

As mentioned earlier, Cloudinary streamlines image transformations, reducing the necessity for extensive editing software; however, it does come with associated costs. The limitations revolve around the number of transformations and storage allocations, dependent on the subscribed plan. To alleviate reliance on Cloudinary, I adopted a preemptive approach by setting image sizes and formats before uploading. This process was offloaded to a package called [Eleventy Img](https://github.com/11ty/eleventy-img). In a separate project, I curated all the images earmarked for transformation. Executing a custom async function, I systematically identified images within a designated directory, adjusted their width and format, and then stored the modified images in another directory, complete with custom filenames. This proactive strategy helped optimize image handling and reduce dependency on Cloudinary's resources.

<br>

```js
// Eleventy Img
const imageDir = "./images/";
// all the image formats we're willing to optimize
const imageFormats = [".jpg", ".png", ".jpeg"];

async function optimizeImage(file) {
  const stats = await Image(imageDir + file, {
    widths: [1000], // edit to your heart's content
    formats: ["webp"],
    outputDir: imageDir + imageDir,
    filenameFormat: (id, src, width, format) => {
      // make the filename something we can recognize.
      // in this case, it's just:
      // [original file name] - [image width] . [file format]
      return `${parse(file).name}-${width}w.${format}`;
    },
  });
  console.log(stats); // remove this if you don't want the logs
}

(async () => {
  const files = await readdir(imageDir);
  for (const file of files) {
    const fileExtension = parse(file).ext.toLowerCase();
    if (imageFormats.includes(fileExtension)) {
      await optimizeImage(file);
    }
  }
})();
```

## Learning Experience

This project played a crucial role in enhancing my design, problem-solving, and Next.js skills. Transforming the client's website requirements into a finished product that surpassed their expectations was a rewarding experience. The key to this accomplishment lay in maintaining open communication and daily interactions with the client, allowing for swift adaptation to any changes they requested.

Setting up webhooks proved to be an easy task that provided the ability for incremental static regeneration without the need for revalidation. While it may not be genuine ISR, it currently fulfills the purpose for the limited number of meetup posts. Upon reviewing ISR documentation, it became evident that I can seamlessly set it up later with no complications.

I not only minimized my Cloudinary usage but also discovered ways to reduce usage on Vercel. By implementing `unoptimized: true` in my `next.config.js`, I deactivated image optimization within Vercel's/Next's `Image` component. Observing a notable increase in storage logs with the growing number of photos per meetup post, I transitioned from the `Image` component to crafting my own component using the `Picture` element. This approach efficiently conserves bandwidth and accelerates page load times by delivering the most suitable image for the viewer's display.

<br>

```js
interface ImageProps {
  largeImg: string;
  smallImg: string;
  height: string;
  width: string;
  sizes: string;
  loading: "eager" | "lazy" | undefined;
  alt: string;
  className?: string;
}

const Image = ({
  largeImg,
  smallImg,
  sizes,
  height,
  width,
  loading,
  alt,
  className,
}: ImageProps) => (
  <picture>
    <source
      type='image/webp'
      srcSet={`${smallImg} 600w, ${largeImg} 1000w`}
      sizes={sizes}
    />

    <img
      src={smallImg}
      loading={loading}
      height={height}
      width={width}
      alt={alt}
      className={className}
    />
  </picture>
);

export default Image;
```

## Spotlight

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288389/portfolio/sk8-n-meet-santana/home-about-1000w_uknc6a.webp" alt="Sk8 N Meet project home page" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288389/portfolio/sk8-n-meet-santana/about-us-1000w_ehcx6c.webp" alt="Sk8 N Meet project about us" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288390/portfolio/sk8-n-meet-santana/meetups-all-1000w_z1yysw.webp" alt="Sk8 N Meet project past meetups" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288390/portfolio/sk8-n-meet-santana/meetup-album-1000w_mz4wpx.webp" alt="Sk8 N Meet project gallery" width="700" loading="lazy" class="my-5 w-full">
