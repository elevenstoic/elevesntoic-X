import { Quote } from '../types';

// This is a sample set of quotes. In production, this would be loaded from an API or database
export const QUOTES: Quote[] = [
  // Peace
  {
    id: '1',
    text: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    author: 'Marcus Aurelius',
    category: 'Peace',
    tags: ['peace', 'control', 'strength'],
  },
  {
    id: '2',
    text: 'The quieter you become, the more you can hear.',
    author: 'Ram Dass',
    category: 'Peace',
    tags: ['peace', 'silence', 'awareness'],
  },
  {
    id: '3',
    text: 'Peace comes from within. Do not seek it without.',
    author: 'Buddha',
    category: 'Peace',
    tags: ['peace', 'inner-work', 'mindfulness'],
  },

  // Discipline
  {
    id: '4',
    text: 'Discipline is the bridge between goals and accomplishment.',
    author: 'Jim Rohn',
    category: 'Discipline',
    tags: ['discipline', 'goals', 'achievement'],
  },
  {
    id: '5',
    text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Aristotle',
    category: 'Discipline',
    tags: ['discipline', 'habits', 'excellence'],
  },
  {
    id: '6',
    text: 'The impediment to action advances action. What stands in the way becomes the way.',
    author: 'Marcus Aurelius',
    category: 'Discipline',
    tags: ['discipline', 'obstacles', 'action'],
  },

  // Clarity
  {
    id: '7',
    text: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    category: 'Clarity',
    tags: ['clarity', 'simplicity', 'focus'],
  },
  {
    id: '8',
    text: 'In the beginner's mind there are many possibilities, in the expert's mind there are few.',
    author: 'Shunryu Suzuki',
    category: 'Clarity',
    tags: ['clarity', 'mindset', 'possibilities'],
  },
  {
    id: '9',
    text: 'Clarity affords focus.',
    author: 'Thomas Leonard',
    category: 'Clarity',
    tags: ['clarity', 'focus', 'direction'],
  },

  // Purpose
  {
    id: '10',
    text: 'He who has a why to live can bear almost any how.',
    author: 'Friedrich Nietzsche',
    category: 'Purpose',
    tags: ['purpose', 'meaning', 'resilience'],
  },
  {
    id: '11',
    text: 'The two most important days in your life are the day you are born and the day you find out why.',
    author: 'Mark Twain',
    category: 'Purpose',
    tags: ['purpose', 'meaning', 'life'],
  },
  {
    id: '12',
    text: 'Waste no more time arguing what a good man should be. Be one.',
    author: 'Marcus Aurelius',
    category: 'Purpose',
    tags: ['purpose', 'action', 'character'],
  },

  // Focus
  {
    id: '13',
    text: 'The successful warrior is the average man, with laser-like focus.',
    author: 'Bruce Lee',
    category: 'Focus',
    tags: ['focus', 'success', 'determination'],
  },
  {
    id: '14',
    text: 'Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.',
    author: 'Alexander Graham Bell',
    category: 'Focus',
    tags: ['focus', 'concentration', 'work'],
  },
  {
    id: '15',
    text: 'One thing at a time. Most important thing first.',
    author: 'Peter Drucker',
    category: 'Focus',
    tags: ['focus', 'priorities', 'simplicity'],
  },

  // Additional quotes for variety
  {
    id: '16',
    text: 'Stop scrolling. Remember who you said you'd be.',
    author: 'Elevenstoic',
    category: 'Discipline',
    tags: ['discipline', 'reminder', 'awareness'],
  },
  {
    id: '17',
    text: 'Your future self is watching right now.',
    author: 'Elevenstoic',
    category: 'Purpose',
    tags: ['purpose', 'future', 'accountability'],
  },
  {
    id: '18',
    text: 'You said you wanted more. This is the moment.',
    author: 'Elevenstoic',
    category: 'Focus',
    tags: ['focus', 'action', 'present'],
  },
  {
    id: '19',
    text: 'Life is short. But beautiful when lived intentionally.',
    author: 'Elevenstoic',
    category: 'Purpose',
    tags: ['purpose', 'intention', 'beauty'],
  },
  {
    id: '20',
    text: 'You only get one life. Make it count.',
    author: 'Elevenstoic',
    category: 'Purpose',
    tags: ['purpose', 'life', 'urgency'],
  },
];

export const getQuotesByCategory = (category: string): Quote[] => {
  return QUOTES.filter(quote => quote.category === category);
};

export const getRandomQuote = (): Quote => {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
};

export const getRandomQuoteByCategory = (category: string): Quote => {
  const categoryQuotes = getQuotesByCategory(category);
  return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
};
