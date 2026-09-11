'use client';

import {
  ArrowRight,
  Check,
  CircleHelp,
  SkipForward,
  UserRound,
  X,
} from 'lucide-react';
import type { ChallengeQueueItem, ChallengeQuestion } from '@/types/challenge';

export function QuestionCard({
  question,
  queueItem,
  questionNumber,
  total,
  selectedAnswer,
  onAnswer,
  onPass,
  onContinue,
  feedback,
}: {
  question: ChallengeQuestion;
  queueItem: ChallengeQueueItem;
  questionNumber: number;
  total: number;
  selectedAnswer: string | null;
  onAnswer: (answerId: string) => void;
  onPass: () => void;
  onContinue: () => void;
  feedback: { correct: boolean } | null;
}) {
  return (
    <section
      className="challenge-question"
      aria-labelledby="challenge-question-heading"
    >
      <div className="challenge-question-meta">
        <span className="eyebrow">
          Challenge / {String(questionNumber).padStart(2, '0')}
        </span>
        <span className="challenge-progress-label">
          Question {questionNumber} of {total}
        </span>
      </div>
      <div
        className="challenge-progress"
        aria-label={`Question ${questionNumber} of ${total}`}
      >
        <span style={{ width: `${((questionNumber - 1) / total) * 100}%` }} />
      </div>
      {question.scenario ? (
        <div className="alex-scenario">
          <div className="alex-scenario-icon" aria-hidden="true">
            <UserRound size={18} strokeWidth={1.5} />
          </div>
          <div>
            <span className="status">Alex’s situation</span>
            <p>{question.scenario}</p>
          </div>
        </div>
      ) : (
        <div className="concept-label">
          <CircleHelp size={17} aria-hidden="true" />
          Protocol check
        </div>
      )}
      <h1
        id="challenge-question-heading"
        className="challenge-question-heading"
        tabIndex={-1}
      >
        {question.prompt}
      </h1>
      <fieldset className="challenge-answers">
        <legend className="sr-only">Answer choices</legend>
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer.id;
          const isCorrect =
            selectedAnswer !== null && answer.id === question.correctAnswer;
          const isIncorrect = isSelected && feedback && !feedback.correct;
          return (
            <button
              className={`challenge-answer ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
              key={answer.id}
              type="button"
              onClick={() => onAnswer(answer.id)}
              disabled={selectedAnswer !== null}
              aria-pressed={isSelected}
            >
              <span className="answer-index">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{answer.text}</span>
              {isCorrect && <Check size={17} aria-label="Correct answer" />}
              {isIncorrect && <X size={17} aria-label="Your answer" />}
            </button>
          );
        })}
      </fieldset>
      {selectedAnswer === null ? (
        <div className="challenge-question-actions">
          <button
            className="pass-button"
            type="button"
            onClick={onPass}
            disabled={queueItem.passes > 0}
          >
            <SkipForward size={15} aria-hidden="true" />
            {queueItem.passes > 0 ? 'Pass used' : 'Pass'}
          </button>
          {queueItem.passes > 0 && (
            <span className="pass-note">
              This question returns once after the unanswered sequence.
            </span>
          )}
        </div>
      ) : (
        <div
          className={`answer-feedback ${feedback?.correct ? 'feedback-correct' : 'feedback-review'}`}
          aria-live="polite"
        >
          <div className="feedback-heading">
            {feedback?.correct ? (
              <Check size={17} aria-hidden="true" />
            ) : (
              <CircleHelp size={17} aria-hidden="true" />
            )}
            {feedback?.correct
              ? 'That matches the mechanism.'
              : 'Review the mechanism.'}
          </div>
          <p>{question.explanation}</p>
          <p className="alex-reaction">{question.alexReaction}</p>
          <div className="feedback-source">
            <span>{question.sourceTopic}</span>
            <a href={question.sourceUrl} target="_blank" rel="noreferrer">
              {question.source}
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          </div>
          <button
            className="primary-button feedback-next"
            type="button"
            onClick={onContinue}
          >
            {questionNumber === total ? 'See your result' : 'Next question'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
