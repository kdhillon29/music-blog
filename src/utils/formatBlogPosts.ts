import type { CollectionEntry } from "astro:content";

export function formatBlogPosts(
  posts: CollectionEntry<"posts">[],
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    start = 0,
    end = posts.length,
    limit = undefined,
  } = {}
) {
  console.log(start, end);
  const filteredPosts = posts.reduce(
    (acc: CollectionEntry<"posts">[], post: CollectionEntry<"posts">) => {
      // const { date, draft=false } = post.data;
      const { date } = post.data;
      //filtered out drafts
      // if (filterOutDrafts && draft) return acc;
      if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
      acc.push(post);
      return acc;
    },
    []
  );
  if (sortByDate) {
    filteredPosts.sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });

    if (typeof end === "number" && end) {
      return filteredPosts.slice(start, end);
    }

    if (typeof limit === "number" && limit) {
      return filteredPosts.slice(start, limit);
    }

    return filteredPosts;
  }
}
