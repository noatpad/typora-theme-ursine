const { src, dest, series, done } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const merge = require('merge-stream');

const build = () => {
  console.log("Zipping files...")
  sass.compiler = require('node-sass');

  return src('*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest('css/'));
}

const makeZip = (cyrillic) => {
  var cssGlob, assetGlob, zipName;
  if (cyrillic) {
    cssGlob = 'css/*-cyrillic.css';
    assetGlob = ['ursine/*.png', 'ursine/AdelleCyrillic-*.woff', 'ursine/AvenirNextCyr-*.woff']
    zipName = 'Ursine_Cyrillic.zip';
  } else {
    cssGlob = ['css/*.css', '!css/*-cyrillic.css'];
    assetGlob = ['ursine/*.png', 'ursine/Adelle_*.woff', 'ursine/AvenirNextLTPro-*.woff'];
    zipName = 'Ursine.zip';
  }

  console.log(`Building release ${zipName}...`)
  return merge(
    src(cssGlob),
    src(assetGlob)
      .pipe(rename((file) => {
        file.dirname = 'ursine/' + file.dirname;
      }))
  )
    .pipe(zip(zipName))
    .pipe(dest('./release'));
}

const release = (done) => {
  makeZip(false);
  makeZip(true);
  done();
}

exports.default = build;
exports.release = series(build, release);
