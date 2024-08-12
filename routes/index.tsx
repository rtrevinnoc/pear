import { Handlers, PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Result from "../interfaces/Result.ts"
import Data from "../interfaces/Data.ts"

export const handler: Handlers<Data | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const currentPage = parseInt(url.searchParams.get("page") || "1");

    let results: Result[] = [];

    if (query != "") {
       const result: Result = {
        header: "SOME HEADER",
        url: "https://some-url.com",
        language: "en",
        title: "SOME TITLE",
        description: "SOME DESCRIPTION"
      }
      results.push(result);     
    }

    const nextPage: number = currentPage + 1;
    return ctx.render({ query, results, nextPage });
  },
};

export function SearchBar(props: { text: string }) {
  return (
    <form class="my-6 w-full">
      <div class="flex items-center border rounded-xl p-2 dark:(border-gray-600)">
        <input autoFocus autoComplete="off" class="appearance-none bg-transparent border-none w-full dark:(text-gray-200) ml-2 p-2 leading-tight focus:outline-none" type="text" id="query" name="query" placeholder="Chat with the web..." required value={props.text} />
        <button class="flex-shrink-0 border-transparent mx-2 p-2 rounded" type="submit">Search</button>
      </div>
    </form>
  );
}

export function ResultCard(props: Result) {
  return (
    <div class="items-center border rounded-xl px-5 py-3 my-5 mx-1 dark:(border-gray-600)">
      <a href={props.url}>
        <div class="mb-3">
          <h2 class="text-lg font-medium">{props.header}</h2>
          <h6 class="text-xs font-mono font-thin break-all">{props.url}</h6>
        </div>
        <p class="text-sm line-clamp-3">{props.body}</p>
      </a>
    </div>
  );
}

export function UpdateButton(props: { currentQuery: string; nextPage: number }) {
  return (
    <form class="w-full text-center">
      <input class="hidden" type="input" name="query" required value={props.currentQuery} />
      <input class="hidden" type="number" name="page" required value={props.nextPage} />
      <button class="border-transparent mx-2 p-2 rounded" type="submit">Load More</button >
    </form>
  );
}

export default function Home({ data }: PageProps<Data | null>) {
  const { query, results, nextPage } = data;

  return (
    <div class="flex py-5 justify-center items-center w-full min-h-screen dark:(bg-gray-800 text-gray-300)" >
      <div class="max-w-screen-md w-full mx-3">
        <SearchBar text={query} />
        { results.map((result) => {
          return <ResultCard header={result.header} url={result.url} body={result.description} />
          }) }
        { results.length > 0 && <UpdateButton nextPage={nextPage} /> }
      </div>
    </div>
  );
}
