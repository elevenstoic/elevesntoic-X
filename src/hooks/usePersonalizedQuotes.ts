import { useState, useEffect } from 'react';
import { Quote } from '../types';
import { PersonalizationService } from '../services/personalizationService';
import { useUserStore } from '../store/userStore';
import { QUOTES } from '../constants/quotes';

export function usePersonalizedQuotes(): Quote[] {
  const { user } = useUserStore();
  const [quotes, setQuotes] = useState<Quote[]>(QUOTES);

  useEffect(() => {
    if (user && user.hasCompletedOnboarding) {
      const personalizedQuotes = PersonalizationService.getPersonalizedQuotes(
        user.onboardingResponses,
        user.focusAreas,
        user.likedQuotes
      );

      if (personalizedQuotes.length > 0) {
        setQuotes(personalizedQuotes);
      }
    }
  }, [user?.likedQuotes, user?.focusAreas]);

  return quotes;
}
