import { defineField, defineType } from "sanity";

export const blog = defineType({
    name: "blog",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }],
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "tag",
            type: "string",
            validation: (Rule) => Rule.min(1).max(25).required().error("Tag is required"),
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().error("Image is required"),
        }),
        defineField({
            name: "text",
            type: "markdown",
        }),
    ],
})