import { defineConfig, loadEnv } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  for (const key of [
    "OPENAI_API_KEY",
    "PLAYER_ACCESS_CODE",
    "SESSION_SECRET",
  ]) {
    if (env[key]) {
      process.env[key] = env[key];
    }
  }

  return {
    assetsInclude: ["**/*.md"],

    plugins: [
      tailwindcss(),

      vinext({
        cache: {
          cdn: staticAssetsAdapter(),
        },
        prerender: {
          routes: "*",
        },
      }),

      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
  };
});
