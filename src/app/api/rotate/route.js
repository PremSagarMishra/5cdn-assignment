import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image, rotateDegree } = await req.json();

    // Server-side validation
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    if (typeof rotateDegree !== 'number' || rotateDegree < 0 || rotateDegree >= 360) {
      return NextResponse.json({ error: 'Invalid rotation degree' }, { status: 400 });
    }

    // Convert the image data to a Buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Rotate the image using sharp
    const rotatedImage = await sharp(imageBuffer)
      .rotate(rotateDegree)
      .toBuffer();

    // Convert the rotated image to a data URI
    const rotatedImageDataUri = `data:image/jpeg;base64,${rotatedImage.toString('base64')}`;

    // Send the rotated image data URI as a response
    return NextResponse.json({ rotatedImage: rotatedImageDataUri }, { status: 200 });
  } catch (error) {
    console.error('Error rotating image:', error);
    return NextResponse.json({ error: 'Failed to rotate image' }, { status: 500 });
  }
}