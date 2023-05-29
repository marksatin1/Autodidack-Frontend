export interface ImageProps {
  url: string;
  width: string;
  height: string;
  altText: string;
}

export interface AnimatedImageProps extends ImageProps {
  left: string;
  top: string;
}
