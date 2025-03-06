import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "fm2iaf7n",  // Get this from Sanity Dashboard
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-02-19",
});
