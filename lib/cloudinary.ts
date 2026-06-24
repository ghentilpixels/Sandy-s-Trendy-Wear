export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "scale" | "limit" | "thumb";
    quality?: "auto" | "auto:best" | "auto:good" | "auto:eco";
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
  }
): string {
  const { width, height, crop = "fill", quality = "auto", format = "auto" } = options || {};
  
  const transformations = [`f_${format}`, `q_${quality}`];
  
  if (width || height) {
    const cropPart = crop === "fill" ? "c_fill" : `c_${crop}`;
    const widthPart = width ? `w_${width}` : "";
    const heightPart = height ? `h_${height}` : "";
    transformations.unshift(`${cropPart},${widthPart},${heightPart}`);
  } else {
    transformations.unshift(`c_${crop}`);
  }
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dl3u8nsgq";
  const transformationString = transformations.filter(Boolean).join(",");
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}