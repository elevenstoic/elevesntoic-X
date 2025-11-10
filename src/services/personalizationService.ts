import { Quote, OnboardingResponse, FocusArea } from '../types';
import { QUOTES } from '../constants/quotes';

export class PersonalizationService {
  /**
   * Filter and rank quotes based on user's onboarding responses and preferences
   */
  static getPersonalizedQuotes(
    responses: OnboardingResponse[],
    focusAreas: FocusArea[],
    likedQuotes: string[]
  ): Quote[] {
    let quotes = [...QUOTES];

    // Filter by focus areas
    if (focusAreas.length > 0) {
      quotes = quotes.filter(quote => focusAreas.includes(quote.category));
    }

    // Score quotes based on user preferences
    const scoredQuotes = quotes.map(quote => ({
      quote,
      score: this.calculateQuoteScore(quote, responses, likedQuotes),
    }));

    // Sort by score (highest first)
    scoredQuotes.sort((a, b) => b.score - a.score);

    return scoredQuotes.map(sq => sq.quote);
  }

  /**
   * Calculate relevance score for a quote based on user data
   */
  private static calculateQuoteScore(
    quote: Quote,
    responses: OnboardingResponse[],
    likedQuotes: string[]
  ): number {
    let score = 0;

    // Boost score if user liked this quote before
    if (likedQuotes.includes(quote.id)) {
      score += 10;
    }

    // Analyze onboarding responses for keyword matching
    const userKeywords = this.extractKeywords(responses);

    quote.tags.forEach(tag => {
      if (userKeywords.includes(tag.toLowerCase())) {
        score += 5;
      }
    });

    // Add emotional weight from responses
    responses.forEach(response => {
      score += response.emotionalWeight * 0.5;
    });

    // Random factor to ensure variety
    score += Math.random() * 2;

    return score;
  }

  /**
   * Extract keywords from user's onboarding responses
   */
  private static extractKeywords(responses: OnboardingResponse[]): string[] {
    const keywords: string[] = [];

    responses.forEach(response => {
      if (typeof response.answer === 'string') {
        const words = response.answer.toLowerCase().split(/\s+/);
        keywords.push(...words);
      } else if (Array.isArray(response.answer)) {
        response.answer.forEach(ans => {
          const words = ans.toLowerCase().split(/\s+/);
          keywords.push(...words);
        });
      }
    });

    return keywords;
  }

  /**
   * Determine which focus areas to suggest based on onboarding
   */
  static suggestFocusAreas(responses: OnboardingResponse[]): FocusArea[] {
    const suggestions: FocusArea[] = [];
    const keywords = this.extractKeywords(responses);

    const focusAreaKeywords: Record<FocusArea, string[]> = {
      Peace: ['calm', 'peace', 'anxiety', 'stress', 'overwhelmed', 'quiet'],
      Discipline: ['discipline', 'consistent', 'habit', 'routine', 'procrastinate', 'lazy'],
      Clarity: ['clarity', 'confused', 'direction', 'clear', 'focus', 'lost'],
      Purpose: ['purpose', 'meaning', 'why', 'goal', 'direction', 'mission'],
      Focus: ['focus', 'distracted', 'concentrate', 'attention', 'scattered'],
    };

    Object.entries(focusAreaKeywords).forEach(([area, areaKeywords]) => {
      const matches = keywords.filter(k => areaKeywords.includes(k)).length;
      if (matches > 0) {
        suggestions.push(area as FocusArea);
      }
    });

    // If no matches, suggest based on emotional weight
    if (suggestions.length === 0) {
      const sortedResponses = [...responses].sort((a, b) =>
        b.emotionalWeight - a.emotionalWeight
      );

      // Default suggestions based on highest emotional responses
      if (sortedResponses[0]?.emotionalWeight > 7) {
        suggestions.push('Peace', 'Clarity');
      } else {
        suggestions.push('Discipline', 'Focus');
      }
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  /**
   * Get a personalized notification message
   */
  static getPersonalizedNotification(
    focusArea: FocusArea,
    responses: OnboardingResponse[]
  ): string {
    const messages: Record<FocusArea, string[]> = {
      Peace: [
        'Take a deep breath. This moment is yours.',
        'Peace starts within. You have everything you need.',
        'Let go of what you cannot control.',
      ],
      Discipline: [
        'The person you want to be is built through daily action.',
        'Discipline today, freedom tomorrow.',
        'You said you'd change. This is the moment.',
      ],
      Clarity: [
        'Clear mind, clear path.',
        'What matters most to you right now?',
        'Cut through the noise. Focus on what's real.',
      ],
      Purpose: [
        'Your life has meaning. Live like it.',
        'What legacy are you building today?',
        'You have one life. Make it count.',
      ],
      Focus: [
        'Stop scrolling. Start living.',
        'Your attention is your most valuable resource.',
        'This moment matters. Be here.',
      ],
    };

    const focusMessages = messages[focusArea];
    return focusMessages[Math.floor(Math.random() * focusMessages.length)];
  }
}
