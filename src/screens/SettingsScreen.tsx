import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';
import { NotificationService } from '../services/notificationService';
import { ThemeType, FocusArea } from '../types';
import { getGradientForTheme, getTextColorForTheme, GRADIENTS } from '../theme/colors';
import { FONT_SIZES, SPACING } from '../theme/typography';

const THEME_OPTIONS: { name: string; value: ThemeType }[] = [
  { name: 'Elevenstoic Blue', value: 'elevenstoic-blue' },
  { name: 'Cream White', value: 'cream-white' },
  { name: 'Dark', value: 'dark' },
  { name: 'Gradient 1', value: 'gradient-1' },
  { name: 'Gradient 2', value: 'gradient-2' },
  { name: 'Gradient 3', value: 'gradient-3' },
  { name: 'Gradient 4', value: 'gradient-4' },
  { name: 'Gradient 5', value: 'gradient-5' },
  { name: 'Gradient 6', value: 'gradient-6' },
  { name: 'Gradient 7', value: 'gradient-7' },
  { name: 'Gradient 8', value: 'gradient-8' },
  { name: 'Gradient 9', value: 'gradient-9' },
  { name: 'Gradient 10', value: 'gradient-10' },
];

const FOCUS_AREAS: FocusArea[] = ['Peace', 'Discipline', 'Clarity', 'Purpose', 'Focus'];

export default function SettingsScreen() {
  const { user, updateReminderCount } = useUserStore();
  const { currentTheme, setTheme, autoChangeEnabled, toggleAutoChange } = useThemeStore();

  const [showThemes, setShowThemes] = useState(false);
  const [showFocusAreas, setShowFocusAreas] = useState(false);
  const [reminderCount, setReminderCountLocal] = useState(user?.reminderCount || 3);

  const gradientColors = getGradientForTheme(currentTheme);
  const textColor = getTextColorForTheme(currentTheme);

  const handleThemeChange = async (theme: ThemeType) => {
    await setTheme(theme);
    setShowThemes(false);
  };

  const handleReminderCountChange = async (count: number) => {
    setReminderCountLocal(count);
    await updateReminderCount(count);

    if (user) {
      await NotificationService.scheduleReminders(count, user.focusAreas);
      Alert.alert('Updated', `You'll receive ${count} reminders per day.`);
    }
  };

  const handleRequestNotificationPermissions = async () => {
    const granted = await NotificationService.requestPermissions();
    if (granted) {
      Alert.alert('Success', 'Notification permissions granted!');
    } else {
      Alert.alert('Permission Denied', 'Please enable notifications in your device settings.');
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Appearance</Text>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setShowThemes(!showThemes)}
          >
            <Text style={[styles.settingLabel, { color: textColor }]}>Theme</Text>
            <Text style={[styles.settingValue, { color: textColor }]}>
              {THEME_OPTIONS.find(t => t.value === currentTheme)?.name}
            </Text>
          </TouchableOpacity>

          {showThemes && (
            <View style={styles.themeGrid}>
              {THEME_OPTIONS.map(theme => (
                <TouchableOpacity
                  key={theme.value}
                  style={styles.themeOption}
                  onPress={() => handleThemeChange(theme.value)}
                >
                  <LinearGradient
                    colors={GRADIENTS[theme.value]}
                    style={[
                      styles.themePreview,
                      currentTheme === theme.value && styles.themePreviewSelected,
                    ]}
                  />
                  <Text style={[styles.themeName, { color: textColor }]}>
                    {theme.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: textColor }]}>
                Auto-change themes
              </Text>
              <Text style={[styles.settingDescription, { color: textColor }]}>
                Gradients change throughout the day
              </Text>
            </View>
            <Switch
              value={autoChangeEnabled}
              onValueChange={toggleAutoChange}
              trackColor={{ false: '#767577', true: '#26436B' }}
            />
          </View>
        </View>

        {/* Reminders Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Reminders</Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: textColor }]}>
              Daily reminders: {reminderCount}
            </Text>
          </View>

          <View style={styles.reminderButtons}>
            {[1, 3, 5, 7, 10].map(count => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.reminderButton,
                  reminderCount === count && styles.reminderButtonSelected,
                ]}
                onPress={() => handleReminderCountChange(count)}
              >
                <Text
                  style={[
                    styles.reminderButtonText,
                    reminderCount === count
                      ? styles.reminderButtonTextSelected
                      : { color: textColor },
                  ]}
                >
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={handleRequestNotificationPermissions}
          >
            <Text style={[styles.permissionButtonText, { color: textColor }]}>
              Enable Notifications
            </Text>
          </TouchableOpacity>
        </View>

        {/* Focus Areas Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Focus Areas</Text>
          <Text style={[styles.sectionDescription, { color: textColor }]}>
            Your personalized areas: {user?.focusAreas.join(', ')}
          </Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Account</Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: textColor }]}>
              Subscription Status
            </Text>
            <Text style={[styles.settingValue, { color: textColor }]}>
              {user?.subscriptionStatus.toUpperCase()}
            </Text>
          </View>

          {user?.subscriptionStatus === 'trial' && user.trialEndDate && (
            <Text style={[styles.trialInfo, { color: textColor }]}>
              Trial ends: {new Date(user.trialEndDate).toLocaleDateString()}
            </Text>
          )}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>About</Text>
          <Text style={[styles.aboutText, { color: textColor }]}>
            Elevenstoic v1.0.0
            {'\n\n'}
            Transform your phone from your biggest distraction into your strongest reminder.
            {'\n\n'}
            You only get one life.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  sectionDescription: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    lineHeight: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.6,
    marginTop: 4,
  },
  settingValue: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  themeOption: {
    alignItems: 'center',
    width: '30%',
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: SPACING.xs,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  themePreviewSelected: {
    borderColor: '#fff',
  },
  themeName: {
    fontSize: FONT_SIZES.xs,
    textAlign: 'center',
  },
  reminderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
  },
  reminderButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderButtonSelected: {
    backgroundColor: '#fff',
  },
  reminderButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  reminderButtonTextSelected: {
    color: '#26436B',
  },
  permissionButton: {
    padding: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    alignItems: 'center',
  },
  permissionButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  trialInfo: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    marginTop: SPACING.sm,
  },
  aboutText: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    lineHeight: 22,
  },
});
