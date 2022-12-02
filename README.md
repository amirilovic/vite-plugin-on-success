# vite-plugin-on-success

Plugin adds functionally to run a command once vite build is done. This can be useful if you are using vite to build node server and you want to run for example `node index.js` after `vite build`.

## Usage

Install the package:

```
$ npm install -D vite-plugin-on-success
```

Add it to your vite.config.ts:

```ts
import { defineConfig } from "vite";
import { onSuccess } from "vite-plugin-on-success";

export default defineConfig({
  build: {
    ssr: true,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [onSuccess({ command: "node index.js" })],
});
```

Run vite build:

```bash
$ vite build --watch
```

=> `node index.js` is executed after build is done.

## Using Environment Variable

Plugin also works with `VITE_ON_SUCCESS` environment variable.

Add the plugin to your vite config without on success command like:

```ts
import { defineConfig } from "vite";
import { onSuccess } from "vite-plugin-on-success";

export default defineConfig({
  build: {
    ssr: true,
    sourcemap: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [onSuccess()], // no command specified
});
```

Run vite build with environment variable like:

```bash
$ VITE_ON_SUCCESS='node dist/index.js' vite build --watch
```
