import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "ashandthirst",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-13",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      notFoundHandling: "none",
      runWorkerFirst: ["/_vinext/static-cache/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      PLAYER_ACCESS_CODE: bindings.secret(),
      SESSION_SECRET: bindings.secret(),
      OPENAI_API_KEY: bindings.secret(),

      VAREK_RATE_LIMITER: bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 10,
          period: 60,
        },
      }),
    },
  }),
});
