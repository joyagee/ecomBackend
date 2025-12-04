const cloudinary = require("../config/cloudinary");

exports.uploadToCloudinary = async (fileBluffer, resourecType) => {
  try {
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
          { resourse_type: resourecType, folder: "Users" },
          (error, result) => {
            if (error) return reject(error);
            if (result) return resolve(result);
          }
        )
        .end(fileBluffer);
    });

    const result = await uploadPromise;
    console.log("image added successfully");
    return result.secure_url;
  } catch (error) {
    console.log("image upload failed!", error);
    throw Error;
  }
};
