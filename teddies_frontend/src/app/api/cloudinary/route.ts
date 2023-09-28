import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
const cloudinaryApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

export async function POST(req: NextRequest, res: NextApiResponse) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const { username, folderName } = await req.json();

  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: username,
        folder: folderName,
      },
      cloudinaryApiSecret || '',
    );

    return NextResponse.json({ signature, timestamp });
  } catch {
    return NextResponse.json({ error: 'error happened' });
  }
}

export async function PUT(req: NextRequest, res: NextApiResponse) {
  const { username, folderName } = await req.json();

  try {
    const result = await cloudinary.uploader.destroy(
      `${folderName}/${username}`,
    );

    return NextResponse.json({ status: result.result });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
