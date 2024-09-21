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

export interface IConfig extends 
    IConfigExtend, 
    Partial<Pick<Options, "onlyFiles" | "onlyDirectories" | "cwd" | "markDirectories">> 
{
    mimeTypes?: IMIME;
    ssr?: boolean;
}
```

<!-- NOTE: for documenters, these options is ordered from the most important to the less -->
<!-- NOTE: types sample using `var` instead of `let` and `const` as function arguments are `var` by design -->

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

```ts
var opts_cwd: string = process.cwd();
```

Where does the beginning root to traverse all directory and files. If you not define, it would goes using Vite's `.root`. If not defined, it would goes using `process.cwd()` by default.

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

### `opts.ignore`

```ts
var opts_ignore: string[] = [];
```

List of pattern to be ignored. If you want to include all files from root and inside `public/` but not the public itself, you could do as follow:

```ts
export default defineConfig({
    plugins: [
        DynamicPublicDirectory( [ "public/**", "**" ], {
            ignore: ["/public"]
        } )
    ],
    publicDir: false,
})
```

**Notice:** `public/**` and `/public` are different.

### `opts.dst`

### `opts.dot`

```ts
var opts_dot: boolean = true;
```

Also search for dotfile (hidden files of linux). Those are in examples `.env`, `.npmrc`, `.git/`, `.gitignore/`, etc. For conveince to make everything discoverable, this option is `true` by default.

### `opts.onlyFiles`

```ts
var opts_onlyFiles: boolean = true;
```

Search and gather only files (with no directories). For convenience to get lower size and more countable, this option is `true` by default. If you want to also copy empty folder, you could set `false` to this options. It would be wise if you also set `opts.onlyDirectories` to `false`.

### `opts.onlyDirectories`

```ts
var opts_onlyDirectories: boolean = false;
```

Search and gather only directories (with no files). Opposite to `opts.onlyFies`, this option is `false` by default. Assuming, just copying folders is useless.

> Enable this options can lead to duplication issue, the folder which contains files inside it also reached, and also all folders inside it. When coping the folder, the same folders may be copied twice or more. 

### `opts.markDirectories`

```ts
var opts_markDirectories: boolean = true;
```

Mark all path of directory noticeable by adding the last slash at the end of the path. For conveince, this option is `true` by default. Assume this structure:

```css
dirA/
\_ dirAA/
\_ file.txt
dirB/
```

The list of folder could be:

```css
dirA/
dirA/dirAA/
dirA/file.txt
dirB/
```

## Enforced Behaviors

All `opts.*` internally directly passed to `fast-glob`, so you could override `opts` types and use any `fast-glob` available flags. This is not recommended as these options already selected to fit internal logic and this plugin original use-case and ideation. Even though that, there is options that is enforced to satisfy internal logic.

## `opts.absolute`

```ts
const opts_absolute: boolean = true;
```