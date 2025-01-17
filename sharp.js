const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images");
const destination = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const imageName = image.split(".").slice(0, -1).join(".");

  sharp(`${target}/${image}`)
    .resize(768)
    .toFile(path.resolve(__dirname, `${destination}/${imageName}-small.jpg`));

  sharp(`${target}/${image}`)
    .resize(1200)
    .toFile(path.resolve(__dirname, `${destination}/${imageName}-medium.jpg`));

  sharp(`${target}/${image}`)
    .resize(1920)
    .toFile(path.resolve(__dirname, `${destination}/${imageName}-large.jpg`));
});
