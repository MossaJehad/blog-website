import { defineQuery } from "next-sanity";

export const BLOG_QUERY = defineQuery(`
  *[
    _type == "blog" &&
    defined(slug.current) &&
    (
      !defined($search) ||
      title match $search ||
      tag match $search ||
      author->name match $search
    )
  ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author->{
      _id,
      name,
      image,
      bio
    },
    views,
    description,
    tag,
    image
  }
`);


export const BLOG_BY_ID_QUERY =
defineQuery(`*[_type == "blog" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author->{
        _id,
        name,
        image,
        bio
    },
    views,
    description,
    tag,
    image,
    text
}`);

export const BLOG_VIEWS_QUERY = defineQuery(
    `
        *[_type == "blog" && _id == $id][0] {
            views, _id
        }
    `
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0] {
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        }
`);