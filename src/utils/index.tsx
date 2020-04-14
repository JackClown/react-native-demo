export function delay<T>(duration: number, val?: T) {
  return new Promise<T>(res => {
    setTimeout(() => {
      res(val);
    }, duration);
  });
}

export function timeout<T>(operate: Promise<T>, timeout: number = 0, errorMessage: string = ''): Promise<T> {
  if (timeout) {
    return Promise.race([operate, delay(timeout).then(() => Promise.reject(new Error(errorMessage)))]);
  } else {
    return operate;
  }
}

export function hasIllegalChars(str: string) {
  return /[^0-9_a-zA-Z]/.test(str);
}
