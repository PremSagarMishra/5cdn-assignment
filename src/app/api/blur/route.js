import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image, blur } = await req.json();

    // Server-side validation
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    if (typeof blur !== 'number') {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
    }

    // Convert the image data to a Buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Get the width and height of the original image using sharp
    const { width, height } = await sharp(imageBuffer).metadata();

    // Blur the image using sharp
    const blurredImage = await sharp(imageBuffer)
      .resize({ width, height })
      .blur(parseInt(blur))
      .toBuffer();

    // Convert the blurred image to a data URI
    const blurredImageDataUri = `data:image/jpeg;base64,${blurredImage.toString('base64')}`;

    // Send the blurred image data URI as a response
    return NextResponse.json({ blurredImage: blurredImageDataUri }, { status: 200 });
  } catch (error) {
    console.error('Error blurring image:', error);
    return NextResponse.json({ error: 'Failed to blur image' }, { status: 500 });
  }
}