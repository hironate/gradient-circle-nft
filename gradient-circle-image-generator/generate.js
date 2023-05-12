const { createCanvas } = require('canvas');
const fs = require('fs');

function randomColor() {
  const colorCode = Math.floor(Math.random() * 16777215).toString(16);
  return `#${colorCode.padStart(6, '0')}`;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGradientCircle(index, width, height, baseUri) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create a radial gradient with a random number of colors between 3 and 7
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius,
  );
  const numberOfColors = randomNumber(1, 7);
  const colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    const color = randomColor();
    colors.push(color);
    const colorPosition = i / (numberOfColors - 1);
    gradient.addColorStop(colorPosition, color);
  }

  // Draw a circle filled with the gradient
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Save the image to a file
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
  }
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`images/${index}.png`, buffer);
  console.log(`Image saved as images/${index}.png`);

  // Create metadata
  const metadata = {
    description: `This is NFT Circle #${index}.`,
    image: `ipfs://${baseUri}/${index}.png`,
    name: `Nft Circle #${index}`,
    attributes: [
      {
        trait_type: 'Number Of Colors',
        value: numberOfColors.toString(),
      },
    ],
  };

  // Add color attributes
  colors.forEach((color, i) => {
    metadata.attributes.push({
      trait_type: `Color ${i + 1}`,
      value: color,
    });
  });

  // Save metadata to a file
  if (!fs.existsSync('json')) {
    fs.mkdirSync('json');
  }
  fs.writeFileSync(`json/${index}.json`, JSON.stringify(metadata, null, 2));
  console.log(`Metadata saved as json/${index}.json`);
}

const width = 512;
const height = 512;
const numberOfImages = 100000;
const baseUri = '{BASE_URI}';

for (let i = 1; i <= numberOfImages; i++) {
  createGradientCircle(i, width, height, baseUri);
}
