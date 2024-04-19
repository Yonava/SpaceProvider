import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

type sizeMB = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * @description Check if the file is an accepted image format.
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
 * @description Converts inputted hei
 * @param file
 * @returns
 */
async function convertHeicToJPEG(file: File): Promise<File> {
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
 * @description Check if the file is HEIC/HEIF format.
 * @param file
 * @returns a boolean value that indicates if the file is HEIC/HEIF format
 */
function isHEIC(file: File): boolean {
  return file.type === "image/heic" || file.type === "image/heif";
}

/**
 * @description Converts the image to a jpeg format, compressing it to be within a
 * certain file size.
 * @param file
 * @param maxSizeMB
 * @param maxWidthOrHeight
 * @returns a promise that resolves to a new File object with the jpeg format
 */
async function convertToJPEG(
  file: File,
  maxSizeMB: number,
  maxWidthOrHeight: number,
): Promise<File> {
  if (isHEIC(file)) {
    file = await convertHeicToJPEG(file);
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
 * @description Takes a file and limit (in MB) and converts said file to a jpeg format under the
 * limit.
 * @param file
 * @param maxSizeMB
 * @param maxWidthOrHeight
 * @returns a promise that resolves to a string of the file encoded in base64
 */
export async function uploadImageFilePipeline(
  file: File,
  maxSizeMB: sizeMB,
  maxWidthOrHeight: number,
): Promise<string> {
  try {
    // maps the mbLimit values to what should be used for base64
    // ceil(num_bytes * 3) * 4
    const maxSizeBase64Map = [
      0,
      0.7499980926513672, 
      1.4999980926513672, 
      2.249998092651367,
      2.999998092651367, 
      3.749998092651367, 
      4.499998092651367,
      5.249998092651367, 
      5.999998092651367, 
      6.749998092651367,
      7.499998092651367,
    ];
    if (!isImageFormat(file)) {
      throw new Error("File must be a jpeg, png, webp, bmp, or heic/heif");
    }
    const jpegFile = await convertToJPEG(
      file,
      maxSizeBase64Map[maxSizeMB],
      maxWidthOrHeight,
    );
    return await encodeToBase64(jpegFile);
  } catch (e) {
    console.error("JPEG Conversion/compression failed:", e);
    throw e;
  }
}
