export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return;
  }
  setTimeout(() => {
    let id = document.getElementById(id);
    if (id) {
      id.remove();
    }
  }, timeout);
}
