import { Linking } from 'react-native';

export const sendEmail = async (to, subject, body) => {
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    throw new Error('Unable to open mail client');
  }
  await Linking.openURL(url);
};
