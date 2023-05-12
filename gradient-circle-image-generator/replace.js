const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, 'json');
const newBaseUri = 'IPFS_HASH';

fs.readdir(jsonDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(jsonDir, file);

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        console.error(`Error parsing JSON in file ${file}:`, e);
        return;
      }

      jsonData.image = jsonData.image.replace('{BASE_URI}', newBaseUri);

      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(`Error writing updated JSON to file ${file}:`, err);
        } else {
          console.log(`Updated JSON saved to ${file}`);
        }
      });
    });
  });
});
