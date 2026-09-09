'use client';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleMinus,
  Flame,
  GitBranch,
  LockKeyhole,
  Plus,
  RotateCcw,
  ScrollText,
  UserRound,
  UsersRound,
  Wallet,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { chapters, pressureCopy, terminology as t } from '@/data/protocol';
import type { Mode, Pressure } from '@/types/protocol';
import { SourceLink } from './SourceDrawer';

export function StandardToken({
  animate = false,
  delay = 0,
}: {
  animate?: boolean;
  delay?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`standard-token ${animate ? 'token-arrive' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      s
    </span>
  );
}

export function Person({ mode }: { mode: Mode }) {
  return (
    <div className="person">
      <span className="avatar">
        <UserRound size={24} strokeWidth={1.3} aria-hidden="true" />
      </span>
      <div>
        <strong>Alex</strong>
        <small>Our fictional {t.banker[mode].toLowerCase()}</small>
      </div>
    </div>
  );
}

export function CharterVisual({
  mode,
  compact = false,
}: {
  mode: Mode;
  compact?: boolean;
}) {
  if (compact)
    return (
      <div className="compact-charter">
        <ScrollText size={18} aria-hidden="true" />
        Alex’s {t.charter[mode].toLowerCase()}
      </div>
    );
  return (
    <div className="charter-card">
      <div className="charter-top">
        <span>A place in the system</span>
        <ScrollText size={20} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <h3>{t.charter[mode]}</h3>
      <p>Held by Alex</p>
      <div className="charter-bottom">
        <span>
          <Check size={12} aria-hidden="true" />
          Participation begins
        </span>
        <span>01 / Alex’s story</span>
      </div>
    </div>
  );
}

export function BranchVisual({
  mode,
  index = 1,
  closed = false,
}: {
  mode: Mode;
  index?: number;
  closed?: boolean;
}) {
  return (
    <div className={`branch-node ${closed ? 'closed' : ''}`}>
      {closed ? (
        <CircleMinus size={20} aria-hidden="true" />
      ) : (
        <GitBranch size={20} strokeWidth={1.4} aria-hidden="true" />
      )}
      <span>
        {t.branch[mode]} {index}
      </span>
      <small>
        {closed
          ? mode === 'simple'
            ? 'Closed · no new STANDARD'
            : 'Closed · no future issuance'
          : mode === 'simple'
            ? 'Active · shares in new STANDARD'
            : 'Active · shares in issuance'}
      </small>
    </div>
  );
}

export function WalletVisual({
  mode,
  released = false,
}: {
  mode: Mode;
  released?: boolean;
}) {
  return (
    <div className="flow-box wallet-box">
      <Wallet size={24} strokeWidth={1.3} aria-hidden="true" />
      <span>Alex’s wallet</span>
      {released ? (
        <>
          <StandardToken animate />
          <small>Released, less the {t.fee[mode].toLowerCase()}</small>
        </>
      ) : (
        <small>Nothing released yet</small>
      )}
    </div>
  );
}

export function IntroVisual({ mode }: { mode: Mode }) {
  return (
    <div className="stage">
      <span className="stage-caption">The story starts with one person</span>
      <span className="stage-serial">A—01</span>
      <Person mode={mode} />
      <div className="connector" aria-hidden="true" />
      <CharterVisual mode={mode} />
    </div>
  );
}

export function SystemMap({
  mode,
  includeEth = false,
}: {
  mode: Mode;
  includeEth?: boolean;
}) {
  return (
    <div className="whole-map">
      <div className="map-node">
        <ScrollText size={16} aria-hidden="true" />
        {t.charter[mode]}
      </div>
      <ArrowDown className="map-arrow" size={16} aria-hidden="true" />
      <div className="map-node">
        <GitBranch size={16} aria-hidden="true" />
        {t.branch[mode]}
      </div>
      <ArrowDown className="map-arrow" size={16} aria-hidden="true" />
      <div className="map-node">
        <StandardToken />
        STANDARD accumulates inside
      </div>
      {includeEth && (
        <div className="diagram-caption">
          ETH net flow →{' '}
          {mode === 'simple' ? 'new STANDARD distribution' : 'issuance policy'}
        </div>
      )}
      <div className="map-fork">
        <div className="map-lane">
          <ArrowDown className="map-arrow" size={18} aria-hidden="true" />
          <small>Choose to grow</small>
          <div className="map-node burn-node">
            <Flame size={17} aria-hidden="true" />
            {mode === 'simple'
              ? 'Spend STANDARD; remove it permanently'
              : 'Buy a license; burn STANDARD'}
          </div>
          <ArrowDown className="map-arrow" size={16} aria-hidden="true" />
          <div className="map-ending">
            {mode === 'simple'
              ? 'More capacity for future distribution'
              : 'Add a Branch for future issuance'}
          </div>
        </div>
        <div className="map-lane">
          <ArrowDown className="map-arrow" size={18} aria-hidden="true" />
          <small>Choose liquidity</small>
          <div className="map-node">
            <CircleMinus size={17} aria-hidden="true" />
            {mode === 'simple' ? 'Close a capacity unit' : 'Close a Branch'}
          </div>
          <ArrowDown className="map-arrow" size={16} aria-hidden="true" />
          <div className="map-node">{t.fee[mode]}</div>
          <small>½ {t.burn[mode].toLowerCase()} · ½ to those who stay</small>
          <div className="map-ending">
            Net STANDARD → wallet
            <br />
            Less future capacity
          </div>
        </div>
      </div>
    </div>
  );
}

function Accumulation({ mode }: { mode: Mode }) {
  const [accrued, setAccrued] = useState(false);
  return (
    <>
      <div className="flow-row">
        <div className="protocol-boundary">
          <span className="boundary-label">Inside the protocol</span>
          <div className="flow-box">
            <GitBranch size={22} aria-hidden="true" />
            <span>{t.balance[mode]}</span>
            <div className="token-row">
              {accrued ? (
                [0, 1, 2, 3].map((i) => (
                  <StandardToken key={i} animate delay={i * 150} />
                ))
              ) : (
                <small>Time starts passing…</small>
              )}
            </div>
          </div>
        </div>
        <LockKeyhole
          size={19}
          className="flow-arrow"
          aria-label="Held inside the protocol"
        />
        <WalletVisual mode={mode} />
      </div>
      <output className="stage-note" aria-live="polite">
        {accrued
          ? 'The internal balance grows. The wallet stays unchanged.'
          : 'New STANDARD is allocated to Alex’s internal balance.'}
      </output>
      <div className="action-row">
        <button className="action-button" onClick={() => setAccrued(!accrued)}>
          {accrued ? (
            <RotateCcw size={14} aria-hidden="true" />
          ) : (
            <Plus size={14} aria-hidden="true" />
          )}
          {accrued ? 'Replay accumulation' : 'Watch it accumulate'}
        </button>
      </div>
    </>
  );
}

function Expansion({ mode }: { mode: Mode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="growth-flow">
        <div className="flow-box">
          <span>{t.balance[mode]}</span>
          <div className={`token-row ${expanded ? 'burned' : ''}`}>
            <StandardToken />
            <StandardToken />
            <StandardToken />
          </div>
          <small>
            {expanded ? 'STANDARD spent' : 'STANDARD available inside'}
          </small>
        </div>
        <ArrowRight className="flow-arrow" size={18} aria-hidden="true" />
        <div className="flow-box burn-box">
          <Flame size={25} strokeWidth={1.3} aria-hidden="true" />
          <span>{t.burn[mode]}</span>
          <small>Expansion license payment</small>
        </div>
      </div>
      <div className="connector" aria-hidden="true" />
      <div className="branch-group">
        <BranchVisual mode={mode} />
        {expanded && (
          <div className="branch-reveal" style={{ animationDelay: '600ms' }}>
            <BranchVisual mode={mode} index={2} />
          </div>
        )}
      </div>
      <output className="stage-note" aria-live="polite">
        {expanded
          ? mode === 'simple'
            ? 'One capacity unit becomes two. The STANDARD payment is gone.'
            : 'One Branch becomes two. The STANDARD payment is burned.'
          : mode === 'simple'
            ? 'The payment is permanently removed. No token amount is assumed.'
            : 'The payment is fully burned. No token amount is assumed.'}
      </output>
      <div className="action-row">
        <button
          className="action-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <RotateCcw size={14} aria-hidden="true" />
          ) : (
            <Plus size={14} aria-hidden="true" />
          )}
          {expanded
            ? 'Replay expansion'
            : mode === 'simple'
              ? 'Add more capacity'
              : 'Add a Branch'}
        </button>
      </div>
    </>
  );
}

function Closure({ mode }: { mode: Mode }) {
  const [closed, setClosed] = useState(false);
  return (
    <>
      <CharterVisual mode={mode} compact />
      <div className="connector" aria-hidden="true" />
      <div className="branch-group">
        <BranchVisual mode={mode} />
        <BranchVisual mode={mode} index={2} closed={closed} />
      </div>
      <div className="held-line">
        <ArrowDown size={17} aria-hidden="true" />
        {closed
          ? '½ of the current internal balance is released'
          : mode === 'simple'
            ? 'Two active units share one internal balance'
            : 'Two active Branches share one Charter balance'}
      </div>
      {closed ? (
        <div className="flow-row scene-entrance">
          <div className="flow-box">
            <span>Released balance</span>
            <small>Minus the {t.fee[mode].toLowerCase()}</small>
          </div>
          <ArrowRight className="flow-arrow" size={18} aria-hidden="true" />
          <WalletVisual mode={mode} released />
        </div>
      ) : (
        <div className="flow-box wallet-box">
          <Wallet size={20} aria-hidden="true" />
          <span>Alex’s wallet</span>
          <small>Nothing released yet</small>
        </div>
      )}
      <output className="stage-note" aria-live="polite">
        {closed
          ? 'One stays active. One is permanently closed.'
          : mode === 'simple'
            ? 'Alex chooses to give up one of his two capacity units.'
            : 'Alex chooses to retire one of his two Branches.'}
      </output>
      <div className="action-row">
        <button className="action-button" onClick={() => setClosed(!closed)}>
          {closed ? (
            <RotateCcw size={14} aria-hidden="true" />
          ) : (
            <CircleMinus size={14} aria-hidden="true" />
          )}
          {closed
            ? 'Replay closure'
            : mode === 'simple'
              ? 'Close one capacity unit'
              : 'Close one Branch'}
        </button>
      </div>
    </>
  );
}

export function ResolutionSplit({ mode }: { mode: Mode }) {
  return (
    <div className="split-root">
      <div className="fee-center">{t.fee[mode]}</div>
      <div className="split-lines" aria-hidden="true" />
      <div className="split-ends">
        <div className="flow-box burn-box">
          <Flame size={21} aria-hidden="true" />
          <strong>50% of the fee</strong>
          <span>{t.burn[mode]}</span>
        </div>
        <div className="flow-box">
          <UsersRound size={21} aria-hidden="true" />
          <strong>50% of the fee</strong>
          <span>{t.remaining[mode]}</span>
        </div>
      </div>
    </div>
  );
}

function Fee({
  mode,
  onSource,
}: {
  mode: Mode;
  onSource: (id: string) => void;
}) {
  const [pressure, setPressure] = useState<Pressure>('low');
  const lit = { low: 2, medium: 4, high: 6 }[pressure];
  return (
    <>
      <div className="diagram-caption">
        Recent system-wide withdrawal pressure
      </div>
      <RadioGroup
        aria-label="Conceptual exit pressure"
        value={pressure}
        onValueChange={(value) => setPressure(value as Pressure)}
        className="pressure-control"
      >
        {(['low', 'medium', 'high'] as const).map((value) => (
          <label
            key={value}
            className={`pressure-option ${value === pressure ? 'selected' : ''}`}
          >
            <RadioGroupItem
              value={value}
              aria-label={`${value[0].toUpperCase() + value.slice(1)} exit pressure`}
            />
            <span>{value[0].toUpperCase() + value.slice(1)}</span>
          </label>
        ))}
      </RadioGroup>
      <div className="pressure-meter" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ArrowUpRight
            size={22}
            key={i}
            className={`pressure-person ${i < lit ? 'lit' : ''}`}
          />
        ))}
      </div>
      <output className="pressure-explanation" aria-live="polite">
        {pressureCopy[pressure][mode]}
      </output>
      <ResolutionSplit mode={mode} />
      <div className="diagram-caption">
        The split stays equal as the fee changes.{' '}
        <SourceLink claimId="split" onOpen={onSource} />
      </div>
      <div className="stage-note">
        Conceptual pressure, not a calculated fee rate.
      </div>
    </>
  );
}

export function SceneVisual({
  scene,
  mode,
  onSource,
}: {
  scene: number;
  mode: Mode;
  onSource: (id: string) => void;
}) {
  return (
    <figure className="m-0" aria-label={chapters[scene].visualDescription}>
      <div className="stage">
        <span className="stage-caption">Alex’s story</span>
        <span className="stage-serial">0{scene + 1} / 07</span>
        {scene === 0 && (
          <>
            <Person mode={mode} />
            <div className="connector" aria-hidden="true" />
            <CharterVisual mode={mode} />
          </>
        )}
        {scene === 1 && (
          <>
            <CharterVisual mode={mode} compact />
            <div className="connector" aria-hidden="true" />
            <BranchVisual mode={mode} />
            <div className="stage-note">
              Each active {t.branch[mode].toLowerCase()} shares in{' '}
              {t.issuance[mode].toLowerCase()}.
            </div>
            <div className="held-line">
              <UsersRound size={20} aria-hidden="true" />
              Other people have active capacity too.
            </div>
          </>
        )}
        {scene === 2 && <Accumulation mode={mode} />}
        {scene === 3 && <Expansion mode={mode} />}
        {scene === 4 && <Closure mode={mode} />}
        {scene === 5 && <Fee mode={mode} onSource={onSource} />}
        {scene === 6 && <SystemMap mode={mode} />}
      </div>
      <figcaption className="diagram-caption">
        {scene === 0
          ? 'Alex is fictional. The mechanics come from the published design.'
          : scene === 6
            ? 'The connections you have learned, in one view.'
            : 'Illustrative only. Symbols show a mechanism, not token amounts.'}
      </figcaption>
    </figure>
  );
}
