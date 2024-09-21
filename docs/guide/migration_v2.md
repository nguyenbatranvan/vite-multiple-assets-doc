# Migration to V2

## Quick Overview

Basically, this major would allow you to do this:

```ts
const defaultExcluded = ["{,**/}.git/**", "{,**/}{,*}.local{,/**}", "src/**", "dist/**", "node_modules/**", "public/**", "vite.config.*.*"];

DynamicPublicDirectory(["public/**", "**"], {
    ignore: [...defaultExcluded.filter(v => v.search("public") == -1), "/public", "*lock*"],
}) as PluginOption,
```

**What does it do?** \
- It would copy everything from public to `dist/`
- It would also copy everything from the root to `dist/`
- But, except junks and cache like `.git`, `*.local`, and `node_modules`
- It would also not copy `dist/` folder if it is already exists. (Well, we do not want deep duplication)
- It would also exclude the `public/` itself, but not the content of it.

That's it.

## Migration Step

This major is taking advantage of Globs Pattern using [fast-glob](https://www.npmjs.com/package/fast-glob) and [micromatch](https://www.npmjs.com/package/micromatch/v/3.1.10). Take a look at this basic v1 configuration:

```diff
+ import { type PluginOption } from 'vite'
import DynamicPublicDirectory from "vite-multiple-assets";
// same level as project root
- const dirAssets=["libs/assets","repo1/assets", "/"];
+ const dirAssets=["libs/assets/**","repo1/assets/**", "**"];

// example
const mimeTypes = {
    '.acc':'application/acc'
}

export default defineConfig({
    plugins: [
        DynamicPublicDirectory(dirAssets,{
            ssr:true,
            mimeTypes
-       })
+       }) as PluginOption
    ]
})
```

As such, you just need to add wildcard `/**` at the end of it

See? There are no much to change.

## Developer Notes

- Please see [Featuring Glob, Excluding Files, and Change Output by FarhanMS123 · Pull Request #16](https://github.com/nguyenbatranvan/vite-multiple-assets/pull/16) and [Output asset folders at a subdirectory · Issue #9](https://github.com/nguyenbatranvan/vite-multiple-assets/issues/9) for more contexts
- Add more options to use micromatch
- Issue when path is beginning with `./` or has `/./`
- Need update types to using vite instead of rollup