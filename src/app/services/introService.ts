import { IntroCardData } from '@/app/components/IntroCard';

interface IntroSeed extends Omit<IntroCardData, 'expiresAt'> {
  expiresInHours: number;
}

const introSeeds: IntroSeed[] = [
  {
    id: 'intro-1',
    userId: 'user-1',
    name: 'Sophie',
    age: 29,
    photos: [
      'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Brooklyn, NY',
    occupation: 'Product Designer',
    education: 'Cornell University',
    height: '5\'7"',
    lifeMapHighlight: 'Building a life where Sunday mornings are for farmers markets and deep conversations over coffee',
    matchReasons: [
      'Both value intentional relationships over casual dating',
      'Shared interest in sustainable living and local community',
      'Similar communication styles: thoughtful, direct, emotionally aware',
    ],
    watchOuts: [
      'She prioritizes work-life balance; may need advance planning for spontaneous trips',
    ],
    trustScore: 94,
    verified: true,
    expiresInHours: 72,
  },
  {
    id: 'intro-2',
    userId: 'user-2',
    name: 'Marcus',
    age: 32,
    photos: [
      'https://images.unsplash.com/photo-1758599543126-59e3154d7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc2OTc2OTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Manhattan, NY',
    occupation: 'Management Consultant',
    education: 'MIT',
    height: '6\'1"',
    lifeMapHighlight: 'Looking for someone who gets excited about trying new restaurants and discussing big ideas late into the night',
    matchReasons: [
      'Both see relationships as partnerships for personal growth',
      'Match on core values: curiosity, authenticity, adventure',
      'Complementary strengths: you bring stability, he brings spontaneity',
    ],
    watchOuts: [
      'Recently relocated for work; still building his local community',
      'High career ambition may require flexibility during busy seasons',
    ],
    trustScore: 88,
    verified: true,
    expiresInHours: 72,
  },
  {
    id: 'intro-3',
    userId: 'user-3',
    name: 'Elena',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1488716820095-cbe80883c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Queens, NY',
    occupation: 'UX Researcher',
    education: 'Stanford University',
    height: '5\'5"',
    lifeMapHighlight: 'Creating a life filled with creativity, meaningful work, and people who inspire me to be better',
    matchReasons: [
      'Aligned on wanting children within the next 3-5 years',
      'Both value emotional intelligence and open communication',
      'Strong overlap in lifestyle preferences and weekend activities',
    ],
    watchOuts: [
      'Values quality time; may need reassurance during busy work periods',
    ],
    trustScore: 91,
    verified: true,
    expiresInHours: 72,
  },
];

const cloneIntro = (intro: IntroSeed): IntroCardData => ({
  ...intro,
  expiresAt: new Date(Date.now() + intro.expiresInHours * 60 * 60 * 1000),
});

export async function fetchIntros(): Promise<IntroCardData[]> {
  await Promise.resolve();
  return introSeeds.map(cloneIntro);
}
