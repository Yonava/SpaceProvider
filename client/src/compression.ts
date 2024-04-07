

// TOTALLY BROKEN


export function compressImage(base64ImageData: string, quality: number = 0.8) {
  try {
    // Create an Image element and set its source to the base64 image data
    const image = new Image();
    image.src = base64ImageData;

    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2d context from canvas');
    }

    // Set the canvas dimensions to match the image dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Get the compressed image as a base64-encoded string with specified quality
    const compressedBase64ImageData = canvas.toDataURL('image/png', quality);

    // Return the compressed base64 image data URL
    return compressedBase64ImageData;

  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}
