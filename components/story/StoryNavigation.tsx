'use client';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import Link from 'next/link';
import { chapters } from '@/data/protocol';
import type { Mode } from '@/types/protocol';

export function Chapters({
  scene,
  mode,
  onNavigate,
}: {
  scene: number;
  mode: Mode;
  onNavigate: (scene: number) => void;
}) {
  return (
    <nav className="chapters" aria-label="Story chapters">
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          className={`chapter ${scene === index ? 'active' : ''}`}
          onClick={() => onNavigate(index)}
          aria-current={scene === index ? 'step' : undefined}
          aria-label={`Chapter ${index + 1}: ${mode === 'simple' ? chapter.simpleLabel : chapter.protocolLabel}`}
        >
          <span className="chapter-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          {mode === 'simple' ? chapter.simpleLabel : chapter.protocolLabel}
        </button>
      ))}
    </nav>
  );
}

export function StoryNavigation({
  scene,
  complete,
  onNavigate,
  onMap,
}: {
  scene: number;
  complete: boolean;
  onNavigate: (scene: number) => void;
  onMap: () => void;
}) {
  return (
    <nav className="story-navigation" aria-label="Scene navigation">
      <button
        className="nav-button"
        disabled={scene === 0}
        onClick={() => onNavigate(scene - 1)}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Previous
      </button>
      <div className="page-count">
        Scene {scene + 1} of 7<small>Use ← → to move through the story</small>
      </div>
      {scene < 6 ? (
        <button
          className="primary-button"
          onClick={() => onNavigate(scene + 1)}
        >
          Next scene
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      ) : (
        <div className="final-actions">
          <button className="primary-button" onClick={onMap}>
            {complete ? 'See the whole system' : 'Finish the story'}
            {complete ? (
              <Expand size={15} aria-hidden="true" />
            ) : (
              <ArrowRight size={15} aria-hidden="true" />
            )}
          </button>
          {complete && (
            <Link className="challenge-cta" href="/challenge">
              Test your understanding
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
