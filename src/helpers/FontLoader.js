// FontLoader.js
import * as Font from 'expo-font'

export const FontLoader = async () => {
  await Font.loadAsync({
    'Cambria': require('../../assets/fonts/Cambria.ttf'),
    'CambriaBold': require('../../assets/fonts/Cambria-Bold.ttf'),
  });
};
