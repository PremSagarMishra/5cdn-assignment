import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image, newWidth, newHeight } = await req.json();

    // Server-side validation
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

   
    // Convert the image data to a Buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Resize the image using sharp
    const resizedImage = await sharp(imageBuffer)
      .resize(parseInt(newWidth), parseInt(newHeight))
      .toBuffer();

    // Convert the resized image to a data URI
    const resizedImageDataUri = `data:image/jpeg;base64,${resizedImage.toString('base64')}`;

    // Send the resized image data URI as a response
    return NextResponse.json({ resizedImage: resizedImageDataUri }, { status: 200 });
  } catch (error) {
    console.error('Error resizing image:', error);
    return NextResponse.json({ error: 'Failed to resize image' }, { status: 500 });
  }
}