# Gradient Circle NFT Image Generator

This Node.js script generates circle images with gradient colors and saves the images and corresponding metadata to the local file system. The generated circles can be used as NFTs or any other purpose where unique circle images are desired. This script and images are fully generated with AI.

## Requirements

- Node.js
- npm

## Dependencies

- `canvas` library: This library is used for creating the canvas and drawing the circle with gradient colors.

To install the required dependency, run:

```sh
npm install canvas
```

## Usage

1. Configure the script by setting the desired values for `width`, `height`, `numberOfImages`, and `baseUri`.

- `width`: The width of the generated images.
- `height`: The height of the generated images.
- `numberOfImages`: The number of circle images to be generated.
- `baseUri`: The base URI for the images when uploaded to IPFS or any other storage.

2. Run the script:

```sh
node generate.js
```

3. After the script runs, you will find the generated images in the `images` folder and their corresponding metadata in the `json` folder.

## Output

The script will generate PNG images of circles with gradient colors and save them in the `images` folder, and their corresponding metadata in the `json` folder. The metadata JSON files include the description, image URI, name, number of colors, and color attributes for each circle.

For example:

- Image: `images/1.png`
- Metadata: `json/1.json`

Enjoy your unique gradient circle images!
