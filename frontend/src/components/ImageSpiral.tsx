import { useRef, useState, useEffect, RefObject } from "react";
import { asyncPause } from "../helpers/GeneralHelpers";
import { samplePhotoArray } from "../helpers/SamplePhotoArray";
import { AnimatedImageProps } from "../Interfaces/ImageProps";

const transitionAnimation = "pulse 1s";
const transitionTime = 1000;
let distance = 30;
const distanceFactor = 1.3;
const imgSizeFactor = 1.1;

const initialImageValues = {
  url: "",
  width: "100px",
  height: "200px",
  altText: "",
  left: "0px",
  top: "0px",
};

const ImageSpiral = () => {
  const spiralRef = useRef<SVGGeometryElement | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageValues, setImageValues] = useState<AnimatedImageProps>(initialImageValues);
  const [imageAnimation, setImageAnimation] = useState<string>("");

  const photoArray = samplePhotoArray.map(photo => (
    <img
      src={photo.url}
      width={photo.width}
      height={photo.height}
      alt={photo.altText}
      style={{ left: `${photo.left}px`, top: `${photo.top}px` }}
    />
  ));

  // Function must be defined separately to use async/await feature for asyncPause()
  const animateImagesOnPath = async (
    arr: AnimatedImageProps[],
    svgRef: RefObject<SVGGeometryElement>
  ) => {
    for (let image of arr) {
      let coords = svgRef.current?.getPointAtLength(distance);

      if (coords !== undefined) {
        setImageValues({
          url: image.url,
          width: `${parseInt(imageValues.width) * imgSizeFactor}px`,
          height: `${parseInt(imageValues.height) * imgSizeFactor}px`,
          altText: "",
          left: `${Math.floor(coords.x)}px`,
          top: `${Math.floor(coords.y)}px`,
        });
        setImageAnimation(transitionAnimation);
        await asyncPause(transitionTime);
        setImageAnimation("");
        distance *= distanceFactor;
      } else {
        throw new Error("Coordinates along SVG path are undefined.");
      }
    }
  };

  useEffect(() => {
    animateImagesOnPath(samplePhotoArray, spiralRef);
  }, []);

  return (
    <div className="is-container">
      {/* <div></div>
      <svg xmlns="http://www.w3.org/2000/svg">
        <path
          ref={spiralRef}
          d="m 119.13105,98.57683 c 4.417,-2.385188 9.47221,1.029646 11.19757,5.17349 3.27835,7.87367 -2.65548,16.15461 -10.0789,18.69565 -12.46336,4.26621 -24.972339,-5.06305 -28.43741,-16.89051 -5.349367,-18.259214 8.3153,-36.061066 25.74518,-40.553685 25.3255,-6.527744 49.54002,12.466506 55.16089,36.761875 7.80126,33.71978 -17.56461,65.51621 -50.04649,72.3644 C 79.177471,183.29802 38.584734,150.47528 30.411068,108.43314 19.776975,53.735516 61.181451,3.090411 114.20613,-6.5064532 181.58029,-18.700411 243.57261,32.4473 254.69028,97.92189 268.54028,179.48785 206.45363,254.15855 127.01957,266.89473 29.707105,282.49747 -59.007406,208.24405 -73.460072,113.30124 -90.912818,-1.349755 -3.2344484,-105.50592 108.80394,-121.77342 242.42097,-141.17405 363.44746,-38.783787 381.62861,91.972697 403.07566,246.21709 284.65913,385.57196 133.52802,405.7661 -43.037388,429.35876 -202.20685,293.57544 -224.51388,120.38065 -247.68575,-59.528973 -124.68012,-228.25868 48.034025,-274.84057"
          transform="matrix(1.2683716,0,-0.34213538,-1.2460793,338.91109,518.47211)"
          stroke="black"
          fill="transparent"
        />
      </svg> */}

      {/* <img
        ref={imageRef}
        src={imageValues.url}
        width={imageValues.width}
        height={imageValues.height}
        style={{ left: imageValues.left, top: imageValues.top }}
        alt=""
      /> */}
    </div>
  );
};

export default ImageSpiral;
