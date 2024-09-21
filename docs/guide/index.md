# Setup
`vite-multiple-assets` support vite to run with multiple directory public directory.
## Feature
- No copy file when run dev, help with no impact on performance when launching apps with vite
- Support automatically copy files when running build
- Support SSR

## Quick setup would be in the `vite.config.js`:

* Default with vite's configuration you can only use 1 publicDir in `vite.config.ts`
```ts
export default defineConfig({
    // default is public folder
    publicDir:''
})
```
* With this plugin you can add multiple public folders

## Install

```sh
npm i -D vite-multiple-assets
```

## Basic Usage

In `vite.config.ts`
```ts
import { type PluginOption } from 'vite'
import DynamicPublicDirectory from "vite-multiple-assets";
// same level as project root
const dirAssets = ["public/**", "libs/assets/**", "repo1/assets/**"];

// example
const mimeTypes = {
    '.acc':'application/acc'
}

export default defineConfig({
    plugins: [
        DynamicPublicDirectory( dirAssets, {
            ssr: true,
            mimeTypes
        }) as PluginOption
    ],
    publicDir: false,
})
```
* With the above configuration will automatically add files in `libs/assets`, `repo1/assets` folders as static assets for your project
* It also recommended to set `publicDir` to `false` to avoid confusion
* Notic the wildcard `**`, this plugin use glob pattern by default. You could also review [fast-glob](https://www.npmjs.com/package/fast-glob) and [micromatch](https://www.npmjs.com/package/micromatch/v/3.1.10)

### Example
[Detail](https://github.com/nguyenbatranvan/vite-multiple-assets/blob/main/packages/examples/react/vite.config.ts)

## Options

```ts
import type { PluginOption } from "vite";

export default function DynamicPublicDirectory(assets: IAssets, opts: IConfig = {}): PluginOption
```

```ts
import type { Options } from "fast-glob";

export interface IConfigExtend extends Partial<Pick<Options, "ignore" | "dot">> {
    dst?: string | FDst;
}

export type IMIME = Record<string, string>;

export interface IConfig extends 
    IConfigExtend, 
    Partial<Pick<Options, "onlyFiles" | "onlyDirectories" | "cwd" | "markDirectories">> 
{
    mimeTypes?: IMIME;
    ssr?: boolean;
}
```

### `assets`

```ts
var assets: IAssets = [];
type IAssets = string[];
```

List copied `assets` by following pattern defined in [`fast-glob` pattern](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#pattern-syntax) which is [Unix Glob](https://man7.org/linux/man-pages/man7/glob.7.html) [Pattern](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html). There are few things to take:

- always use forward-slash `/` for path, and use backslash to escape character
- do not use single-dot `./**/*.txt` `./abc/**/*.txt` for current path, instead straight use the pattern `**/*.txt` `abc/**/*.txt`
- If you are hope certain folder included to be copied, make it in selectable list pattern, `dir1/{\x01,folder_name}/**`. Just ensure there is no folder or file named by first ascii

For example:

```ts
export default defineConfig({
    plugins: [
        DynamicPublicDirectory( [
            "public/{\x01, models}/**", // order is important
            "public/**", // basic public needs
            "../../assets/**" // you could go to upper level
        ] )
    ],
    publicDir: false,
})
```

### `opts.cwd`

### `opts.ssr`

```ts
var opts_ssr: boolean | undefined = false;
```

SSR option accept certain value:
- `true`: support using Solid-js or framework with SSR
- `false` (default): support client side, static build

If you need to go up, you could use `%2E%2E/file.txt` as alternative of `../file.txt`. Also, you could you `%2Fetc/wwwroot` as alternative of `/etc/wwwroot`. Just in case you need it.

### `opts.mimeTypes`

```ts

var opts_mimeTypes: IMIME = {}
export type IMIME = Record<string, string>;

const internalMimeTypes: IMIME = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "font/eot",
    ".otf": "font/otf",
    ".wasm": "application/wasm",
    ".mjs": "text/javascript",
    ".txt": "text/plain",
    ".xml": "text/xml",
    ".wgsl": "text/wgsl",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".tiff": "image/tiff",
    ".gz": "application/gzip",
    ".zip": "application/zip",
    ".rar": "application/x-rar-compressed",
    ".7z": "application/x-7z-compressed"
};

```

You could define your extended content types using `opts.mimeTypes`. This feature could be use when using `SSR` mode. There are few hierarchi when choosing the right types:

1. get the last extention and compare it to your `opt.mimeTypes`. If not exists,
2. get the last extention and compare it to `internalMimeTypes`. If not exists,
3. do `mime.lookup` to the entire filename so it will be automatically handled according to the [```mime-types```](https://www.npmjs.com/package/mime-types) library by [`mime-db`](https://www.npmjs.com/package/mime-db). If not exists,
4. just use `.html` content type from `opts.mimeTypes` and then `internalMimeTypes`. If not exists,
5. just lookup `.html` content type from `mime-types`

### `opts.dst`

### `opts.ignore`