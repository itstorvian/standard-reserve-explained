'use client';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { claims, excludedParameters, reviewedOn } from '@/data/protocol';
import type { Mode } from '@/types/protocol';

export function SourceLink({
  claimId,
  onOpen,
}: {
  claimId: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      className="source-link"
      onClick={() => onOpen(claimId)}
      aria-label={`Source: ${claims[claimId].simpleTitle}`}
    >
      <BookOpen size={11} aria-hidden="true" />
      Source
    </button>
  );
}

export function SourceDrawer({
  selection,
  mode,
  onClose,
}: {
  selection: string | null;
  mode: Mode;
  onClose: () => void;
}) {
  const all = selection === 'all';
  const ids = all
    ? [
        'charter',
        'first',
        'share',
        'accrual',
        'expansion',
        'parameters',
        'closure',
        'fee',
        'split',
        'eth',
        'unproven',
      ]
    : selection
      ? [selection]
      : [];
  return (
    <Sheet
      open={selection !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="source-drawer">
        <div className="eyebrow">The source, not just the story</div>
        <SheetTitle>
          {all ? 'Read the evidence.' : 'Behind this explanation.'}
        </SheetTitle>
        <SheetDescription>
          Official documents, with a note on exactly what each source supports.
        </SheetDescription>
        <div className="source-audit">
          Reviewed {reviewedOn}. Based on Whitepaper V0.1. The official mint
          page showed prelaunch status at review. The design and source pages
          may change.
        </div>
        {ids.map((id) => {
          const item = claims[id];
          return (
            <article className="source-entry" key={id}>
              <span
                className={`status ${item.status === 'NOT PUBLIC' || item.status === 'UNPROVEN IN LIVE MARKET' ? 'warning' : ''}`}
              >
                {item.status}
              </span>
              <h3>
                {mode === 'simple' ? item.simpleTitle : item.protocolTitle}
              </h3>
              <p>{item.confirms}</p>
              <p className="meta">{item.sourceTopic}</p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.source}
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span className="source-url">{item.sourceUrl}</span>
              {id === 'expansion' && (
                <a
                  className="mt-4"
                  href="https://www.standardreserve.xyz/app/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official overview · using internal STANDARD
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {id === 'eth' && (
                <a
                  className="mt-4"
                  href="https://www.standardreserve.xyz/whitepaper/#policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whitepaper · issuance policy
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </article>
          );
        })}
        {all && (
          <section className="source-entry">
            <h3>What this story leaves out</h3>
            <ul className="not-public-list">
              {excludedParameters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Token symbols show movement, not amounts. Alex is fictional. This
              is an explanation of the published design, not a forecast or a
              complete model of the economy.
            </p>
          </section>
        )}
      </SheetContent>
    </Sheet>
  );
}
