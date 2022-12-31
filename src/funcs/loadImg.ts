export default function loadImage(url: string) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  }).catch((err) => console.log('!!!!!!!!!!!!', err));
}
