import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image, flipType } = await req.json();

    // Server-side validation
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    if (flipType !== 'horizontal' && flipType !== 'vertical') {
      return NextResponse.json({ error: 'Invalid flip type' }, { status: 400 });
    }

    // Convert the image data to a Buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Flip the image using sharp
    const flippedImage = await sharp(imageBuffer)
      .flip(flipType === 'horizontal')
      .flop(flipType === 'vertical')
      .toBuffer();

    // Convert the flipped image to a data URI
    const flippedImageDataUri = `data:image/jpeg;base64,${flippedImage.toString('base64')}`;

    // Send the flipped image data URI as a response
    return NextResponse.json({ flippedImage: flippedImageDataUri }, { status: 200 });
  } catch (error) {
    console.error('Error flipping image:', error);
    return NextResponse.json({ error: 'Failed to flip image' }, { status: 500 });
  }
}