export default function checkCopyURL(saveURL: string): boolean {
  const currentURL = window.location.href;
  const button = document.querySelector('.copy-link');
  if (saveURL === currentURL) {
    button?.classList.add('active');
  } else {
    button?.classList.remove('active');
  }
  return saveURL === currentURL;
}
