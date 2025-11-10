import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FONT_SIZES, SPACING } from '../theme/typography';

interface JustOneLifeWidgetProps {
  colors: string[];
  textColor: string;
}

export function JustOneLifeWidget({ colors, textColor }: JustOneLifeWidgetProps) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <Text style={[styles.mainText, { color: textColor }]}>JUST</Text>
      <Text style={[styles.mainText, { color: textColor }]}>ONE</Text>
      <Text style={[styles.mainText, { color: textColor }]}>LIFE</Text>
      <Text style={[styles.brandText, { color: textColor }]}>Elevenstoic</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: 16,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  brandText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginTop: SPACING.md,
    opacity: 0.7,
  },
});
