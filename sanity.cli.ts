/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = "fm2iaf7n"; // ✅ Ensure this matches your actual Sanity Project ID
const dataset = "production";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "internal-blogs-psi", // ✅ Add correct `studioHost` here
});
