import sharp from 'sharp';
import { NextResponse } from 'next/server';
export async function POST(req, res) {
	try {
		var { image, height, width, quality, format } = await req.json();
	
		// Check if the image property is defined and in the expected format
		if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
		  return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
		}
	
		// Convert the image data to a Buffer
		const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
	
		height=parseInt(height)
		width=parseInt(width)
		// Compress the image using sharp
		const compressedImage = await sharp(imageBuffer)
		  .resize({ height, width })
		  .toFormat(format, { quality })
		  .toBuffer();
	
		// Send the compressed image data as a response
		return NextResponse.json({ compressedImage: compressedImage.toString('base64') }, { status: 200 });
	  } catch (error) {
		console.error('Error compressing image:', error);
		return NextResponse.json({ error: 'Failed to compress image' }, { status: 500 });
	  }
	}
