import { defineType, defineField } from "sanity";

export const tool = defineType({
  name: "tool",
  title: "Tools",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tool Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "details",
      title: "Full Details",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "link",
      title: "Tool Link",
      type: "url",
    }),
  ],
});
