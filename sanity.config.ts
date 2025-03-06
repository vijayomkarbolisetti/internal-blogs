import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./sanity/schemas/index"; // ✅ Fix import path

export default defineConfig({
  name: "default",
  title: "My Sanity Blog",
  projectId: "fm2iaf7n", // ✅ Ensure this matches your Sanity project
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: schema.types, // ✅ Use the correct schema export
  },
});
