---
blogTitle: "Creating Pagination Using Sanity CMS And NextJS"
pubDate: 2024-02-05
excerpt: "My approach to fetching data from Sanity CMS and creating pagination in NextJS."
imageSm:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1707178344/portfolio/blogs/sanity-nextjs-pagination/add-new-note-700w_g9ottl.webp"
  alt: "blog cover for pagination"
imageLg:
  url: "https://res.cloudinary.com/dloisor1x/image/upload/v1707178307/portfolio/blogs/sanity-nextjs-pagination/add-new-note-1000w_ibv4lu.webp"
  alt: "blog cover for pagination"
height: "370"
width: "700"
imgStyle: ""
sizes: "(max-width: 200px) 100vw, 45vw"
---

## Too Much Of A Good Thing

While working on <a href="/projects/sk8-n-meet-santana">Sk8 N Meet's website</a> and content management system, I recognized the necessity for pagination to render meetup flyers on the "Past Meetups" page. Instead of employing a simplistic approach of querying all meetup flyers from Sanity and displaying them on a single page, I anticipated potential performance degradation with increased database entries. My plan involved leveraging NextJS's `getServerSideProps` to execute data transformation on the server to optimize page loading and utilizing the client for effective page transitions.

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1706288390/portfolio/sk8-n-meet-santana/meetups-all-1000w_z1yysw.webp" alt="Sk8 N Meet project past meetups" width="700" loading="lazy" class="my-5 w-full">

I turned to the Sanity documentation in hopes of finding advanced query filters for pagination in their proprietary query language, GROQ. However, while they had a dedicated page on [pagination](https://www.sanity.io/docs/paginating-with-groq#f2843b17dffb), it lacked concrete examples, providing only high-level code. Additionally, I stumbled upon a GitHub repository named [React Sanity Pagination](https://github.com/dane-brown/react-sanity-pagination), but its rigid structure prevented customization for my project needs. The repository had also not been updated in five years, leading me to dismiss it due to concerns about abandonment. Despite extensive searching on Stack Overflow, I couldn't find anyone else with the same need for pagination using the NextJS and Sanity stack. Just as I was losing hope, I stumbled upon an insightful [blog post](https://hdoro.dev/minimal-sanity-io-pagination) by a GROQ expert, which provided me with the guidance I needed to formulate queries for the desired data. Although the blog post focused on manipulating different types of content data and utilized Svelte, I was able to adapt the principles learned to my project successfully.

## Background Worker

The collaboration between the client and server involves dynamically fetching data from Sanity based on the user's current page while reviewing past meetups. Initially, data is retrieved from the server. Within the NextJS `getServerSideProps`, we access the `context` parameter, which contains various keys. One of these keys, `query`, represents the query string, including dynamic route parameters. In this project, the passed query is `page`, indicating the current page number. If a page number is identified, it's converted to a numerical value and added to `pageNumber`. If no page number is detected, it signifies that the user is on the first page, and thus 1 is added to `pageNumber`.

Next, we specify the desired number of items to fetch from the database at once. I opted for 8 items and assigned this value to `ITEMS_PER_PAGE`. Subsequently, we construct the Sanity query to be included in `COLLECTION_QUERY`. The query is structured as follows: we retrieve items of type `meetup` and arrange the results in descending order based on their `id`, `title`, `image`, and `slug`. These attributes are essential for rendering meetup cards and linking them to their respective details page. To initiate pagination, we utilize NextJS `redirect` to modify the URL from `/past-events` to `/past-events?page=1`, simplifying the process of incrementing and decrementing page numbers.

<br/>

```js

export const getServerSideProps: GetServerSideProps<serverProps> = async (
  context
) => {
  const pageNumber = context.query.page ? Number(context.query.page) : 1;
  const ITEMS_PER_PAGE = 8;

  const COLLECTION_QUERY = `*[_type == "meetup"] | order(meetupDate desc){_id, title, image, slug}`;

  if (context.resolvedUrl == "/past-events") {
    return {
      redirect: {
        permanent: false,
        destination: "/past-events?page=1",
      },
    };
  }
}

```

<br/>

Following that, we retrieve data from Sanity using the specified parameters. We compute the 8 meetups required for the current page, determine the total number of pages, and identify the current page number. These results are then returned as props, which are subsequently transmitted to the page and utilized on the client-side. Additionally, we incorporate a safety measure to address instances where a user queries a page number outside the valid range in the URL. If the page number exceeds the total number of pages or is less than 1, the user is redirected to a customized error page.

<br/>

```js
const meetupData = await client.fetch(
  `
    {
      "meetups": ${COLLECTION_QUERY} [($pageIndex * ${ITEMS_PER_PAGE})...($pageIndex + 1) * ${ITEMS_PER_PAGE}],
      "pagination" : {
        "totalPageCount" : count(${COLLECTION_QUERY}._id) / ${ITEMS_PER_PAGE},
        "pageNumber": $pageIndex + 1,
      }
    }`,
  {
    pageIndex: pageNumber - 1,
  },
);

const MAX_PAGE_LIMIT = Math.ceil(meetupData.pagination?.totalPageCount || 1);

if (
  Number(context.query.page) < 1 ||
  Number(context.query.page) > MAX_PAGE_LIMIT
) {
  return {
    redirect: {
      permanent: false,
      // redirect to error page
      destination: "/_error",
    },
  };
}

return {
  props: {
    meetups: meetupData.meetups,
    totalPageCount: MAX_PAGE_LIMIT,
    pageNumber: meetupData.pagination.pageNumber,
  },
};
```

<br/>

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1707417704/portfolio/blogs/sanity-nextjs-pagination/Sk8NMeet-Santana-error-page-1000w_giqn7u.webp" alt="Sk8 N Meet project custom error page" width="700" loading="lazy" class="my-5 w-full">

## Page Transitions

Moving to the client side, we facilitate dynamic rendering. We pass the props, along with their respective types. Among these props is the page number, which is stored in the state. This value dictates the user's current page and will be adjusted accordingly during page transitions. The other prop, meetups, consist of the 8 queried meetups from the server and are subsequently rendered onto the page.

<br/>

```js

const PastMeetUp = ({
  meetups,
  totalPageCount,
  pageNumber,
}: {
  meetups: IMeetup[];
  totalPageCount: number;
  pageNumber: number;
}) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [page, setPage] = useState(pageNumber);

  // ...
  {meetups.map((meetup, indx) => (
          <div key={meetup._id} className='flex items-center justify-center'>
            <FlyerPast
              _id={indx}
              key={meetup._id}
              image={meetup.image}
              title={meetup.title}
              meetupDate={meetup.title}
              slug={meetup.slug}
            />
          </div>
        ))}
  // ...

}

```

<br/>

The total page count prop serves a crucial role in the page transition buttons. If the current page number equals or exceeds the total page count, indicating the final page or an out-of-bounds page, the next button is disabled to prevent further navigation. To ensure consistency, a safeguard is implemented on the server to handle out-of-bounds page numbers. Similarly, the previous button is disabled if the current page number is 1 or less, applying the same safeguarding mechanism.

<br/>

```js

// back page button
<button
  type='button'
  className={}
  disabled={btnDisabled || page <= 1}
  onClick={prevPage}
>
<IoIosArrowBack className='mr-1 h-6 w-6' />
Previous
</button>

// next page button
<button
  type='button'
  className={}
  disabled={btnDisabled || pageNumber >= totalPageCount}
  onClick={nextPage}
>
  Next
  <IoIosArrowForward className='ml-1 h-6 w-6' />
</button>

```

<br/>

<img src="https://res.cloudinary.com/dloisor1x/image/upload/v1707417852/portfolio/blogs/sanity-nextjs-pagination/Sk8NMeet-Santana-page-buttons-1000w_vwj55n.webp" alt="Sk8 N Meet project page transition buttons" width="700" loading="lazy" class="my-5 w-full">

Every button features an `onClick` handler function, either `nextPage` or `prevPage`, responsible for sending a query to the URL. Within these handler functions, the page number is either incremented or decremented accordingly. To include the page number as a query parameter, the `Router` from `next/router` is utilized. It pushes the base URL followed by the new page number. As previously explained, `getServerSideProps` extracts the query from the `context` and retrieves the relevant data based on the provided page number.

<br/>

```js

const nextPage = (e: React.SyntheticEvent) => {
  e.preventDefault();
  setBtnDisabled(true);
  setPage((prev) => prev + 1);
  Router.push({ pathname: "/past-events", query: { page: `${page + 1}` } });
  setBtnDisabled(false);
};

const prevPage = (e: React.SyntheticEvent) => {
  e.preventDefault();
  setBtnDisabled(true);
  setPage((prev) => prev - 1);
  Router.push({ pathname: "/past-events", query: { page: `${page - 1}` } });
  setBtnDisabled(false);
};

```

<br/>

## Reflection

This method of using the server and client to dynamically fetch data significantly reduced page render speeds. Instead of fetching all the meetups stored in Sanity, only 8 are queried at a time depending what page number the user is currently on. NextJS `redirect` is implemented on the server inside the `getServerSideProps` function to prevent the user from going out of bounds in page numbers and will be redirected to a custom error page. I gained some valuable knowledge implementing pagination using NextJS and Sanity. Although both documentations didn't have great examples, it allowed me go outside my comfort zone and figure it out a solution on my own.

This approach, leveraging both server and client, has significantly enhanced page rendering speeds by dynamically fetching data. Instead of retrieving all meetups stored in Sanity, only 8 are queried at a time, dependent on the user's current page number. The integration of NextJS redirect within the getServerSideProps function ensures users stay within bounds regarding page numbers, redirecting them to a customized error page if necessary. Implementing pagination using NextJS and Sanity has been an enlightening experience. Despite the lack of comprehensive examples in their documentation, it pushed me beyond my comfort zone, prompting me to devise a solution independently.
