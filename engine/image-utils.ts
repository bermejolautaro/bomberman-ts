export async function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    }
  })
}