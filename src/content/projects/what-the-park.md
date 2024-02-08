---
projectTitle: "What The Park"
pubDate: 2023-08-17
excerpt: "Explore national parks from across the United States. Ensure a seamless and stress-free journey to your destination by viewing general park information, weather conditions, and ways of getting there."
author: "Antonio Lopez"
imageSm:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705687178/portfolio/what-the-park/what-the-park-cover-700w_uxsu2g.webp"
  alt: "what the park project cover"
imageLg:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705687179/portfolio/what-the-park/what-the-park-cover-1000w_vwgfiw.webp"
  alt: "what the park project cover"
height: "370"
width: "700"
imgStyle: ""
sizes: "(max-width: 200px) 100vw, 45vw"
githubLink: "https://github.com/antonio-lopez/what-the-park"
liveLink: "https://what-the-park.vercel.app/"
figmaLink: "https://www.figma.com/file/yYoBGsOuvNCMQpRdb3vzhJ/What-The-Park?type=design&mode=design&t=PoMywHtsQC8y7Bm4-1"
tags: ["Next JS", "Shadcn UI", "API", "Tailwind CSS"]
order: "03"
---

## About The Project

What The Park is an application designed to provide comprehensive details about national parks in the United States. By utilizing the [National Park Service's API](https://www.nps.gov/subjects/developer/index.htm), users can access information such as weather conditions, entrance fees, associated costs, and a wide range of activities available for visitors. The app also offers directional details, including driving routes, public transportation options, and GPS coordinates. Additionally, it features an interactive map powered by LeafletJS for a user-friendly exploration experience.

## Project Goals

The objectives of this project were centered around enhancing my front-end development skills. Shadcn UI played a crucial role in refining my design system proficiency, requiring me to meticulously craft Figma wireframes/mockups with accurate fonts, font sizes, colors, and reusable components before commencing development. Another key goal was to revisit working with RESTful APIs, particularly a third-party one from an organization, following my previous experience with GraphQL APIs. I aimed to explore two specific technologies in this project: Zod, a TypeScript-first schema declaration and validation library, and React-Hook-Form, a library tailored for managing forms in React applications. These technologies were employed to create type-safe forms for searching National Parks. With prior experience using LeafletJS, my aim was to generate dynamic interactive maps tailored to each selected National Park.

## Built With

- [Next.js](https://nextjs.org/) - a powerful and versatile React framework that simplifies the process of building modern web applications

- [Zod](https://zod.dev/) - a TypeScript-first schema declaration and validation library

- [React Hook Form](https://react-hook-form.com/) - a lightweight and flexible library designed to manage forms in React applications with ease

- [Leaflet](https://leafletjs.com/) - is the leading open-source JavaScript library for mobile-friendly interactive maps

- [Shadcn UI](https://ui.shadcn.com/) - a collection of re-usable components for React

- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework that streamlines the process of building modern and responsive user interfaces

- [Framer Motion](https://www.framer.com/motion/) - an animation library for React that offers declarative syntax, gestures, drag, and path animations

- [Figma](https://www.figma.com/) - a cloud-based platform for creating interactive prototypes, designing components, and sharing design systems

- [Typescript](https://www.typescriptlang.org/) - a statically-typed superset of JavaScript that enhances the development experience by introducing optional static typing

## Development

The initial phase of this project involved the completion of a design system, a pivotal step due to the utilization of the Shadcn UI component library. This library comes equipped with configuration files for establishing a unified design system. To tailor it to my preferences, I made modifications to the `tailwind.config.ts` and `globals.css` files, incorporating my selected fonts, colors, and custom utility classes.

Throughout this project, I acquired proficiency in working with CSS variables, deviating from the conventional Tailwind CSS utility classes recommended by Shadcn UI for [theming](https://ui.shadcn.com/docs/theming). Instead of employing utility classes like `<div className="bg-zinc-950 dark:bg-white" />`, I adopted CSS variables for color conventions, resulting in syntax such as `<div className="bg-background text-foreground" />`. Although the process was meticulous, I converted my selected colors into custom properties with HSL-like syntax `--foreground: 222.2 47.4% 11.2%;` inside the `globals.css` file, and added those properties to my `tailwind.config.ts` file `foreground: 'hsl(var(--foreground))'`, resulting in a structured design system.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804756/portfolio/what-the-park/figman-design-system-1000w_j1dtkp.webp" alt="what the park project mockups" width="700" loading="lazy" class="my-5 w-full">

Speaking of rigid structure, I faced the challenge of working with a 3rd party API lacking pre-defined types. To overcome this, I established a `lib` directory housing a `utils.ts` file containing custom interfaces. These interfaces were meticulously crafted by mapping them from the objects provided by the API, allowing me to invoke them wherever I interact with the API and ensuring the presence of types and autocomplete functionality.

<br/>

```ts
export interface Park {
  id: string;
  url: string;
  fullName: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: string;
  activities: Activities[];
  topics: Topics[];
  addresses: Address[];
  contacts: Contact;
  entranceFees?: EntranceFees[];
  directionsInfo: string;
  directionsUrl: string;
  images: Images[];
  weatherInfo?: string;
}
```

<br/>

Upon obtaining my API key from the National Park Service, I promptly employed [Postman](https://www.postman.com) for API testing. This tool enables the configuration of my API key as a variable, allowing access across various queries. These queries are organized by project within a collections folder. The outcomes of each query are presented in neatly formatted JSON. Two common queries I used are

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804756/portfolio/what-the-park/postman-1000w_ex3is9.webp" alt="what the park project postman api" width="700" loading="lazy" class="my-5 w-full">

During request time in NextJS, dynamic routes are populated using the Dynamic Segment `[slug]`. This `[slug]` corresponds to a park code, which is assigned to a variable using the [context key](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props) within the `getServerSideProps` function. The `context` object encapsulates the query string, encompassing dynamic route parameters.

`const slug = context.query.slug`

The park code is transmitted to the API query, which retrieves the designated park data, subsequently passing it to the page as props. To obtain the park code, users need to perform a park search, a topic further elaborated in this section. To optimize efficiency and minimize network requests, [Cache-Control](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr) is implemented for caching. The data is deemed fresh for one hour (s-maxage=3600). If a request is repeated within this timeframe, the previously cached value remains valid. If the request is reiterated before two hours, the cached value becomes stale but still renders (stale-while-revalidate=7200). In the background, a revalidation request is initiated to update the cache with fresh data. Upon page refresh, the updated data becomes visible.

<br/>

```js
context.res.setHeader(
  "Cache-Control",
  "public, s-maxage=3600, stale-while-revalidate=7200",
);
```

<br/>

Within the query, one of the dynamic data components encompasses the parks' directions, specifically their coordinates. I configured LeafletJS to utilize these coordinates for displaying the park's location on the map. To enhance the initial loading performance of the application, I implemented lazy loading for the map component using [Dynamic Imports](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) with `next/dynamic`. This approach deferred the loading of LeafletJS, incorporating it into the client bundle only when necessary—after server-rendering completion. Placing the component towards the end of the page ensures that users won't interact with the map until they scroll down. By that point, the map is fully rendered and prepared for interactivity.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804756/portfolio/what-the-park/directions-1000w_hzripu.webp" alt="what the park project map" width="700" loading="lazy" class="my-5 w-full">

The search form in the park search page is a combination of Shadcn UI for the components, Zod for the type validation, and React-Hook-Form for form processing. Initially, a schema is established using Zod, guaranteeing that only the created object remains valid within the form, adhering to specified types. In this instance, the permissible values include state codes, chosen from a dropdown menu, and a user query derived from user input.

<br/>

```js
const formSchema = z.object({
  stateCode: z.string().min(2).max(50),
  q: z.string(),
});
```

<br/>

Afterward, the form incorporates the specified schema and dynamically updates based on user input. Upon form submission, an asynchronous function is triggered, taking the user-provided state code and query, then passing them to the National Park Service API for data retrieval. While the data is being fetched, a spinner is displayed, indicating the ongoing process. Once the data is obtained, it is stored in the state and transmitted to a component responsible for rendering park results in a list of cards. Clicking on a specific card enables users to view details about the corresponding national park. The dynamic rendering is managed by the `slug`, or in this case, the state code. The state code is appended to the URL and extracted from the `context` query on each page, as explained in the preceding section on dynamic routes.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804757/portfolio/what-the-park/search-1000w_grqve5.webp" alt="what the park project search" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804757/portfolio/what-the-park/search-result-1000w_jgbikc.webp" alt="what the park project search results" width="700" loading="lazy" class="my-5 w-full">

## Challenges

While working with LeafletJS, compatibility emerged as a notable challenge. The absence of inherent type definitions prompted me to seek out a compatible [NPM package](https://www.npmjs.com/package/@types/leaflet). Additionally, I encountered difficulties with the proper loading of icons and CSS for the map. Thankfully, a dedicated [package](https://www.npmjs.com/package/leaflet-defaulticon-compatibility) resolved this issue.

Addressing performance concerns, the map significantly impacted page loading times. To enhance loading speeds, I implemented lazy loading for LeafletJS, deferring the map's loading and relocating it to the bottom of the page. This approach ensured that server rendering completed first, allowing users to interact with the page swiftly. Subsequently, the map rendered when users reached the bottom of the page, ready for user interaction.

## Learning Experience

During this project, I expanded my expertise in utilizing and integrating third-party APIs, both on the server and client sides. Leveraging Shadcn UI, a comprehensive component library, I efficiently transformed the acquired data into user-friendly components. This library proved particularly advantageous in handling forms, as it seamlessly integrated with React-Hook-Form and Zod, ensuring smooth user input validation and data fetching processes.

For visual enhancement, I incorporated LeafletJS to display the selected national park's location on a map. While implementing this feature, I delved into the documentation to address compatibility issues. Overall, working with RESTful APIs and refining my design system skills proved to be a success.

## Spotlight

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804757/portfolio/what-the-park/home-page-1000w_afuksc.webp" alt="what the park project home page information" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804756/portfolio/what-the-park/park-main-1000w_mieslc.webp" alt="what the park project national park" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706804756/portfolio/what-the-park/info-1000w_svzvy4.webp" alt="what the park project national park information" width="700" loading="lazy" class="my-5 w-full">
