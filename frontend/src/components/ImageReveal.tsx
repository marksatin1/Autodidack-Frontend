import React, { MouseEvent, useEffect, useRef, useState, useContext } from "react";
import { checkTransparency } from "../helpers/ImageReveal";
import { ImageProps } from "../Interfaces/ImageProps";
import AnimationContext from "../context/AnimationContext";

const ImageReveal: React.FC<ImageProps> = ({ url, width, height, altText }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [eraserCtx, setEraserCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [imageAnimation, setImageAnimation] = useState<string>("");
  const { transparentCanvas, setTransparentCanvas } = useContext(AnimationContext);

  useEffect(() => {
    const image = imageRef.current as HTMLImageElement;
    const canvas = canvasRef.current as HTMLCanvasElement;

    canvas.width = image.width;
    canvas.height = image.height;

    // willReadFrequently creates canvas powered by CPU rather than GPU ->
    // better performance when constantly reading values w/ checkTransparencyFunction
    const canvasCtx = canvas.getContext("2d", { willReadFrequently: true });
    if (canvasCtx == null) return;

    image.onload = () => {
      canvasCtx.fillStyle = "white";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      setEraserCtx(canvasCtx);
    };
  }, []);

  const revealImageHandler = (e: MouseEvent) => {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    const eraserSize = parseInt(width) * 0.25;

    eraserCtx?.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    if (checkTransparency(eraserCtx, parseInt(width), parseInt(height))) {
      setImageAnimation("transition");
      setTransparentCanvas(true);
    }
  };

  return (
    <>
      <div className="ir-stack">
        <img
          className={imageAnimation}
          ref={imageRef}
          src={url}
          width={width}
          height={height}
          alt={altText}
        />
        <canvas hidden={transparentCanvas} ref={canvasRef} onMouseMove={revealImageHandler}>
          A white rectangle
        </canvas>
      </div>
    </>
  );
};

export default ImageReveal;
