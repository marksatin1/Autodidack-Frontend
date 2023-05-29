import { createContext } from "react";
import { AnimationContextProps } from "../Interfaces/AnimationContextProps";

const initContext = {
  transparentCanvas: false,
  setTransparentCanvas: () => {},
};

const AnimationContext = createContext<AnimationContextProps>(initContext);

export default AnimationContext;
