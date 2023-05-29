// For best performance, use a CPU-rendered canvas context
// This can be done by setting willReadFrequently: true when creating ctx

export const checkTransparency = (
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number
): boolean => {
  if (ctx != null) {
    const { data } = ctx.getImageData(0, 0, width, height);

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        return false;
      }
    }

    return true;
  }

  return false;
};
