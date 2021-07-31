import { Geolocation } from '@capacitor/geolocation';

export const getLocation = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position: ', coordinates);

  return coordinates;
};
