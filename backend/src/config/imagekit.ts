import ImageKit from '@imagekit/nodejs';
import { ENV } from './env';
import type { Uploadable } from '@imagekit/nodejs/index.js';
import ApiErrorResponse from '../utils/ApiErrorResponse';

const client = new ImageKit({
  privateKey: ENV.IMAGE_KIT_PRIVATE_KEY,
});

async function uploadToCloud({
  file,
  fileName,
}: {
  file: string | Uploadable;
  fileName: string;
}) {
  let result;
  try {
    result = await client.files.upload({
      file,
      fileName,
      folder: 'zomato-reel',
    });
  } catch (error) {
    throw new ApiErrorResponse(500, 'failed to upload on imagekit', error);
  }
  return result;
}

export { uploadToCloud };
