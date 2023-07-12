import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import getCurrentUser from "@/features/getCurrentUser";
import slugify from "slugify";

const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
});

async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  folderName: string
): Promise<string> {
  let resizedImageBuffer;

  if (folderName === "category") {
    resizedImageBuffer = await sharp(file)
      .resize(358, 400, { fit: "inside" })
      .toBuffer();
    const params = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: `ls/${folderName}/${fileName}`,
      Body: resizedImageBuffer,
      ContentType: "image/jpeg",
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  } else if (folderName === "product") {
    let resizeMainImage = await sharp(file)
      .resize(1600, 1800, { fit: "inside" })
      .toBuffer();
    const mainImage = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: `ls/${folderName}/${fileName}`,
      Body: resizeMainImage,
      ContentType: "image/jpeg",
    };
    const command = new PutObjectCommand(mainImage);
    await s3Client.send(command);
    resizedImageBuffer = await sharp(file)
      .resize(400, 400, { fit: "inside" })
      .toBuffer();
    const thumbnail = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: `ls/${folderName}/thumbnail/${fileName}`,
      Body: resizedImageBuffer,
      ContentType: "image/jpeg",
    };
    const thumbnailCommand = new PutObjectCommand(thumbnail);
    await s3Client.send(thumbnailCommand);
  }

  return fileName;
}

export async function POST(request: NextRequest, response: NextResponse) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({
      status: 401,
      message: "You are not authorized",
    });
  try {
    const folderName = request.nextUrl.searchParams.get("folder") as string;
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const filename = file.name;
    const baseName = filename.substring(0, filename.lastIndexOf("."));
    const fileExtension = mimeType.split("/")[1];
    const buffer = Buffer.from(await file.arrayBuffer());

    const slug = slugify(baseName, { lower: true });

    //Generate random number between 1 and 1000
    const randomNumber = Math.floor(Math.random() * 1000) + 1;

    const fileName = await uploadImageToS3(
      buffer,
      slug + randomNumber + "-lifesmile." + fileExtension,
      folderName
    );
    return NextResponse.json({ success: true, data: fileName });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
