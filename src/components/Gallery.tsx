import React from 'react';
import { Global } from 'declarations';
import { Carousel } from '@ant-design/react-native';
import { View, StyleSheet, Image } from 'react-native';
import { scaleSize } from '@/utils/scale';
import { primary_color } from '@/config/theme';

interface Props {
  images?: Global.Item['posImageDTOS'];
  urls?: string[];
}

export default function Gallery(props: Props) {
  const { images, urls } = props;

  let data: string[] = [];

  if (Array.isArray(images)) {
    data = images.map(item => item.posImageUrl);
  } else if (Array.isArray(urls)) {
    data = urls;
  }

  return data.length > 0 ? (
    <View style={style.gallery}>
      <Carousel dotStyle={style.dot} dotActiveStyle={style.activeDot} styles={carouselStyles}>
        {data.map((item, index) => (
          <View style={style.imageContainer} key={index}>
            <Image source={{ uri: item }} style={style.image} />
          </View>
        ))}
      </Carousel>
    </View>
  ) : null;
}

const carouselStyles = {
  spaceStyle: { marginBottom: 0 },
  paginationX: { bottom: scaleSize(20) }
};

const style = StyleSheet.create({
  gallery: {
    width: '100%',
    height: scaleSize(500),
    backgroundColor: '#fff'
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  dot: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: scaleSize(12),
    height: scaleSize(12)
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  activeDot: {
    backgroundColor: primary_color
  }
});
