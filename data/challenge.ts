import type { ChallengeQuestion } from '@/types/challenge';

const whitepaper = 'https://www.standardreserve.xyz/whitepaper/';

export const challengeQuestions: ChallengeQuestion[] = [
  {
    id: 'charter-entry',
    type: 'scenario',
    scenario: 'Alex wants to take part in the system for the first time.',
    prompt: 'What does he receive to begin participation?',
    answers: [
      { id: 'charter', text: 'A Charter' },
      { id: 'branch', text: 'A Branch' },
      { id: 'fee', text: 'A Resolution Fee' },
    ],
    correctAnswer: 'charter',
    explanation:
      'A Charter is the participation license that connects a Banker to the protocol. Branches are the capacity units held through that Charter.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#charters`,
    sourceTopic: 'Charters · participation and lifecycle',
    alexReaction:
      'Alex is entering through a participation license, before he has any Branch capacity.',
  },
  {
    id: 'relative-share',
    type: 'scenario',
    scenario:
      'Alex has one active Branch. Other people add Branches while his count stays the same.',
    prompt: 'What happens to Alex’s relative share of new STANDARD issuance?',
    answers: [
      { id: 'falls', text: 'It falls as the system-wide total grows' },
      { id: 'fixed', text: 'It stays fixed by his original entry' },
      { id: 'doubles', text: 'It doubles automatically' },
    ],
    correctAnswer: 'falls',
    explanation:
      'Issuance is allocated pro rata across active Branches. If the total grows and Alex does not add capacity, his slice becomes smaller.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#entities`,
    sourceTopic: 'Entities · relative issuance share',
    alexReaction:
      'Alex keeps his Branch, but his relative place in the issuance set changes as the wider system grows.',
  },
  {
    id: 'internal-accrual',
    type: 'concept',
    prompt: 'Where does newly allocated STANDARD accrue before Alex withdraws?',
    answers: [
      { id: 'ledger', text: 'In an internal Charter ledger balance' },
      { id: 'wallet', text: 'Directly as spendable wallet tokens' },
      { id: 'auction', text: 'Inside the next auction price' },
    ],
    correctAnswer: 'ledger',
    explanation:
      'The protocol tracks issuance as an internal ledger balance. Transferable STANDARD is minted when a withdrawal is made; the balance is not simply sent to Alex’s wallet as it accrues.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#currency`,
    sourceTopic: 'Currency · accrual and withdrawal minting',
    alexReaction:
      'Alex’s balance is being recorded inside the protocol. A wallet withdrawal is a separate action.',
  },
  {
    id: 'expansion-burn',
    type: 'scenario',
    scenario:
      'Alex wants another unit of issuance capacity and buys an expansion license.',
    prompt: 'What happens to the STANDARD used for that license?',
    answers: [
      { id: 'burned', text: 'It is permanently burned' },
      { id: 'held', text: 'It is held in Alex’s wallet' },
      { id: 'refunded', text: 'It is refunded after the Branch opens' },
    ],
    correctAnswer: 'burned',
    explanation:
      'The published design describes the expansion-license payment as fully burned. The added license creates another Branch; the story does not assign a numeric cost.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#branches`,
    sourceTopic: 'Branches · expansion licenses and burn',
    alexReaction:
      'Alex gets more capacity, while the STANDARD spent on the license leaves supply permanently.',
  },
  {
    id: 'auction-mechanism',
    type: 'concept',
    prompt: 'How does the published design describe expansion-license sales?',
    answers: [
      { id: 'dutch', text: 'Daily Dutch auctions' },
      { id: 'apr', text: 'A fixed APR schedule' },
      { id: 'banker', text: 'A direct payment to remaining Bankers' },
    ],
    correctAnswer: 'dutch',
    explanation:
      'Expansion licenses are described as daily Dutch auctions. The launch settings and exact price are not supplied here because the source leaves them undisclosed.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#auctions`,
    sourceTopic: 'Auctions · expansion-license mechanism',
    alexReaction:
      'The mechanism names the auction format, but it does not create a promised return or fixed price.',
  },
  {
    id: 'proportional-close',
    type: 'scenario',
    scenario:
      'Alex has two active Branches and closes one to realize part of his internal balance.',
    prompt:
      'How much of the current Charter balance is released before the fee?',
    answers: [
      { id: 'half', text: 'One half' },
      { id: 'all', text: 'All of it' },
      { id: 'none', text: 'None of it' },
    ],
    correctAnswer: 'half',
    explanation:
      'Retiring r out of b Branches releases r/b of the current Charter balance before the fee. With one of two Branches retired, that is one half.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#exits`,
    sourceTopic: 'Exits · proportional retirement',
    alexReaction:
      'Alex can take value out, but he gives up the matching share of future capacity.',
  },
  {
    id: 'final-branch',
    type: 'scenario',
    scenario: 'Alex closes his final active Branch.',
    prompt: 'What else happens to his participation license?',
    answers: [
      {
        id: 'burn-charter',
        text: 'The Charter is burned and participation ends',
      },
      { id: 'stays', text: 'The Charter stays active with no Branches' },
      { id: 'new-branch', text: 'A new Branch appears automatically' },
    ],
    correctAnswer: 'burn-charter',
    explanation:
      'Closing the final Branch releases the remaining balance before fees and burns the Charter. Re-entry later requires a new Charter.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#exits`,
    sourceTopic: 'Exits · final Branch and Charter lifecycle',
    alexReaction:
      'Alex has taken the final exit path. Returning later would mean beginning with a new Charter.',
  },
  {
    id: 'exit-pressure',
    type: 'scenario',
    scenario:
      'Withdrawals have been elevated across the system over the last week.',
    prompt: 'What does the Resolution Fee respond to?',
    answers: [
      {
        id: 'pressure',
        text: 'Aggregate trailing-seven-day withdrawal pressure',
      },
      { id: 'count', text: 'Only the number of people exiting today' },
      { id: 'price', text: 'A fixed token price' },
    ],
    correctAnswer: 'pressure',
    explanation:
      'The fee responds to aggregate trailing-seven-day withdrawals relative to withdrawn plus remaining balances. The published source does not disclose its exact bounds or thresholds.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#exits`,
    sourceTopic: 'Exits · Resolution Fee and withdrawal pressure',
    alexReaction:
      'This is where the Resolution Fee matters: the recent system-wide pressure affects Alex’s locked rate.',
  },
  {
    id: 'fee-split',
    type: 'scenario',
    scenario: 'Alex commits to a withdrawal and the Resolution Fee is applied.',
    prompt: 'How is the fee itself allocated?',
    answers: [
      { id: 'split', text: '50% is burned and 50% goes to remaining Bankers' },
      { id: 'all-burn', text: '100% is burned' },
      { id: 'all-remain', text: '100% goes to remaining Bankers' },
    ],
    correctAnswer: 'split',
    explanation:
      'The published design splits the Resolution Fee evenly: half is burned and half is allocated to remaining Bankers. This split applies to the fee, not the gross withdrawal.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#exits`,
    sourceTopic: 'Exits · Resolution Fee allocation',
    alexReaction:
      'Alex receives the released balance net of the fee; the fee’s two destinations affect supply and those who remain.',
  },
  {
    id: 'net-flow-policy',
    type: 'scenario',
    scenario: 'The wider system is measuring activity for issuance policy.',
    prompt: 'Which ETH signal is used in that policy?',
    answers: [
      {
        id: 'net-flow',
        text: 'Net ETH flow in the canonical ETH/STANDARD pool',
      },
      { id: 'exit-fee', text: 'Alex’s Resolution Fee alone' },
      { id: 'forecast', text: 'A forecast of the future token price' },
    ],
    correctAnswer: 'net-flow',
    explanation:
      'The published design uses net ETH flow in the canonical pool and looks back across the previous two completed epochs for issuance policy. That measure is separate from the exit-fee pressure calculation.',
    source: 'Standard Reserve · Whitepaper V0.1',
    sourceUrl: `${whitepaper}#net-flow`,
    sourceTopic: 'Net flow · ETH and issuance policy',
    alexReaction:
      'This wider-system signal is separate from Alex’s exit fee and does not tell us a future price or return.',
  },
];

export const challengeQuestionCount = challengeQuestions.length;
