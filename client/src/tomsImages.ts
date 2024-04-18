
/**
 * @description Check if the file is an image format
 * @param file
 * @returns a boolean value that indicates if the file is an image format
 */
const isImageFormat = (file: File): boolean => {
  // TODO
}

/**
 * @description Check if the image is a jpeg format
 * @param file
 * @returns a boolean value that indicates if the image is a jpeg format
 */
const isJPEG = (file: File): boolean => {
  // TODO
}

/**
 * @description Convert the image to a jpeg format
 * @param file
 * @returns a promise that resolves to a new File object with the jpeg format
 */

const convertToJpeg = (file: File): Promise<File> => {
  // TODO
}

/**
 * @description Resize the jpeg to a smaller size under a specified limit
 * @param file
 * @param limit
 * @returns a promise that resolves to a new File object with the resized jpeg
 */
const resizeJPEG = (file: File, limit: number): Promise<File> => {
  // TODO
}

/**
 * @description Encode the file to base64 format
 * @param file
 * @returns a promise that resolves to a string of the file encoded in base64
 */
const encodeToBase64 = (file: File): Promise<string> => {
  // TODO
}

/**
 * @description takes a file and limit and converts said file to a jpeg format under the limit
 * @param file
 * @param limit
 * @returns a promise that resolves to a string of the file encoded in base64
 */
const uploadImageFilePipeline = async (file: File, limit: number): Promise<string> => {
  // TODO
}
