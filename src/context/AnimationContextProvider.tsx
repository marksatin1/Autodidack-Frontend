import { ReactNode, useState } from "react";
import AnimationContext from "./AnimationContext";

const AnimationContextProvider = ({ children }: { children: ReactNode }) => {
  const [transparentCanvas, setTransparentCanvas] = useState<boolean>(false);

  const context = {
    transparentCanvas,
    setTransparentCanvas,
  };

  return <AnimationContext.Provider value={context}>{children}</AnimationContext.Provider>;
};

export default AnimationContextProvider;
