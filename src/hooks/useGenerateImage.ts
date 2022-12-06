import { Dispatch, SetStateAction } from 'react';

const IMAGE_WIDTH = 1000;
const IMAGE_HEIGHT = 500;
const BORDER_WIDTH = 10;
const PADDING = 5;
const SECTIONS = 20;

export default function useGenerateImage(
  setImage: Dispatch<SetStateAction<ImageData | null>>
) {
  const generateImage = (value: number) => {
    var canvas = document.createElement('canvas');
    var imageData = canvas
      .getContext('2d')!
      .createImageData(IMAGE_WIDTH, IMAGE_HEIGHT);

    // fill with white
    for (let i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = 255;
    }

    // draw border (top bottom)
    for (let i = 0; i < BORDER_WIDTH; i++) {
      for (let j = 0; j < IMAGE_WIDTH; j++) {
        const indexTop = (i * IMAGE_WIDTH + j) * 4;
        imageData.data[indexTop + 0] = 0;
        imageData.data[indexTop + 1] = 0;
        imageData.data[indexTop + 2] = 0;

        const indexBottom = ((IMAGE_HEIGHT - i - 1) * IMAGE_WIDTH + j) * 4;
        imageData.data[indexBottom + 0] = 0;
        imageData.data[indexBottom + 1] = 0;
        imageData.data[indexBottom + 2] = 0;
      }
    }

    // draw border (left right)
    for (let i = 0; i < BORDER_WIDTH; i++) {
      for (let j = 0; j < IMAGE_HEIGHT; j++) {
        const indexTop = (j * IMAGE_WIDTH + i) * 4;
        imageData.data[indexTop + 0] = 0;
        imageData.data[indexTop + 1] = 0;
        imageData.data[indexTop + 2] = 0;

        const indexBottom = (j * IMAGE_WIDTH + (IMAGE_WIDTH - i - 1)) * 4;
        imageData.data[indexBottom + 0] = 0;
        imageData.data[indexBottom + 1] = 0;
        imageData.data[indexBottom + 2] = 0;
      }
    }

    // draw color sections
    const sectionHeight = IMAGE_HEIGHT - 2 * BORDER_WIDTH - 2 * PADDING;
    const sectionWidth = Math.round(
      (IMAGE_WIDTH - 2 * BORDER_WIDTH - (SECTIONS + 1) * PADDING) / SECTIONS
    );
    const sectionStartY = BORDER_WIDTH + PADDING;
    for (let sectionIndex = 0; sectionIndex < SECTIONS; sectionIndex++) {
      const sectionHue = (1 / (SECTIONS - 1)) * sectionIndex;
      const sectionStartX =
        BORDER_WIDTH +
        (sectionIndex + 1) * PADDING +
        sectionIndex * sectionWidth;
      console.log(
        `section ${sectionIndex}, height ${sectionHeight}, width ${sectionWidth}, startY ${sectionStartY}, startX ${sectionStartX}, hue ${sectionHue}`
      );
      for (let y = 0; y < sectionHeight; y++) {
        const rowColor = hsvToRgb(
          sectionHue,
          1 - (1 / (sectionHeight - 1)) * y,
          value
        );
        if (y == 0)
          console.log(
            sectionHue,
            1 - (1 / (sectionHeight - 1)) * y,
            value,
            rowColor
          );
        for (let x = 0; x < sectionWidth; x++) {
          const index =
            ((sectionStartY + y) * IMAGE_WIDTH + (sectionStartX + x)) * 4;
          imageData.data[index + 0] = rowColor[0];
          imageData.data[index + 1] = rowColor[1];
          imageData.data[index + 2] = rowColor[2];
        }
      }
    }

    console.log(imageData);

    setImage(imageData);
  };

  return { generateImage };
}

function hsvToRgb(h: number, s: number, v: number) {
  let r = 0,
    g = 0,
    b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return [r * 255, g * 255, b * 255];
}
