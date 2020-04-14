import { Dimensions, PixelRatio } from 'react-native';

const defaultPixel = 2;
const wDp = Math.round(750 / defaultPixel);
const hDp = Math.round(1334 / defaultPixel);

let deviceWidthDp = Dimensions.get('window').width;
let deviceHeightDp = Dimensions.get('window').height;

if (deviceWidthDp > deviceHeightDp) {
  deviceWidthDp = deviceWidthDp ^ deviceHeightDp;
  deviceHeightDp = deviceWidthDp ^ deviceHeightDp;
  deviceWidthDp = deviceWidthDp ^ deviceHeightDp;
}

const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();

let scale: number;

if (deviceWidthDp > wDp) {
  scale = Math.min(deviceHeightDp / hDp, deviceWidthDp / wDp);
} else {
  scale = 1;
}

// const scale = Math.min(deviceHeightDp / hDp, deviceWidthDp / wDp);

export const scaleFont = (size: number) => {
  return Math.round((size * scale) / fontScale / defaultPixel);
};

export const scaleSize = (size: number) => {
  return Math.round((size * scale) / defaultPixel);
};

export const scaleDp = (size: number) => {
  return Math.round((size * pixelRatio) / defaultPixel);
};
