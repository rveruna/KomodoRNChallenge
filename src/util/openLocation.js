import {Linking, Platform} from 'react-native';

export const openLocation = location => {
  const encodedLocation = encodeURI(location);
  const url = Platform.select({
    ios: `maps:0,0?q=${encodedLocation}`,
    android: `geo:0,0?q=${encodedLocation}`,
  });

  Linking.openURL(url).catch(err => console.error('Failed to open maps', err));
};
