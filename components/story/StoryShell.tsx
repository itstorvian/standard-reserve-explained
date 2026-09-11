'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { chapters, claims, reviewedOn } from '@/data/protocol';
import type { Mode } from '@/types/protocol';
import { ModeToggle } from './ModeToggle';
import { Chapters, StoryNavigation } from './StoryNavigation';
import { SourceDrawer, SourceLink } from './SourceDrawer';
import { IntroVisual, SceneVisual, SystemMap } from './Visuals';

export function StoryShell() {
  const [mode, setMode] = useState<Mode>('simple');
  const [scene, setScene] = useState(-1);
  const [visited, setVisited] = useState<number[]>([]);
  const [source, setSource] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const sourceTrigger = useRef<HTMLElement | null>(null);
  const mapTrigger = useRef<HTMLElement | null>(null);
  const navigate = useCallback((next: number) => {
    if (next < 0 || next >= chapters.length) return;
    setScene(next);
    setVisited((previous) =>
      previous.includes(next) ? previous : [...previous, next],
    );
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, []);
  const openSource = useCallback((id: string) => {
    sourceTrigger.current = document.activeElement as HTMLElement;
    setSource(id);
  }, []);
  const closeSource = () => {
    setSource(null);
    requestAnimationFrame(() =>
      sourceTrigger.current?.focus({ preventScroll: true }),
    );
  };
  const showMap = () => {
    if (visited.length < 7) {
      navigate(chapters.findIndex((_, index) => !visited.includes(index)));
      return;
    }
    mapTrigger.current = document.activeElement as HTMLElement;
    setMapOpen(true);
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        scene < 0 ||
        source ||
        mapOpen ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      const target = event.target as HTMLElement;
      if (
        target.closest(
          'button,a,input,textarea,select,[role="radio"],[role="radiogroup"],[contenteditable="true"]',
        )
      )
        return;
      if (event.key === 'ArrowRight' && scene < 6) {
        event.preventDefault();
        navigate(scene + 1);
      }
      if (event.key === 'ArrowLeft' && scene > 0) {
        event.preventDefault();
        navigate(scene - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scene, source, mapOpen, navigate]);
  const chapter = scene >= 0 ? chapters[scene] : null;
  const mainClaim = chapter ? claims[chapter.claimId] : null;
  const note = chapter ? claims[chapter.noteId] : null;
  const title = (item: typeof mainClaim) =>
    item ? (mode === 'simple' ? item.simpleTitle : item.protocolTitle) : '';
  const description = (item: typeof mainClaim) =>
    item
      ? mode === 'simple'
        ? item.simpleDescription
        : item.protocolDescription
      : '';

  return (
    <div className="site-wrap">
      <a className="skip-link" href="#story">
        Skip to the story
      </a>
      <header className="site-header">
        <button
          className="brand"
          onClick={() => {
            setScene(-1);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          aria-label="LUDUS — back to introduction"
        >
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
        </button>
        <div className="header-right">
          <nav className="site-nav" aria-label="Primary">
            <Link href="/" aria-current="page">
              Learn
            </Link>
            <Link href="/challenge">Challenge</Link>
          </nav>
          <button className="text-button" onClick={() => openSource('all')}>
            <BookOpen size={15} strokeWidth={1.4} aria-hidden="true" />
            Sources
            <ArrowUpRight size={13} aria-hidden="true" />
          </button>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </header>
      <main id="story" tabIndex={-1}>
        {scene < 0 ? (
          <section className="intro scene-entrance">
            <div>
              <div className="eyebrow">
                A short story about Standard Reserve
              </div>
              <h1>
                One banker.
                <br />
                One story.
                <br />
                <em>The whole system.</em>
              </h1>
              <p className="intro-description">
                Follow Alex from his first{' '}
                {mode === 'simple' ? 'participation license' : 'Charter'} to his
                first withdrawal. See how the pieces connect, one decision at a
                time.
              </p>
              <div className="start-line">
                <button className="primary-button" onClick={() => navigate(0)}>
                  Start the story
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <span className="meta">7 scenes · 3–5 minutes</span>
              </div>
            </div>
            <div className="intro-aside">
              <IntroVisual mode={mode} />
              <p className="intro-footnote">
                First understand the idea. Then learn the terminology.
              </p>
            </div>
          </section>
        ) : (
          <>
            <div className="story-topline">
              <span className="eyebrow">
                The story / {String(scene + 1).padStart(2, '0')}
              </span>
              <button
                className="text-button"
                onClick={() => {
                  setVisited([0]);
                  navigate(0);
                }}
              >
                <RotateCcw size={13} aria-hidden="true" />
                Start again
              </button>
            </div>
            <section
              className="story-grid scene-entrance"
              key={chapter!.id}
              aria-labelledby="scene-heading"
            >
              <div>
                <span className="status">{mainClaim!.status}</span>
                <h1
                  className="scene-heading"
                  id="scene-heading"
                  ref={heading}
                  tabIndex={-1}
                >
                  {title(mainClaim)}
                </h1>
                <p className="scene-description">{description(mainClaim)}</p>
                <SourceLink claimId={mainClaim!.id} onOpen={openSource} />
                <aside className="takeaway">
                  <span
                    className={`status ${note!.status === 'NOT PUBLIC' ? 'warning' : ''}`}
                  >
                    {note!.status === 'DOCUMENTED'
                      ? 'Keep this in mind'
                      : note!.status}
                  </span>
                  <p>{description(note)}</p>
                  <SourceLink claimId={note!.id} onOpen={openSource} />
                </aside>
                {scene === 5 && (
                  <aside className="takeaway">
                    <span className="status warning">
                      Unproven in live market
                    </span>
                    <p>{claims.unproven.simpleDescription}</p>
                    <SourceLink claimId="unproven" onOpen={openSource} />
                  </aside>
                )}
              </div>
              <SceneVisual scene={scene} mode={mode} onSource={openSource} />
            </section>
            <StoryNavigation
              scene={scene}
              complete={visited.length === 7}
              onNavigate={navigate}
              onMap={showMap}
            />
          </>
        )}
      </main>
      <Chapters scene={scene} mode={mode} onNavigate={navigate} />
      <footer className="site-footer">
        <p>
          Unofficial educational tool.
          <br />
          Not affiliated with or endorsed by Standard Reserve.
        </p>
        <p>
          Built by{' '}
          <strong>
            <a
              className="footer-credit-link"
              href="https://x.com/itstorvian"
              target="_blank"
              rel="noopener noreferrer"
            >
              @itstorvian
            </a>
          </strong>
        </p>
      </footer>
      <SourceDrawer selection={source} mode={mode} onClose={closeSource} />
      <Dialog
        open={mapOpen}
        onOpenChange={(open) => {
          setMapOpen(open);
          if (!open)
            requestAnimationFrame(() =>
              mapTrigger.current?.focus({ preventScroll: true }),
            );
        }}
      >
        <DialogContent className="system-dialog">
          <div className="eyebrow">The story, connected</div>
          <DialogTitle>The whole system, through Alex.</DialogTitle>
          <DialogDescription>
            Everything you have learned. Follow either path from his internal
            balance.
          </DialogDescription>
          <div className="stage">
            <SystemMap mode={mode} includeEth />
          </div>
          <p className="meta">
            A map of Alex’s participation, not every protocol subsystem. Based
            on the published design reviewed {reviewedOn}.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
