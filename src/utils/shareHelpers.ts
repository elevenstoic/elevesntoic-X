import { Share, Platform } from 'react-native';
import { Quote } from '../types';

export async function shareQuote(quote: Quote): Promise<void> {
  try {
    const message = `"${quote.text}"\n\n— ${quote.author || 'Unknown'}\n\nShared from Elevenstoic`;

    await Share.share(
      {
        message,
        title: 'Elevenstoic Quote',
      },
      {
        dialogTitle: 'Share this quote',
        subject: 'Elevenstoic Quote',
      }
    );
  } catch (error) {
    console.error('Error sharing quote:', error);
  }
}

export async function shareApp(): Promise<void> {
  try {
    const message =
      Platform.OS === 'ios'
        ? 'Check out Elevenstoic - Transform your phone into your strongest reminder.\n\nhttps://apps.apple.com/app/elevenstoic'
        : 'Check out Elevenstoic - Transform your phone into your strongest reminder.\n\nhttps://play.google.com/store/apps/details?id=com.elevenstoic.app';

    await Share.share({
      message,
      title: 'Elevenstoic App',
    });
  } catch (error) {
    console.error('Error sharing app:', error);
  }
}

export async function shareWallpaper(wallpaperUrl: string): Promise<void> {
  try {
    await Share.share({
      message: 'Check out this beautiful wallpaper from Elevenstoic',
      url: wallpaperUrl, // iOS only
    });
  } catch (error) {
    console.error('Error sharing wallpaper:', error);
  }
}
