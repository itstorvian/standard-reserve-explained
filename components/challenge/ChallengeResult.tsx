'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  RotateCcw,
  Share2,
  X,
} from 'lucide-react';
import { xHandleInputMaxLength, xHandleMaxLength } from '@/lib/x-handle';
import type { ChallengeQuestion, ChallengeResponse } from '@/types/challenge';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

export function ChallengeResult({
  responses,
  questions,
  elapsed,
  xHandle,
  xHandleError,
  onXHandleChange,
  onXHandleBlur,
  onReplay,
}: {
  responses: ChallengeResponse[];
  questions: ChallengeQuestion[];
  elapsed: number;
  xHandle: string;
  xHandleError: string;
  onXHandleChange: (value: string) => void;
  onXHandleBlur: (value: string) => void;
  onReplay: () => void;
}) {
  const questionMap = new Map(
    questions.map((question) => [question.id, question]),
  );
  const correctCount = responses.filter((response) => response.correct).length;
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleShare = () => {
    const publicChallengeUrl = `${window.location.origin}/challenge`;
    const shareText = `I got ${correctCount}/${responses.length} on the LUDUS Standard Reserve challenge. Think you can beat it?`;
    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(publicChallengeUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="challenge-result"
      aria-labelledby="challenge-result-heading"
    >
      <div className="eyebrow">Run complete</div>
      <h1 id="challenge-result-heading">You understand the shape of it.</h1>
      <p className="challenge-result-intro">
        Accuracy comes first. Time is here to show the pace of this run, not to
        change the score.
      </p>
      <div className="result-x-handle">
        <label htmlFor="result-x-handle-input">
          X handle <small>(optional)</small>
        </label>
        <div className="result-x-handle-row">
          <input
            id="result-x-handle-input"
            type="text"
            value={xHandle}
            maxLength={xHandleInputMaxLength}
            onChange={(event) => onXHandleChange(event.target.value)}
            onBlur={(event) => onXHandleBlur(event.target.value)}
            autoComplete="off"
          />
          <span className="x-handle-count">
            {xHandle.replace(/^@/, '').length}/{xHandleMaxLength}
          </span>
        </div>
        <small>
          Your X handle is saved only on this device. It is not verified.
        </small>
        {xHandleError && (
          <small className="x-handle-error" role="alert">
            {xHandleError}
          </small>
        )}
      </div>
      <div className="share-card" aria-label="Shareable LUDUS challenge result">
        <div className="share-card-heading">
          <span>LUDUS</span>
          <span>Standard Reserve Challenge</span>
        </div>
        {xHandle && !xHandleError && (
          <div className="share-card-handle">{xHandle}</div>
        )}
        <div className="share-card-main">
          <span className="share-card-score">
            {correctCount}/{responses.length}
          </span>
          <span className="share-card-score-label">Score</span>
        </div>
        <div className="share-card-details">
          <span>{formatDuration(elapsed)} completion time</span>
        </div>
        <div className="share-card-footer">
          <span>Accuracy first.</span>
          <span>An unofficial educational project.</span>
        </div>
      </div>
      <div className="result-stats">
        <div>
          <span className="result-value">
            {correctCount} / {responses.length}
          </span>
          <span className="result-label">Score</span>
        </div>
        <div>
          <span className="result-value">{correctCount}</span>
          <span className="result-label">Correct answers</span>
        </div>
        <div>
          <span className="result-value">{formatDuration(elapsed)}</span>
          <span className="result-label">Completion time</span>
        </div>
      </div>
      <div className="result-actions">
        <button className="primary-button" type="button" onClick={onReplay}>
          <RotateCcw size={15} aria-hidden="true" />
          Try again
        </button>
        <button className="share-button" type="button" onClick={handleShare}>
          <Share2 size={15} aria-hidden="true" />
          Share on X
          <ExternalLink size={13} aria-hidden="true" />
        </button>
        <button
          className="nav-button"
          type="button"
          onClick={() => setReviewOpen((open) => !open)}
          aria-expanded={reviewOpen}
        >
          {reviewOpen ? 'Hide review' : 'Review answers'}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <Link className="back-link" href="/">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Learn
        </Link>
      </div>
      {reviewOpen && (
        <div className="review-list" aria-label="Answer review">
          {responses.map((response, index) => {
            const question = questionMap.get(response.questionId);
            if (!question) return null;
            const selected = question.answers.find(
              (answer) => answer.id === response.selectedAnswer,
            );
            const correct = question.answers.find(
              (answer) => answer.id === question.correctAnswer,
            );
            return (
              <article className="review-item" key={response.questionId}>
                <div className="review-item-heading">
                  <span>Question {index + 1}</span>
                  {response.correct ? (
                    <Check size={15} aria-label="Correct" />
                  ) : (
                    <X size={15} aria-label="Needs review" />
                  )}
                </div>
                <h2>{question.prompt}</h2>
                <p>
                  <strong>Your answer:</strong>{' '}
                  {selected?.text ?? 'Passed before answering'}
                </p>
                <p>
                  <strong>Correct answer:</strong> {correct?.text}
                </p>
                <p className="review-explanation">{question.explanation}</p>
                <a href={question.sourceUrl} target="_blank" rel="noreferrer">
                  {question.sourceTopic}
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
