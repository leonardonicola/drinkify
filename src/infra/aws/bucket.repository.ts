import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file: Express.Multer.File) {
    const { originalname } = file;
    const bucketS3 = process.env.S3_BUCKET;
    return await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  private async uploadS3(file, bucket, name): Promise<string> {
    const s3 = new S3({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const uploadResult = await s3
      .upload({
        Bucket: bucket,
        Body: file,
        Key: name,
      })
      .promise();
    return uploadResult.Location;
  }
}
