import type { Metadata } from 'next';
import { ChallengeShell } from '@/components/challenge/ChallengeShell';

export const metadata: Metadata = {
  title: 'LUDUS Challenge — Think through the system.',
  description:
    'A ten-question interactive challenge about Standard Reserve mechanisms. An unofficial educational project by Torvian.',
};

export default function ChallengePage() {
  return <ChallengeShell />;
}
