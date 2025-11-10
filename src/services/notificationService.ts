import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { FocusArea } from '../types';
import { getRandomQuoteByCategory } from '../constants/quotes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#26436B',
      });
    }

    return true;
  }

  static async scheduleReminders(
    count: number,
    focusAreas: FocusArea[]
  ): Promise<void> {
    // Cancel all existing scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const notificationMessages = [
      'Stop scrolling. Remember who you said you'd be.',
      'Your future self is watching right now.',
      'You said you wanted more. This is the moment.',
      'Life is too short to waste on distractions.',
      'This is your reminder to be intentional.',
      'You have one life. Make it count.',
      'Time to align with who you want to become.',
      'The person you want to be starts with this moment.',
    ];

    // Schedule notifications throughout the day
    const intervals = this.calculateIntervals(count);

    for (let i = 0; i < count; i++) {
      const focusArea = focusAreas[i % focusAreas.length];
      const quote = getRandomQuoteByCategory(focusArea);
      const message = i < notificationMessages.length
        ? notificationMessages[i]
        : quote.text;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Elevenstoic',
          body: message,
          data: { type: 'reminder', focusArea },
        },
        trigger: {
          hour: intervals[i].hour,
          minute: intervals[i].minute,
          repeats: true,
        },
      });
    }
  }

  private static calculateIntervals(count: number): { hour: number; minute: number }[] {
    // Distribute reminders between 8 AM and 10 PM
    const startHour = 8;
    const endHour = 22;
    const totalHours = endHour - startHour;
    const interval = totalHours / count;

    const intervals: { hour: number; minute: number }[] = [];

    for (let i = 0; i < count; i++) {
      const hourOffset = interval * i;
      const hour = Math.floor(startHour + hourOffset);
      const minute = Math.floor((hourOffset % 1) * 60);
      intervals.push({ hour, minute });
    }

    return intervals;
  }

  static async sendImmediateNotification(title: string, body: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  }

  static async notifyNewWallpaper(): Promise<void> {
    await this.sendImmediateNotification(
      'New Wallpaper Available',
      'A new cinematic wallpaper is ready for you.'
    );
  }
}
