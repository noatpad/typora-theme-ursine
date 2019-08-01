# Ursine

A theme for the wonderful [Typora](https://typora.io), inspired by [Bear](https://bear.app)'s colors and elegancy.

![thumbnail](images/thumbnail.png)

Uses *Avenir Next LT Pro* and *Adelle* fonts, & the colors are based on Bear's *Red Graphite* and *Dark Graphite* themes.

Code fence themes are adapted from CodeMirror's *3024 Day* and *Dracula* themes for Ursine Polar and Umbra, respectively.

> Note: These themes have been designed and tested for both **MacOS & Windows** (though primarily Mac).

## Installation

Decompress the latest release from [here](https://github.com/aCluelessDanny/typora-theme-ursine/releases). In Typora's preferences windows, go to `General -> Themes` and click on `Open Theme Folder`. Drop all the decompressed files and folders in there, and enjoy!~

*Note:* If you require using Cyrillic-compatible fonts, then download the Cyrillic variant found in the release instead.

## Preview

<details>
<summary>Click here to preview themes</summary>

Ursine Polar | Ursine Umbra
:---:|:---:
![Polar Preview 1](images/polar-1.png) | ![Umbra Preview 1](images/umbra-1.png)
![Polar Preview 2](images/polar-2.png) | ![Umbra Preview 2](images/umbra-2.png)
![Polar Preview 3](images/polar-3.png) | ![Umbra Preview 3](images/umbra-3.png)
![Polar Splashscreen](images/polar-splashscreen.png) | ![Umbra Splashscreen](images/umbra-splashscreen.png)
![Polar Source Code Preview](images/polar-source.png) | ![Umbra Source Code Preview](images/umbra-source.png)
![Polar Unibody Preview](images/polar-unibody.png) | ![Umbra Unibody Preview](images/umbra-unibody.png)

</details>

## Build

Ursine has recently switched to developing in [Sass](https://sass-lang.com/) and [Gulp.js](https://gulpjs.com/), so the repo no longer holds the direct CSS files for the sake of keeping the repo's filetree clean.

If you wish to manually build the theme (and maybe add your own touches in the process), you'll need `npm` & run the following commands:

```bash
npm i
gulp
```

The compiled CSS files will be located in `/css` once complete.

### Related

- If you like Ursine, but need a `RTL` theme, check out [sadra's Middle East theme!](https://github.com/sadra/middle-east)
