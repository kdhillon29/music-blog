import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  // const posts = await getCollection('blog');
  const posts = await getCollection("posts");
  const authors = await getCollection("authors");

  return rss({
    title: SITE_TITLE,
    stylesheet: "/rss/styles.xsl",
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      //   ...post.data,
      title: post.data.title,
      link: `/blog/${post.slug}/`,
      description: post.data.description,
      pubDate: post.data.date,
      customData: `<author>${authors.find((author) => author.slug === post.data.author.id)?.data.name}</author>`,
    })),
  });
}
