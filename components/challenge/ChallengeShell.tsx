'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Clock3, ShieldCheck } from 'lucide-react';
import { challengeQuestions, challengeQuestionCount } from '@/data/challenge';
import {
  formatXHandleInput,
  getServerXHandleSnapshot,
  getXHandleSnapshot,
  saveXHandle,
  subscribeToXHandle,
  validateXHandle,
  xHandleInputMaxLength,
} from '@/lib/x-handle';
import type { ChallengeQueueItem, ChallengeResponse } from '@/types/challenge';
import { ChallengeResult } from './ChallengeResult';
import { QuestionCard } from './QuestionCard';

type ChallengePhase = 'intro' | 'question' | 'result';

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function createQueue(): ChallengeQueueItem[] {
  return shuffle(
    challengeQuestions.map((question) => ({
      questionId: question.id,
      passes: 0,
      answerOrder: shuffle(question.answers.map((answer) => answer.id)),
    })),
  );
}

export function ChallengeShell() {
  const [phase, setPhase] = useState<ChallengePhase>('intro');
  const [queue, setQueue] = useState<ChallengeQueueItem[]>([]);
  const [responses, setResponses] = useState<ChallengeResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [notice, setNotice] = useState('');
  const lastPassedQuestion = useRef<string | null>(null);
  const savedXHandle = useSyncExternalStore(
    subscribeToXHandle,
    getXHandleSnapshot,
    getServerXHandleSnapshot,
  );
  const [xHandleDraft, setXHandleDraft] = useState<string | null>(null);
  const [xHandleError, setXHandleError] = useState('');
  const xHandle = xHandleDraft ?? savedXHandle;
  const handleXHandleChange = useCallback((value: string) => {
    const { normalized, error } = validateXHandle(value);
    setXHandleDraft(error ? formatXHandleInput(value) : normalized);
    setXHandleError(error);
    if (!error) saveXHandle(normalized);
  }, []);

  const questionMap = useMemo(
    () =>
      new Map(challengeQuestions.map((question) => [question.id, question])),
    [],
  );
  const currentItem = queue[0];
  const currentQuestion = currentItem
    ? questionMap.get(currentItem.questionId)
    : undefined;
  const currentNumber = responses.length + 1;
  const orderedAnswers = currentQuestion
    ? currentItem!.answerOrder
        .map((answerId) =>
          currentQuestion.answers.find((answer) => answer.id === answerId),
        )
        .filter((answer): answer is (typeof currentQuestion.answers)[number] =>
          Boolean(answer),
        )
    : [];

  useEffect(() => {
    if (phase !== 'question' || !startedAt) return undefined;
    const update = () =>
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [phase, startedAt]);

  const startRun = useCallback(() => {
    saveXHandle(xHandleError ? '' : xHandle);
    setXHandleDraft(null);
    setXHandleError('');
    setQueue(createQueue());
    setResponses([]);
    setSelectedAnswer(null);
    setFeedback(null);
    setElapsed(0);
    setStartedAt(Date.now());
    setNotice('');
    lastPassedQuestion.current = null;
    setPhase('question');
  }, [xHandle, xHandleError]);

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion || selectedAnswer) return;
    const correct = answerId === currentQuestion.correctAnswer;
    setSelectedAnswer(answerId);
    setFeedback({ correct });
    setNotice('');
  };

  const handlePass = () => {
    if (
      !currentItem ||
      currentItem.passes > 0 ||
      lastPassedQuestion.current === currentItem.questionId
    )
      return;
    lastPassedQuestion.current = currentItem.questionId;
    setQueue((items) => [...items.slice(1), { ...currentItem, passes: 1 }]);
    setNotice('Passed once. It will return after the unanswered questions.');
  };

  const handleContinue = () => {
    if (!currentQuestion || !selectedAnswer || !feedback || !currentItem)
      return;
    const nextResponse: ChallengeResponse = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: feedback.correct,
      passed: currentItem.passes > 0,
    };
    const nextResponses = [...responses, nextResponse];
    setResponses(nextResponses);
    setQueue((items) => items.slice(1));
    setSelectedAnswer(null);
    setFeedback(null);
    setNotice('');
    if (queue.length === 1) {
      if (startedAt) setElapsed(Math.floor((Date.now() - startedAt) / 1000));
      setPhase('result');
    }
  };

  return (
    <div className="site-wrap challenge-wrap">
      <a className="skip-link" href="#challenge-main">
        Skip to the challenge
      </a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="LUDUS — back to Learn">
          <span className="brand-mark" aria-hidden="true">
            L.
          </span>
          <span>
            <span className="brand-name">LUDUS</span>
            <span className="brand-note">
              An interactive way to understand Standard Reserve.
            </span>
            <span className="brand-note">
              An unofficial educational project.
            </span>
          </span>
        </Link>
        <div className="header-right">
          <nav className="site-nav" aria-label="Primary">
            <Link href="/">Learn</Link>
            <Link href="/challenge" aria-current="page">
              Challenge
            </Link>
          </nav>
        </div>
      </header>
      <main id="challenge-main" tabIndex={-1}>
        {phase === 'intro' && (
          <section
            className="challenge-intro scene-entrance"
            aria-labelledby="challenge-heading"
          >
            <div className="challenge-intro-copy">
              <span className="eyebrow">LUDUS / Challenge</span>
              <h1 id="challenge-heading">Think through the system.</h1>
              <p>
                Alex is moving through Standard Reserve. Ten short decisions
                will test whether the mechanisms make sense, from internal
                accrual to a final exit.
              </p>
              <label className="x-handle-field">
                <span>
                  X handle <small>(optional)</small>
                </span>
                <input
                  type="text"
                  value={xHandle}
                  maxLength={xHandleInputMaxLength}
                  placeholder="@torvian"
                  onChange={(event) => handleXHandleChange(event.target.value)}
                  onBlur={(event) => handleXHandleChange(event.target.value)}
                  autoComplete="off"
                />
                <small>Stored only on this device. It is not verified.</small>
                {xHandleError && (
                  <small className="x-handle-error" role="alert">
                    {xHandleError}
                  </small>
                )}
              </label>
              <button
                className="primary-button"
                type="button"
                onClick={startRun}
              >
                Start the challenge
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
            <div className="challenge-intro-panel">
              <div className="challenge-stat-line">
                <BookOpenCheck size={18} aria-hidden="true" />
                <span>
                  <strong>10</strong> questions
                </span>
              </div>
              <div className="challenge-stat-line">
                <Clock3 size={18} aria-hidden="true" />
                <span>Small timer, accuracy first</span>
              </div>
              <div className="challenge-stat-line">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Official sources on every answer</span>
              </div>
              <p className="challenge-panel-note">
                Pass once when you need to. The question returns after the
                unanswered sequence.
              </p>
            </div>
          </section>
        )}
        {phase === 'question' && currentQuestion && currentItem && (
          <div className="challenge-play scene-entrance">
            <div className="challenge-runbar">
              <span className="challenge-run-title">The challenge</span>
              <span
                className="challenge-timer"
                aria-label={`Elapsed time ${formatDuration(elapsed)}`}
              >
                <Clock3 size={15} aria-hidden="true" />
                <time>{formatDuration(elapsed)}</time>
              </span>
            </div>
            {notice && (
              <p className="challenge-notice" aria-live="polite">
                {notice}
              </p>
            )}
            <QuestionCard
              question={{ ...currentQuestion, answers: orderedAnswers }}
              queueItem={currentItem}
              questionNumber={currentNumber}
              total={challengeQuestionCount}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
              onPass={handlePass}
              onContinue={handleContinue}
              feedback={feedback}
            />
          </div>
        )}
        {phase === 'result' && (
          <ChallengeResult
            responses={responses}
            questions={challengeQuestions}
            elapsed={elapsed}
            xHandle={xHandle}
            xHandleError={xHandleError}
            onXHandleChange={handleXHandleChange}
            onXHandleBlur={handleXHandleChange}
            onReplay={startRun}
          />
        )}
      </main>
      <footer className="site-footer">
        <p>
          Unofficial educational tool.
          <br />
          Not affiliated with or endorsed by Standard Reserve.
        </p>
        <p>
          Built by <strong>Torvian.</strong>
        </p>
      </footer>
    </div>
  );
}
