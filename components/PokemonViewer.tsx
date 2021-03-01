import { useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import styles from './PokemonViewer.module.css';

interface PokemonViewerProps {
  pokemonImgUrl: string;
  hidden: boolean;
}

export const PokemonViewer: React.FC<PokemonViewerProps> = ({
  pokemonImgUrl,
  hidden,
}) => {
  const canvasSize = useBreakpointValue({ base: '85vw', md: '25vw' });
  console.log(canvasSize);

  const draw = (canvas: HTMLCanvasElement, hidden: boolean) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;

    const img = new Image();
    img.onload = function () {
      let imageWidth = 0;
      let imageHeight = 0;
      if (canvas.width > canvas.height) {
        imageHeight = canvas.height;
        imageWidth = canvas.width * (canvas.height / canvas.width);
      } else {
        imageWidth = canvas.width;
        imageHeight = canvas.height * (canvas.width / canvas.height);
      }
      ctx.drawImage(
        img,
        canvas.width / 2 - imageWidth / 2,
        canvas.height / 2 - imageHeight / 2,
        imageWidth,
        imageHeight
      );

      if (!hidden) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        data[i] = 0; // red
        data[i + 1] = 0; // green
        data[i + 2] = 0; // blue
      }
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = pokemonImgUrl;
    img.crossOrigin = 'Anonymous';
  };

  useEffect(() => {
    if (canvasRef.current) draw(canvasRef.current, hidden);
  }, [pokemonImgUrl, hidden]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <canvas
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid black',
        borderRadius: '24px',
        boxSizing: 'border-box',
        margin: 0,
        background: 'white',
      }}
      ref={canvasRef}
    />
  );
};
