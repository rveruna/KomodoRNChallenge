import {Linking, Platform} from 'react-native';

export const openLocation = (location: string) => {
  const encodedLocation = encodeURI(location);

  const url = Platform.select({
    ios: `maps:0,0?q=${encodedLocation}`,
    android: `geo:0,0?q=${encodedLocation}`,
  });

  if (!url) {
    console.error('Unsupported platform');
    return;
  }

  if (url) {
    Linking.openURL(url).catch((err: Error) =>
      console.error('Failed to open maps', err),
    );
  }
};
