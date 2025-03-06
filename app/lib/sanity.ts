import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// ✅ Sanity Configuration
export const client = createClient({
  projectId: "fm2iaf7n",  // 🔹 Get this from Sanity Dashboard
  dataset: "production",  // 🔹 Your dataset (e.g., 'production' or 'development')
  useCdn: process.env.NODE_ENV === "production", // 🔹 Faster but not for real-time content
  apiVersion: "2023-02-19", // 🔹 Set your API version (Sanity API latest date)
});

// ✅ Image URL Builder
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source).auto("format").fit("max");
}
