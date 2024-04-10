import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image, contrast, grayscale, opacity } = await req.json();

    // Server-side validation
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    // Convert the image data to a Buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Create a new instance of the sharp processor
    const sharpInstance = sharp(imageBuffer);

    // Apply the requested transformations
    if (contrast !== undefined) {
      sharpInstance.modulate({ brightness: contrast });
    }

    if (grayscale !== undefined) {
      sharpInstance.grayscale(grayscale);
    }

    if (opacity !== undefined) {
      sharpInstance.tint({ r: 255, g: 255, b: 255, alpha: opacity });
    }

    // Convert the processed image to a Buffer
    const processedImageBuffer = await sharpInstance.toBuffer();

    // Convert the processed image to a data URI
    const processedImageDataUri = `data:image/jpeg;base64,${processedImageBuffer.toString('base64')}`;

    // Send the processed image data URI as a response
    return NextResponse.json({ processedImage: processedImageDataUri }, { status: 200 });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}