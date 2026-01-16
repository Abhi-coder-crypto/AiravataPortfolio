import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const imageUrl = 'http://menu.airavatatechnologies.com/attached_assets/Mauli-Thumbnail_1764139302458.jpg'; // Assuming the domain based on previous logs
const filePath = path.resolve(__dirname, '../attached_assets/Mauli-Thumbnail_1764139302458.jpg');

async function download(url: string, dest: string) {
  const protocol = url.startsWith('https') ? https : http;
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

download(imageUrl, filePath)
  .then(() => {
    console.log('Image downloaded successfully to ' + filePath);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error downloading image:', err.message);
    process.exit(1);
  });
