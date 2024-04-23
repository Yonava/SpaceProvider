import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

/**
 * @description Checks if the file is an accepted image format.
 * @param file
 * @returns a boolean value that indicates if the file is an accepted image format
 */
function isImageFormat(file: File): boolean {
  const acceptedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/bmp",
    "image/heic",
    "image/heif",
  ];
  return acceptedFormats.some((f) => f === file.type);
}

/**
 * @description Converts input heic/heif file to jpeg file.
 * @param file heic/heif file
 * @returns a promise that resolves to a new File object with the jpeg format
 */
async function convertHeicToJpeg(file: File): Promise<File> {
  let convertedBlob = await heic2any({
    blob: file,
    toType: "image/jpeg",
  });
  // if input heic file has multiple images, just take the first one
  if (convertedBlob instanceof Array) {
    convertedBlob = convertedBlob[0];
  }
  return new File([convertedBlob], "", { type: "image/jpeg" });
}

/**
 * @description Checks if the file is heic/heif format.
 * @param file
 * @returns a boolean value that indicates if the file is heic/heif format
 */
function isHeic(file: File): boolean {
  return file.type === "image/heic" || file.type === "image/heif";
}

/**
 * @description Converts the image to jpeg format, compressing it to be within a
 * certain file size.
 * @param file
 * @param maxSizeMB in MB
 * @param maxWidthOrHeight in pixels
 * @returns a promise that resolves to a new File object with the jpeg format
 */
async function convertToJpeg(
  file: File,
  maxSizeMB: number,
  maxWidthOrHeight: number,
): Promise<File> {
  if (isHeic(file)) {
    file = await convertHeicToJpeg(file);
  }
  return await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight,
    fileType: "image/jpeg",
    alwaysKeepResolution: true,
  });
}

/**
 * @description Encodes the file to base64 format.
 * @param file
 * @returns a promise that resolves to a string of the file encoded in base64
 */
function encodeToBase64(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise<string>((resolve) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
}

/**
 * @description Takes a file, maximum size (in MB), maximum height or width (in pixels) and 
 * converts said file to a jpeg format under the two limits.
 * @param file
 * @param maxSizeBase64 in MB
 * @param maxWidthOrHeight in pixels
 * @returns a promise that resolves to a string of the file encoded in base64
 */
export async function uploadImageFilePipeline(
  file: File,
  maxSizeOfBase64: number,
  maxWidthOrHeight: number,
): Promise<string> {
  /**
   * @description Takes a number representing the size in MB of a base64 string and returns 
   * corresponding file's estimated size.
   * @param sizeMB size in MB of base64 string
   * @returns estimation of size in MB of base64 string's corresponding file
   */
  const base64ToFileSize = (sizeMbBase64: number) => 
    (3 * Math.ceil((sizeMbBase64 * 1000 * 1000) / 4)) / (1000 * 1000);

  if (!isImageFormat(file)) {
    throw new Error("Uploaded file(s) must be jpeg, png, webp, bmp, or heic/heif format");
  }
  const jpegFile = await convertToJpeg(
    file,
    base64ToFileSize(maxSizeOfBase64),
    maxWidthOrHeight,
  );
  return await encodeToBase64(jpegFile);
}
