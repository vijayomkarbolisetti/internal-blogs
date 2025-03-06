import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { blockContent } from "./blockContent";
import { author } from "./author"; // ✅ Import Author Schema
import { category } from "./category"; // ✅ Import Category Schema
import { tool } from "./tool";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, blockContent, author, category,tool], // ✅ Add author & category
};
