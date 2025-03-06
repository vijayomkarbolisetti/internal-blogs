import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./sanity/schemas/index"; // ✅ Fix import path

export default defineConfig({
  name: 'default',
  title: 'Internal Blogs',
  projectId: 'fm2iaf7n', // ✅ Replace with your actual Project ID
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  basePath: '/studio', // ✅ Make sure Next.js routes correctly
  plugins: [deskTool()],
  schema: schema,
});
