# Features

### No copy development

Unlike some other plugins, to create a common folder, you have to copy multiple folders into another folder. This leads
to the creation of unnecessary additional folders.
With this plugin, that issue will be resolved. No folders will be created when running in a development environment.
This only happens during bundling.

### SSR support

It supports libraries and frameworks for `server-side rendering`, such as `SolidJS` and `Astro`.

### Ignore file

With the `dst` option, you can easily exclude files you don't want to include when `building` or running in
`development`.

### Folder output

You can customize the output of shared folders.

### Watch folder

The issue I faced with using Vite's publicDir is that the page does not reload when I make any changes in this
directory. With this plugin, you can freely watch the inputs of the public directories, and the page will reload and
refresh if there are any changes in those directories.

### Symlink support

We support reading and writing symlinks in both development and production.
