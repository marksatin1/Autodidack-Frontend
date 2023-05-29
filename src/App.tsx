import ImageReveal from "./components/ImageReveal";

import Waterfall_Lg from "./assets/Waterfall-Lg.jpg";
import { ImageProps } from "./Interfaces/ImageProps";
import { useContext } from "react";
import AnimationContext from "./context/AnimationContext";
import ElementTilt from "./components/ElementTilt";
import InfiniteSpin from "./components/InfiniteSpin";
import ImageSpiral from "./components/ImageSpiral";

const Waterfall: ImageProps = {
  url: Waterfall_Lg,
  width: `${window.innerWidth * 0.3}px`,
  height: `${window.innerHeight * 0.6}px`,
  altText: "A waterfall in the Adirondacks",
};

const App = () => {
  const { transparentCanvas } = useContext(AnimationContext);

  return (
    <>
      {/* <ImageReveal
        url={Waterfall.url}
        width={Waterfall.width}
        height={Waterfall.height}
        altText={Waterfall.altText}
      /> */}
      <ElementTilt
        url={Waterfall.url}
        width={Waterfall.width}
        height={Waterfall.height}
        altText={Waterfall.altText}
      />
      {/* <ImageSpiral /> */}
    </>
  );
};

export default App;
