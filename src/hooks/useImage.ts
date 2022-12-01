import { useState } from 'react';

export default function useImage() {
  const [image, setImage] = useState<ImageData | null>(null);

  const readImageFile = (file: Blob) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      setImage(imageData);
    };

    img.src = URL.createObjectURL(file);
  };

  return { image, readImageFile };
}
