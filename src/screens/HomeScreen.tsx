import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated as RNAnimated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';
import { Quote } from '../types';
import { PersonalizationService } from '../services/personalizationService';
import { QUOTES } from '../constants/quotes';
import { getGradientForTheme, getTextColorForTheme } from '../theme/colors';
import { FONT_SIZES, SPACING } from '../theme/typography';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, toggleLikeQuote, toggleSaveQuote } = useUserStore();
  const { currentTheme } = useThemeStore();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (user) {
      const personalizedQuotes = PersonalizationService.getPersonalizedQuotes(
        user.onboardingResponses,
        user.focusAreas,
        user.likedQuotes
      );
      setQuotes(personalizedQuotes.length > 0 ? personalizedQuotes : QUOTES);
    }
  }, [user]);

  const gradientColors = getGradientForTheme(currentTheme);
  const textColor = getTextColorForTheme(currentTheme);

  const handleLike = (quoteId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleLikeQuote(quoteId);
  };

  const handleSave = (quoteId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleSaveQuote(quoteId);
  };

  const renderQuote = ({ item, index }: { item: Quote; index: number }) => {
    const isLiked = user?.likedQuotes.includes(item.id);
    const isSaved = user?.savedQuotes.includes(item.id);

    return (
      <View style={styles.quoteCard}>
        <View style={styles.quoteContent}>
          <Text style={[styles.quoteText, { color: textColor }]}>
            "{item.text}"
          </Text>
          {item.author && (
            <Text style={[styles.authorText, { color: textColor }]}>
              — {item.author}
            </Text>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <Text style={[styles.actionIcon, { color: textColor }]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSave(item.id)}
          >
            <Text style={[styles.actionIcon, { color: textColor }]}>
              {isSaved ? '🔖' : '📑'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Elevenstoic</Text>
        <Text style={[styles.headerSubtitle, { color: textColor }]}>
          You only get one life
        </Text>
      </View>

      <FlatList
        data={quotes}
        renderItem={renderQuote}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 200}
        decelerationRate="fast"
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.y / (height - 200)
          );
          setCurrentIndex(index);
        }}
      />

      <View style={styles.indicator}>
        <Text style={[styles.indicatorText, { color: textColor }]}>
          {currentIndex + 1} / {quotes.length}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
  },
  quoteCard: {
    height: height - 200,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  quoteContent: {
    alignItems: 'center',
  },
  quoteText: {
    fontSize: FONT_SIZES.quote,
    textAlign: 'center',
    lineHeight: 42,
    fontWeight: '500',
    marginBottom: SPACING.xl,
  },
  authorText: {
    fontSize: FONT_SIZES.base,
    opacity: 0.7,
    marginBottom: SPACING.lg,
    fontStyle: 'italic',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: '#fff',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    marginTop: SPACING['2xl'],
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
  },
  indicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  indicatorText: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.5,
  },
});
