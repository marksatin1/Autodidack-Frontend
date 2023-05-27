import { Dispatch, SetStateAction } from "react";

export interface AnimationContextProps {
  transparentCanvas: boolean;
  setTransparentCanvas: Dispatch<SetStateAction<boolean>>;
}
