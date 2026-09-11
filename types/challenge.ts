export type ChallengeQuestionType = 'scenario' | 'concept';

export interface ChallengeAnswer {
  id: string;
  text: string;
}

export interface ChallengeQuestion {
  id: string;
  type: ChallengeQuestionType;
  scenario?: string;
  prompt: string;
  answers: ChallengeAnswer[];
  correctAnswer: string;
  explanation: string;
  source: string;
  sourceUrl: string;
  sourceTopic: string;
  alexReaction: string;
}

export interface ChallengeResponse {
  questionId: string;
  selectedAnswer: string | null;
  correct: boolean;
  passed: boolean;
}

export interface ChallengeQueueItem {
  questionId: string;
  passes: number;
  answerOrder: string[];
}
