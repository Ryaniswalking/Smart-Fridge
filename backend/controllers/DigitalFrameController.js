const fs = require("fs").promises;
const { imageSizeFromFile } = require("image-size/fromFile");
const path = require("path");
const photosPath = path.join(__dirname, "../photos");

const isVerticalPhoto = async (fileName) => {
  try {
    const dimensions = await imageSizeFromFile(`${photosPath}/${fileName}`);
    return dimensions.height > dimensions.width;
  } catch (err) {
    console.log(`Error from isVerticalPhoto: ${err}`);
    throw err
  }
};

const getPhotoFileNames = async () => {
  try {
    const files = await fs.readdir(photosPath);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    return imageFiles;
  } catch (err) {
    console.log(`Error in getPhotoFileNames: ${err}`);
    return [];
  }
};

const compilePhotos = async () => {
  const verticalPhotos = [];
  const horizontalPhotos = [];
  const files = await getPhotoFileNames();

  for (const file of files) {
    const isVertical = await isVerticalPhoto(file);
    if (isVertical) {
      verticalPhotos.push(file);
    } else {
      horizontalPhotos.push(file);
    }
  }
  return {
    vertical: verticalPhotos,
    horizontal: horizontalPhotos
  };
};

module.exports = {
  compilePhotos,
};
