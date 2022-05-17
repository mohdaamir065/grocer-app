import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const normalize = (
  size: number,
  based: 'height' | 'width' = 'width',
): number => {
  let wscale;
  let hscale;
  if (width > height) {
    wscale = height / 320;
    hscale = width / 667;
  } else {
    wscale = width / 320;
    hscale = height / 667;
  }
  const newSize = based === 'height' ? size * hscale : size * wscale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export {normalize};
