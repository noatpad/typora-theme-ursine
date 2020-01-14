const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const zip = require("gulp-zip");
const merge = require("merge-stream");
const os = require("os");
const path = require("path");

const buildStyles = () => {
  console.log("Compiling CSS files...");
  sass.compiler = require("node-sass");

  const regular = src(["*.scss", "!*-cyrillic.scss", "!*-alt.scss"])
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("dist/ursine"));

  const cyrillic = src("*-cyrillic.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(dest("dist/ursine-cyrillic"));

  const alt = src("*-alt.scss")
    .pipe(sass({ outputStyle: "expanded" })).on("error", sass.logError)
    .pipe(dest("dist/ursine-alt"));

  return merge(regular, cyrillic, alt);
};

const includeAssets = () => {
  const regular = src([
    "ursine/*.png",
    "ursine/Cousine-Regular.woff",
    "ursine/Adelle-*.woff",
    "ursine/AvenirNextLTPro-*.woff"
  ]).pipe(dest("dist/ursine/ursine"));

  const cyrillic = src([
    "ursine/*.png",
    "ursine/Cousine-Regular.woff",
    "ursine/AdelleCyrillic-*.woff",
    "ursine/AvenirNextCyr-*.woff"
  ]).pipe(dest("dist/ursine-cyrillic/ursine"));

  const alt = src([
    "ursine/*.png",
    "ursine/Cousine-Regular.woff",
    "ursine/RobotoSlab-*t.ttf",
    "ursine/OpenSans-*.ttf"
  ]).pipe(dest("dist/ursine-alt/ursine"));

  console.log("Including assets...");
  return merge(regular, cyrillic, alt);
};

const makeZip = () => {
  const regular = src("dist/ursine/**").pipe(zip("Ursine.zip"));

  const cyrillic = src("dist/ursine-cyrillic/**").pipe(zip("Ursine_Cyrillic.zip"));

  const alt = src("dist/ursine-alt/**").pipe(zip("Ursine_Alt.zip"));

  console.log(`Building releases...`);
  return merge(regular, cyrillic, alt).pipe(dest("./release"));
};

const dev = () => {
  let themeLocation;
  switch (os.type()) {
    case "Windows_NT":
      themeLocation = `${process.env.APPDATA}\\Typora\\themes`;
      break;
    case "Darwin":
      themeLocation = `${process.env.HOME}/Library/Application Support/abnerworks.Typora/themes`
      break;
  }

  // Watch styles
  watch(
    ["*.scss", "ursine/*.scss"],
    { ignoreInitial: false },
    function styleWatcher() {
      return themeLocation
        ? buildStyles().pipe(dest(themeLocation))
        : buildStyles();
    }
  );

  // Watch assets
  watch(
    ["ursine/*.(ttf|woff|png)"],
    { ignoreInitial: false },
    function assetWatcher() {
      return themeLocation
        ? includeAssets().pipe(dest(path.join(themeLocation, "ursine")))
        : includeAssets();
    }
  );
};

exports.default = parallel(buildStyles, includeAssets);
exports.release = series(exports.default, makeZip);
exports.dev = dev;
