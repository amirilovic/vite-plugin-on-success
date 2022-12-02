import { defineConfig } from "vitest/config";
import { checker } from "vite-plugin-checker";

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    environment: "node",
  },
  build: {
    ssr: true,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [checker({ typescript: true })],
});
