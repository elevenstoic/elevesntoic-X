import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, OnboardingResponse, FocusArea } from '../types';
import { useUserStore } from '../store/userStore';
import { PersonalizationService } from '../services/personalizationService';
import { FONT_SIZES, SPACING } from '../theme/typography';

const { width, height } = Dimensions.get('window');

type OnboardingScreenProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Question {
  id: string;
  text: string;
  subtext?: string;
  type: 'text' | 'multiselect' | 'scale';
  options?: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'intro',
    text: 'You only get one life.',
    subtext: 'Most people waste it scrolling through others instead of living their own.\n\nLet's change that.',
    type: 'text',
  },
  {
    id: 'feeling',
    text: 'How do you feel right now?',
    type: 'multiselect',
    options: ['Lost', 'Unmotivated', 'Stuck in a loop', 'Overwhelmed', 'Disconnected', 'Tired of wasting time'],
  },
  {
    id: 'struggle',
    text: 'What's your biggest struggle?',
    type: 'multiselect',
    options: ['I know what to do, but can't make myself do it', 'Too much scrolling', 'Lack of discipline', 'No clear direction', 'Constant distraction', 'Feeling like I'm wasting potential'],
  },
  {
    id: 'weight',
    text: 'On a scale of 1-10, how much does this weigh on you?',
    subtext: '1 = barely affects me, 10 = keeps me up at night',
    type: 'scale',
  },
  {
    id: 'want',
    text: 'What do you want to feel instead?',
    type: 'multiselect',
    options: ['Calm', 'Focused', 'Inspired', 'In control', 'Purposeful', 'Aligned with my goals'],
  },
  {
    id: 'commitment',
    text: 'Are you ready to trust yourself again?',
    subtext: 'This app won't fix your life.\n\nBut it will remind you daily of who you said you'd be.',
    type: 'text',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scaleValue, setScaleValue] = useState(5);

  const navigation = useNavigation<OnboardingScreenProp>();
  const { completeOnboarding } = useUserStore();

  const currentQuestion = QUESTIONS[currentStep];

  const handleNext = async () => {
    // Save response
    let answer: string | string[];
    let emotionalWeight = 5;

    if (currentQuestion.type === 'multiselect') {
      answer = selectedOptions;
      emotionalWeight = selectedOptions.length * 1.5;
    } else if (currentQuestion.type === 'scale') {
      answer = scaleValue.toString();
      emotionalWeight = scaleValue;
    } else {
      answer = currentAnswer;
      emotionalWeight = currentAnswer.length > 50 ? 8 : 5;
    }

    const response: OnboardingResponse = {
      questionId: currentQuestion.id,
      answer,
      emotionalWeight,
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Move to next question
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentAnswer('');
      setSelectedOptions([]);
      setScaleValue(5);
    } else {
      // Onboarding complete
      const suggestedFocusAreas = PersonalizationService.suggestFocusAreas(newResponses);
      await completeOnboarding(newResponses, suggestedFocusAreas);
      navigation.navigate('Paywall');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const previousResponse = responses[currentStep - 1];
      if (previousResponse) {
        if (Array.isArray(previousResponse.answer)) {
          setSelectedOptions(previousResponse.answer);
        } else {
          setCurrentAnswer(previousResponse.answer);
        }
      }
    }
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === 'text') {
      return true; // Can skip text questions
    } else if (currentQuestion.type === 'multiselect') {
      return selectedOptions.length > 0;
    } else if (currentQuestion.type === 'scale') {
      return true;
    }
    return false;
  };

  return (
    <LinearGradient colors={['#26436B', '#1a2942', '#0a0a0a']} style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          key={currentStep}
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(300)}
          style={styles.questionContainer}
        >
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {currentQuestion.subtext && (
            <Text style={styles.subtextText}>{currentQuestion.subtext}</Text>
          )}

          {currentQuestion.type === 'text' && (
            <View style={styles.spacer} />
          )}

          {currentQuestion.type === 'multiselect' && currentQuestion.options && (
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOptions.includes(option) && styles.optionButtonSelected,
                  ]}
                  onPress={() => toggleOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.includes(option) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {currentQuestion.type === 'scale' && (
            <View style={styles.scaleContainer}>
              <View style={styles.scaleNumbers}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.scaleButton,
                      scaleValue === num && styles.scaleButtonSelected,
                    ]}
                    onPress={() => setScaleValue(num)}
                  >
                    <Text
                      style={[
                        styles.scaleText,
                        scaleValue === num && styles.scaleTextSelected,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.scaleLabels}>
                <Text style={styles.scaleLabelText}>Barely</Text>
                <Text style={styles.scaleLabelText}>Keeps me up</Text>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === QUESTIONS.length - 1 ? 'Continue' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 50,
  },
  progress: {
    height: '100%',
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['3xl'],
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: SPACING.lg,
    lineHeight: 48,
  },
  subtextText: {
    fontSize: FONT_SIZES.lg,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: SPACING.xl,
    lineHeight: 28,
  },
  spacer: {
    flex: 1,
  },
  optionsContainer: {
    marginTop: SPACING.xl,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fff',
  },
  optionText: {
    fontSize: FONT_SIZES.base,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  scaleContainer: {
    marginTop: SPACING['2xl'],
  },
  scaleNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  scaleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleButtonSelected: {
    backgroundColor: '#fff',
  },
  scaleText: {
    fontSize: FONT_SIZES.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scaleTextSelected: {
    color: '#26436B',
    fontWeight: 'bold',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabelText: {
    fontSize: FONT_SIZES.xs,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.md,
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FONT_SIZES.base,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    color: '#26436B',
    fontSize: FONT_SIZES.base,
    fontWeight: 'bold',
  },
});
