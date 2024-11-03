import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary.
 *
 * @param {Buffer} file - The image file buffer to upload.
 * @param {string} folder - The folder where the image will be stored in Cloudinary.
 * @param {number} [quality=70] - The quality of the uploaded image (1-100), defaults to 70.
 * @returns {Promise<object>} A promise that resolves with the result of the upload, or rejects with an error.
 *
 * @example
 * const image = await uploadImage(buffer, "user_images", 80);
 * console.log(image.secure_url); // Output: Image URL
 */
export const uploadImage = async (
  file: Buffer,
  folder: string,
  quality: number = 70
): Promise<object> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        quality,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Upload result is undefined"));
          }
        }
      }
    );

    if (uploadStream) {
      uploadStream.end(file);
    } else {
      reject(new Error("Failed to create upload stream"));
    }
  });
};

/**
 * Deletes an image from Cloudinary.
 *
 * @param {string} publicId - The public ID of the image to delete.
 * @returns {Promise<object>} A promise that resolves with the result of the deletion, or rejects with an error.
 *
 * @example
 * const result = await deleteImage("folder/image_id");
 * console.log(result); // Output: Deletion result
 */
export const deleteImage = async (publicId: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
