import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Quote } from '../types';
import { FONT_SIZES, SPACING } from '../theme/typography';

interface QuoteWidgetProps {
  quote: Quote;
  colors: string[];
  textColor: string;
}

export function QuoteWidget({ quote, colors, textColor }: QuoteWidgetProps) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <Text style={[styles.logoText, { color: textColor }]}>Elevenstoic</Text>
      <Text style={[styles.quoteText, { color: textColor }]} numberOfLines={3}>
        "{quote.text}"
      </Text>
      {quote.author && (
        <Text style={[styles.authorText, { color: textColor }]}>— {quote.author}</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: 16,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  logoText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  quoteText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 24,
    marginVertical: SPACING.md,
  },
  authorText: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
