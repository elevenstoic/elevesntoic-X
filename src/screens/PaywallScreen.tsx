import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useUserStore } from '../store/userStore';
import { FONT_SIZES, SPACING } from '../theme/typography';

type PaywallScreenProp = StackNavigationProp<RootStackParamList, 'Paywall'>;

const FEATURES = [
  'Personalized daily quotes tailored to your journey',
  'Cinematic wallpapers that unlock daily',
  'Smart reminders that understand your rhythm',
  'Beautiful themes and gradients',
  'Home screen widgets',
  'No ads, ever',
  'Unlimited access to all features',
];

export default function PaywallScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const navigation = useNavigation<PaywallScreenProp>();
  const { startTrial } = useUserStore();

  const handleStartTrial = async () => {
    try {
      await startTrial();
      // In production, integrate with RevenueCat or similar
      Alert.alert(
        'Trial Started',
        'Your 3-day free trial has begun. Enjoy full access to Elevenstoic.',
        [{ text: 'Continue', onPress: () => navigation.navigate('Main' as any) }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to start trial. Please try again.');
    }
  };

  const handleRestore = () => {
    Alert.alert('Restore Purchases', 'This feature will be connected to your payment provider.');
  };

  return (
    <LinearGradient colors={['#26436B', '#1a2942', '#0a0a0a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Transform your phone</Text>
          <Text style={styles.subtitle}>
            From your biggest distraction{'\n'}to your strongest reminder
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'yearly' && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>BEST VALUE</Text>
            </View>
            <Text style={styles.planTitle}>Yearly</Text>
            <Text style={styles.planPrice}>€23.99</Text>
            <Text style={styles.planSubtext}>€2.00/month · Save 50%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === 'monthly' && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>€3.99</Text>
            <Text style={styles.planSubtext}>per month</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.trialButton} onPress={handleStartTrial}>
          <Text style={styles.trialButtonText}>Start 3-Day Free Trial</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Free for 3 days, then {selectedPlan === 'yearly' ? '€23.99/year' : '€3.99/month'}.
          {'\n'}Cancel anytime in your device settings.
        </Text>

        <TouchableOpacity onPress={handleRestore}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['3xl'],
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 28,
  },
  featuresContainer: {
    marginBottom: SPACING.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  checkmarkText: {
    color: '#26436B',
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  featureText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  plansContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  planCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  planBadge: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  planBadgeText: {
    backgroundColor: '#fff',
    color: '#26436B',
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  planPrice: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  planSubtext: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  trialButton: {
    backgroundColor: '#fff',
    paddingVertical: SPACING.lg,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  trialButtonText: {
    color: '#26436B',
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  restoreText: {
    fontSize: FONT_SIZES.base,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  legalContainer: {
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  legalText: {
    fontSize: FONT_SIZES.xs,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    lineHeight: 18,
  },
});
