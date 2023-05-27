import React, { MouseEvent, useRef, useState } from "react";
import { ImageProps } from "../Interfaces/ImageProps";

const tiltFactors = {
  perspective: 1000,
  rotation: 40,
  scale: 1.3,
  transitionTime: 5000,
  ease: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
};
const initTransition = "";
const initTransform = `perspective(${tiltFactors.perspective}px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;

const ElementTilt: React.FC<ImageProps> = ({ url, width, height, altText }) => {
  const [imageTransition, setImageTransition] = useState<string>(initTransition);
  const [imageTransform, setImageTransform] = useState<string>(initTransform);
  const [transitionTimer, setTransitionTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement>(null);

  const animateTiltTransition = () => {
    transitionTimer && clearTimeout(transitionTimer);

    setImageTransition(`transform ${tiltFactors.transitionTime}ms ${tiltFactors.ease}`);

    const timerId: NodeJS.Timeout = setTimeout(() => {
      setImageTransition(initTransition);
    }, tiltFactors.transitionTime);

    setTransitionTimer(timerId);
  };

  const handleTiltMouseEnter = () => {
    animateTiltTransition();
  };

  const handleTiltMouseMove = (e: MouseEvent) => {
    const image = imageRef.current as HTMLImageElement;

    const centerX = image.offsetLeft + image.offsetWidth / 2;
    const centerY = image.offsetTop + image.offsetHeight / 2;

    const mouseX = e.nativeEvent.clientX - centerX;
    const mouseY = e.nativeEvent.clientY - centerY;

    const rotateAroundX = (tiltFactors.rotation * mouseY) / (image.offsetHeight / 2);
    const rotateAroundY = (-1 * (tiltFactors.rotation * mouseX)) / (image.offsetWidth / 2);

    setImageTransform(`perspective(${tiltFactors.perspective}px) rotateX(${rotateAroundX}deg) rotateY(${rotateAroundY}deg) 
                      scale3d(${tiltFactors.scale}, ${tiltFactors.scale}, ${tiltFactors.scale})`);
  };

  const handleTiltMouseLeave = () => {
    setImageTransform(initTransform);
    animateTiltTransition();
  };

  return (
    <>
      <div className="element-tilt">
        <img
          ref={imageRef}
          style={{ transform: `${imageTransform}`, transition: `${imageTransition}` }}
          src={url}
          width={width}
          height={height}
          alt={altText}
          onMouseEnter={handleTiltMouseEnter}
          onMouseMove={handleTiltMouseMove}
          onMouseLeave={handleTiltMouseLeave}
        />
      </div>
    </>
  );
};

export default ElementTilt;
