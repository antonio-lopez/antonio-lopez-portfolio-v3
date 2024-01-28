---
projectTitle: "Anilog"
pubDate: 2022-11-01
excerpt: "A NextJS anime and manga tracker utilizing the Anilist GraphQL API. See what is currently trending, explore the all-time favorites, or uncover something fresh."
author: "Antonio Lopez"
imageSm:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705687144/portfolio/anilog/anilog-cover-700w_isjjzs.webp"
  alt: "anilog project cover"
imageLg:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1705687145/portfolio/anilog/anilog-cover-1000w_yzm9v6.webp"
  alt: "anilog project cover"
height: "370"
width: "700"
imgStyle: ""
sizes: "(max-width: 200px) 100vw, 45vw"
githubLink: "https://github.com/antonio-lopez/anilog"
liveLink: "https://anilog.vercel.app/"
figmaLink: "https://www.figma.com/file/wGhHnZDT59jzUZmz7RX6dG/ani-tracker?node-id=0%3A1&t=KSLPSVErdBmo5bLP-1"
tags: ["Next JS", "Storybook", "GraphQL", "Tailwind CSS"]
order: "02"
left: true
---

## About The Project

Anilog functions as an anime and manga tracker, utilizing the Anilist GraphQL API to retrieve up-to-date content. The website is organized into three primary pages. The home page features the top anime of the current season, all-time favorites, trending anime, and anime movies. The manga page showcases popular manga, trending titles, and all-time top manga. The search page enables users to explore Anilist's database, allowing searches for any anime or manga.

## Project Goals

This project had two primary objectives: to enhance my proficiency in design implementation and to acquire knowledge in GraphQL. Utilizing Figma and Storybook, I not only crafted the prototype but also employed these tools to isolate components, gaining a clearer insight into the final product before coding. Although I am accustomed to working with REST APIs, the Anilist API was written in GraphQL. Despite the challenge, I embraced it. This provided a perfect opportunity for me to delve into this technology.

Unlike typical REST APIs that require loading from multiple URLs, GraphQL APIs fetch all the necessary data for your app in a single request. Anilist further facilitated the learning process with an excellent in-browser tool for crafting, validating, and testing GraphQL queries.

## Built With

- [Next.js](https://nextjs.org/) - a powerful and versatile React framework that simplifies the process of building modern web applications

- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework that streamlines the process of building modern and responsive user interfaces

- [Figma](https://www.figma.com/) - a cloud-based platform for creating interactive prototypes, designing components, and sharing design systems

- [Storybook](https://storybook.js.org/) - an open-source tool for building and documenting UI components in isolation

- [GraphQL](https://graphql.org/) - a query language for APIs that provides a more efficient and flexible alternative to traditional REST APIs

- [Apollo Client](https://www.apollographql.com/) - a comprehensive and versatile state management library for JavaScript applications, particularly those built with GraphQL

- [Anilist GraphQL API](https://github.com/AniList/ApiV2-GraphQL-Docs) - api that provides quick and powerful access to over 500k anime and manga entries, including character, staff, and live airing data

## Development

I began collecting design inspiration from platforms such as [Dribble](https://dribbble.com/), as well as streaming websites like Crunchyroll and Hulu. My goal was to create a design that struck a balance between simplicity and providing sufficient information for quick comprehension. To assist with font and color selection, I utilized resources like [Fontpair](https://www.fontpair.co/) and [Huemint](https://huemint.com/website-magazine/#palette=ffffff-dbdde3-0d0a09-ea9041).

After compiling all the necessary information, I initiated the prototype development using Figma for both desktop and mobile interfaces. Utilizing Figma's component tool for the first time, I created reusable components from my frames, providing a visual representation of React components in code. During the coding phase, I leveraged Storybook to work on components in isolation. This approach enabled me to create components filled with mock data and interactive elements without the necessity of constructing the entire page. This method laid a robust foundation, minimizing the need for component refactoring when integrating the various elements of the project.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399958/portfolio/anilog/anilog-figma-1000w_j4weej.webp" alt="anilog figma mockup" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399959/portfolio/anilog/storybook-1000w_xe3rpo.webp" alt="anilog storybook" width="700" loading="lazy" class="my-5 w-full">

Because I would be making API calls to the Anilist server, I chose to employ NextJS as the frontend framework. As the data undergoes daily changes due to the addition of new episodes, shifts in rankings, and shifts in popularity, I required a method to retrieve fresh data with each API call. The anime and manga home pages are categorized into sections such as the current season, top anime, trending now, and movies. Leveraging the [Apollo Client](https://www.apollographql.com/docs/react/), I utilized a `getServerProps` async function to query all the necessary data for each section and passed it as props to the respective sections. The outcomes of these queries are stored in a local, normalized, in-memory cache. This configuration allows the Apollo Client to swiftly respond to queries for [already-cached](https://www.apollographql.com/docs/react/caching/overview#how-is-data-stored) data without the need for a network request.

<br/>

```js
// example of a query
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      {
        seasonalAnime: Page(perPage: 9) {
          media(
            format: TV
            season: ${currentSeason}
            seasonYear: ${currentYear}
            sort: POPULARITY_DESC
          ) {
            id
            averageScore
            title {
              english
              romaji
            }
            description(asHtml: false)
            bannerImage
            coverImage {
              extraLarge
            }
          }
        }
      }
    `,
  });
}
```

<br/>

Every section exhibits a restricted amount of content along with a link to view more results. On the "view more" pages, the content is constrained to 10 results with pagination built in at the bottom to minimize network requests. The API supplies pagination data with precomputed results. These variables are then passed into a `Pagination` component responsible for managing pagination logic. The component initiates from the current page and verifies the presence of a `hasNextPage` variable. If it is `true`, an arrow button becomes accessible, utilizing the NextJS `Router` hook for handling client-side transitions through `router.push(url)`.

<br/>

```js
Page(perPage: 10, page: ${page}) {
  pageInfo {
    total
    perPage
    currentPage
    lastPage
    hasNextPage
    }
```

<br/>

Every anime or manga is dynamically rendered based on its unique `slug` or `id`. The `id` is conveyed to the query through the `context` parameter within the `getServerSideProps` function. Data linked to the provided `id` is also queried and transmitted to the page as props.

<br/>

```js
export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      {
        media: Media(id: ${context.params.id}) {
          title {
            english
            romaji
            native
          }
        }
      }
    `,
  });
}
```

<br/>

The displayed content is presented in a structured layout, featuring a description and image at the top, detailed information on the left, and images of the cast and related media on the right.

The search functionality is managed on the client side through Apollo's `useQuery`. This feature provides inherent properties such as `loading`, `error`, and `data`, which effectively monitor the loading and error states of a query while also tracking its results. The query is executed in Anilist's database and is displayed on the page in two columns, presenting anime results in one column and manga results in another.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399959/portfolio/anilog/search-1000w_e3sjtn.webp" alt="anilog search" width="700" loading="lazy" class="my-5 w-full">

## Challenges

One challenge I faced was implementing pagination. Fortunately, the API took care of the page numbering logic, requiring me only to specify the desired content per page and the current page number. The API managed details like the total content of the query, the current page, the last page, and the availability of a next page. I passed this information to a `Pagination` component, which featured arrow buttons to navigate and update the page numbers.

Mastering GraphQL presented another hurdle. It required me to reconsider my approach to API requests, mandating careful planning of the specific data I intended to query before initiating the data retrieval process. Fortunately, Anilist provided a valuable [GraphiQL Documentation Explorer](https://anilist.co/graphiql), enabling me to experiment with various queries it offered before incorporating them into my code.

While [Anilist's documentation](https://anilist.gitbook.io/anilist-apiv2-docs/) is robust, it lacks clarity on update notifications. Consequently, when new content is added with missing variables, it frequently disrupts my app. To address these issues, I implemented safeguards, including optional chaining to verify the presence of variables. However, I would prefer for the API to handle such scenarios on their backend. Nevertheless, this type of error serves as an excellent case for leveraging Typescript and, more specifically, [Zod](https://zod.dev/) for data validation. Perhaps in a future Typescript update or rewrite, I can integrate these tools.

## Learning Experience

This project provided me with the opportunity to approach the consumption of third-party APIs in a different manner. Utilizing the GraphQL and Anilist documentation, I successfully accomplished my two primary goals: refining my proficiency in design implementation and gaining knowledge in GraphQL.

Throughout this project, I acquired valuable insights that will contribute to the advancement of my developer skills. I familiarized myself with the `context` parameter within the `getServerSideProps` function and learned how to employ it in conjunction with the NextJS `Router` hook for managing client-side transitions, particularly for pagination. Storybook proved to be an effective tool for working with components in isolation. Apollo Client's built-in properties streamlined the process of fetching data from both the server and client, complete with automatic data caching.

While reflecting on the project, I recognize that not incorporating Typescript was a missed opportunity. Although I had been studying documentation and practicing code snippets, I wasn't prepared for the configuration and type errors that could potentially slow down my development process. Moving forward, I plan to continue practicing Typescript and implement it in my next project.

## Spotlight

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399959/portfolio/anilog/homepage-1000w_qluqsh.webp" alt="anilog anime main" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399959/portfolio/anilog/manga-homepage-1000w_pozmbh.webp" alt="anilog manga main" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399958/portfolio/anilog/anime-description-1000w_mhpnux.webp" alt="anilog anime description" width="700" loading="lazy" class="my-5 w-full">

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706399959/portfolio/anilog/top-anime-1000w_hqmkq7.webp" alt="anilog pagination" width="700" loading="lazy" class="my-5 w-full">
