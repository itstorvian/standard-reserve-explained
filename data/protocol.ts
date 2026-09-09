import type { Chapter, Claim, Mode, Pressure } from '@/types/protocol';

export const reviewedOn = 'September 9, 2026';
export const whitepaperUrl = 'https://www.standardreserve.xyz/whitepaper/';
const source = 'Standard Reserve · Whitepaper V0.1';
const claim = (
  value: Omit<Claim, 'source' | 'sourceUrl'> & { section: string },
): Claim => {
  const { section, ...rest } = value;
  return { ...rest, source, sourceUrl: `${whitepaperUrl}#${section}` };
};

export const claims: Record<string, Claim> = {
  charter: claim({
    id: 'charter',
    section: 'charters',
    status: 'DOCUMENTED',
    simpleTitle: 'Meet Alex. He has a way in.',
    protocolTitle: 'Meet Alex. He holds a Charter.',
    simpleDescription:
      'Alex has received a participation license. It gives him a place in Standard Reserve and the ability to take part in new STANDARD distribution.',
    protocolDescription:
      'Alex has received a Charter. He is now a Banker: a participant whose Charter lets him take part in STANDARD issuance.',
    sourceTopic: 'Charters · participation rights',
    confirms:
      'A Charter is an initially soulbound NFT that grants issuance participation. Alex and his receipt of a Charter are fictional; this story makes no promise of eligibility or allocation.',
  }),
  first: claim({
    id: 'first',
    section: 'branches',
    status: 'DOCUMENTED',
    simpleTitle: 'One license. One starting unit.',
    protocolTitle: 'One Charter. One starting Branch.',
    simpleDescription:
      'Every participation license starts with one unit of issuance capacity. That is Alex’s starting point in this story.',
    protocolDescription:
      'Every Charter starts with one Branch. Branches represent participation in STANDARD issuance, not physical bank offices.',
    sourceTopic: 'Branches · starting capacity',
    confirms:
      'Every Charter begins with one Branch. Additional Branches are acquired through expansion licenses. The diagram shows participation capacity, not a separate wallet or physical branch.',
  }),
  share: claim({
    id: 'share',
    section: 'entities',
    status: 'DOCUMENTED',
    simpleTitle: 'A small part of something shared.',
    protocolTitle: 'One Branch. A relative issuance share.',
    simpleDescription:
      'Alex starts with one unit of issuance capacity. Each active unit receives an equal share of new STANDARD being distributed across the system.',
    protocolDescription:
      'Alex starts with one Branch. Each active Branch receives an equal, pro-rata share of STANDARD issuance across the system.',
    sourceTopic: 'Entities · pro-rata issuance',
    confirms:
      'A Charter’s relative issuance share is its active Branch count divided by the total active Branches. The issuance rate also affects how much STANDARD accrues; this does not imply a fixed yield.',
  }),
  relative: claim({
    id: 'relative',
    section: 'entities',
    status: 'DOCUMENTED',
    simpleTitle: 'A share, not a fixed return.',
    protocolTitle: 'Relative capacity, not a fixed return.',
    simpleDescription:
      'If other people add capacity, Alex’s slice becomes smaller unless he adds capacity too. There is no fixed return in this story.',
    protocolDescription:
      'If the system adds Branches while Alex’s count stays the same, his relative issuance share falls. A Branch does not promise a fixed return.',
    sourceTopic: 'Entities · relative share',
    confirms:
      'Pro-rata allocation depends on system-wide active Branches. Holding the same Branch count does not guarantee an unchanged issuance share or an unchanged amount of STANDARD.',
  }),
  accrual: claim({
    id: 'accrual',
    section: 'currency',
    status: 'DOCUMENTED',
    simpleTitle: 'It adds up. Inside the system.',
    protocolTitle: 'STANDARD accrues in his Charter.',
    simpleDescription:
      'As time passes, Alex’s allocated STANDARD accumulates in an internal balance. It does not simply arrive as spendable tokens in his wallet.',
    protocolDescription:
      'STANDARD issuance accrues in Alex’s Charter ledger balance. Accrual is internal accounting; transferable tokens are minted on withdrawal.',
    sourceTopic: 'STANDARD token · accrual and minting',
    confirms:
      'Issuance is tracked as a Charter ledger entry. Actual withdrawal mints transferable tokens; a separate genesis premint is outside Alex’s story. Token symbols here illustrate movement, not quantities or timing.',
  }),
  stored: claim({
    id: 'stored',
    section: 'exits',
    status: 'DOCUMENTED',
    simpleTitle: 'Accumulated does not mean withdrawable for free.',
    protocolTitle: 'A ledger balance is not a wallet balance.',
    simpleDescription:
      'To release part of this balance to his wallet, Alex will have to retire some capacity and pay an exit fee. We will get to that.',
    protocolDescription:
      'Realizing a share of his accrued balance requires closing Branches and paying the Resolution Fee. We will get to that.',
    sourceTopic: 'Withdrawals & Resolution Fee · realization',
    confirms:
      'Withdrawing requires retiring Branches. A proportional share of the ledger balance is released and the Resolution Fee applies. The diagram does not show a free claim action.',
  }),
  expansion: claim({
    id: 'expansion',
    section: 'auctions',
    status: 'DOCUMENTED',
    simpleTitle: 'More capacity means giving up STANDARD.',
    protocolTitle: 'Alex burns STANDARD to add a Branch.',
    simpleDescription:
      'Alex wants more issuance capacity. He uses accumulated STANDARD to buy an expansion license. The payment is permanently removed, and another unit of capacity is added.',
    protocolDescription:
      'Alex uses accrued STANDARD to buy an expansion license through a Dutch auction. The payment is fully burned, adding another Branch to his Charter.',
    sourceTopic: 'License auctions · expansion and burn',
    confirms:
      'Expansion licenses are bought with STANDARD through daily Dutch auctions, and the payment is 100% burned. The official overview also describes using internally issued STANDARD to purchase licenses. The story omits auction timing and price mechanics.',
  }),
  parameters: claim({
    id: 'parameters',
    section: 'branches',
    status: 'NOT PUBLIC',
    simpleTitle: 'No made-up price tag.',
    protocolTitle: 'No assumed auction parameters.',
    simpleDescription:
      'Exact launch parameter not publicly disclosed. The license cost depends on the auction; no token amount is assumed here.',
    protocolDescription:
      'Exact launch parameter not publicly disclosed. Published auction tables contain redacted settings, so this story assigns no numeric expansion cost.',
    sourceTopic: 'License auctions · redacted launch settings',
    confirms:
      'Whitepaper V0.1 redacts auction settings until launch, and a Dutch auction has a changing price rather than one universal expansion cost. Preliminary numeric examples are not used as final launch parameters.',
  }),
  closure: claim({
    id: 'closure',
    section: 'exits',
    status: 'DOCUMENTED',
    simpleTitle: 'Alex wants some STANDARD in his wallet.',
    protocolTitle: 'Alex closes a Branch to realize STANDARD.',
    simpleDescription:
      'Alex now has two units of capacity. Closing one releases half of his current internal balance, before the exit fee. That unit stops receiving new STANDARD.',
    protocolDescription:
      'Alex now has two Branches. Retiring one releases half of his Charter’s current accrued balance, before the Resolution Fee. That Branch permanently stops earning issuance.',
    sourceTopic: 'Withdrawals & Resolution Fee · proportional retirement',
    confirms:
      'Retiring r out of b Branches releases r/b of the current Charter balance before the fee. Alex’s one-of-two example therefore releases half. Accrual lives in the Charter ledger, not a separate balance independently owned by each Branch.',
  }),
  tradeoff: claim({
    id: 'tradeoff',
    section: 'exits',
    status: 'DOCUMENTED',
    simpleTitle: 'Liquidity now. Less capacity later.',
    protocolTitle: 'Realization reduces future issuance capacity.',
    simpleDescription:
      'Alex cannot take the whole balance while keeping the same capacity active. Closing his last unit would also end his participation license.',
    protocolDescription:
      'Alex cannot withdraw the entire balance while retaining the same active Branches. Closing his final Branch would also burn his Charter.',
    sourceTopic: 'Withdrawals · permanent retirement',
    confirms:
      'Retired Branches permanently leave the issuance set. Retiring all Branches releases the remaining balance before fees and burns the Charter NFT. If Alex retains a Branch, growing again requires another expansion license. After his final Branch closes, re-entry requires a new Charter.',
  }),
  fee: claim({
    id: 'fee',
    section: 'exits',
    status: 'DOCUMENTED',
    simpleTitle: 'The exit fee moves with the crowd.',
    protocolTitle: 'The Resolution Fee responds to exit pressure.',
    simpleDescription:
      'The exit fee responds to system-wide withdrawals over the past seven days. As recent exit pressure rises, a larger share of the released balance goes to the fee.',
    protocolDescription:
      'The Resolution Fee rises with trailing seven-day, system-wide withdrawal pressure. Its curve is quadratic, and Alex’s rate locks when he commits to the withdrawal.',
    sourceTopic: 'Withdrawals & Resolution Fee · dynamic pressure',
    confirms:
      'Withdrawal pressure is based on aggregate trailing seven-day withdrawals relative to withdrawn plus remaining balances. It measures amounts, not just the number of people. The curve, rate lock, and fee split are described, but bounds and thresholds are redacted.',
  }),
  split: claim({
    id: 'split',
    section: 'exits',
    status: 'DOCUMENTED',
    simpleTitle: 'Where the exit fee goes.',
    protocolTitle: 'How the Resolution Fee is split.',
    simpleDescription:
      'Half of the fee is permanently removed from supply. Half is allocated to participants who remain. Alex receives the released balance minus this fee.',
    protocolDescription:
      '50% of the Resolution Fee is burned and 50% goes to remaining Bankers. Alex receives his released balance net of the fee.',
    sourceTopic: 'Withdrawals & Resolution Fee · 50/50 allocation',
    confirms:
      'Whitepaper V0.1 allocates 50% of the Resolution Fee to burning and 50% to remaining Bankers. These percentages describe the fee, not the gross withdrawal. Allocation does not imply an immediate wallet payout to remaining Bankers.',
  }),
  intent: claim({
    id: 'intent',
    section: 'exits',
    status: 'DESIGN INTENT',
    simpleTitle: 'An incentive, not a guarantee.',
    protocolTitle: 'Exit incentives are a design choice.',
    simpleDescription:
      'The mechanism is designed to change the incentives around exiting. It does not establish that a market crisis would be prevented.',
    protocolDescription:
      'The Resolution Fee is intended to change exit incentives. Its specified behavior is not evidence that it prevents bank runs or market losses.',
    sourceTopic: 'Withdrawals & Resolution Fee · incentive design',
    confirms:
      'The whitepaper describes an exit-incentive mechanism. A design specification does not demonstrate safe outcomes, rational behavior, price stability, or resilience during a prolonged market crisis.',
  }),
  unproven: {
    id: 'unproven',
    status: 'UNPROVEN IN LIVE MARKET',
    simpleTitle: 'A design still to be tested.',
    protocolTitle: 'A design still to be tested.',
    simpleDescription:
      'This has not yet been proven through a prolonged real-world market crisis.',
    protocolDescription:
      'This has not yet been proven through a prolonged real-world market crisis.',
    source: 'Standard Reserve · Official mint page',
    sourceUrl: 'https://www.standardreserve.xyz/app/mint/',
    sourceTopic: 'Mint status · prelaunch at source review',
    confirms:
      'At the September 9, 2026 review, the official mint page states that the mint is not live yet. No prolonged live-market track record is established by the reviewed sources. This is a dated evidence assessment, not a claim that the project can never launch.',
  },
  system: claim({
    id: 'system',
    section: 'entities',
    status: 'DOCUMENTED',
    simpleTitle: 'Now the pieces fit together.',
    protocolTitle: 'One Charter. A connected system.',
    simpleDescription:
      'Standard Reserve connects new STANDARD distribution, growth, exits, and permanent token removal. Alex can expand his capacity or give some up to receive liquid STANDARD. His choices also affect the people who remain.',
    protocolDescription:
      'Standard Reserve connects issuance, expansion, Branch retirement, burns, and Banker incentives. Alex can burn STANDARD to expand or close Branches to realize a share of his balance after the Resolution Fee.',
    sourceTopic: 'Entities; Branches; Withdrawals · story synthesis',
    confirms:
      'This map combines the previously introduced mechanisms in the Entities, Branches, License auctions, and Withdrawals sections. It is a deliberately limited view of Alex’s participation, not a full model of the protocol economy.',
  }),
  eth: claim({
    id: 'eth',
    section: 'net-flow',
    status: 'DOCUMENTED',
    simpleTitle: 'One more connection: ETH flow.',
    protocolTitle: 'ETH net flow also informs issuance policy.',
    simpleDescription:
      'Across the wider system, ETH flowing into and out of STANDARD trades informs how much new STANDARD is distributed. That is separate from Alex’s exit fee.',
    protocolDescription:
      'Net ETH flow in the canonical ETH/STANDARD pool feeds issuance policy using the previous two completed epochs. This is separate from the Resolution Fee’s withdrawal-pressure measure.',
    sourceTopic: 'Net flow; Policy · ETH and issuance',
    confirms:
      'Net flow is gross ETH buys minus gross ETH sells in the canonical pool. Issuance policy uses the trailing two completed epochs. Current-epoch flow separately affects protocol fee routing. Neither ETH price nor token price is specified in this story.',
  }),
};

export const chapters: Chapter[] = [
  {
    id: 'meet-alex',
    simpleLabel: 'Meet Alex',
    protocolLabel: 'Meet Alex',
    claimId: 'charter',
    noteId: 'first',
    visualDescription:
      'Alex receives a participation license. The person and license are connected.',
  },
  {
    id: 'first-branch',
    simpleLabel: 'A place in the system',
    protocolLabel: 'His first Branch',
    claimId: 'share',
    noteId: 'relative',
    visualDescription:
      'Alex’s license connects to one active unit of issuance capacity. Other participants have capacity too.',
  },
  {
    id: 'accumulation',
    simpleLabel: 'STANDARD adds up',
    protocolLabel: 'STANDARD accrues',
    claimId: 'accrual',
    noteId: 'stored',
    visualDescription:
      'STANDARD accumulates inside the protocol boundary. Alex’s wallet remains outside, with nothing released yet.',
  },
  {
    id: 'expansion',
    simpleLabel: 'Room to grow',
    protocolLabel: 'Charter expansion',
    claimId: 'expansion',
    noteId: 'parameters',
    visualDescription:
      'Accumulated STANDARD pays for an expansion license and is burned. Alex’s capacity grows from one Branch to two.',
  },
  {
    id: 'liquidity',
    simpleLabel: 'Time to take some out',
    protocolLabel: 'Branch closure',
    claimId: 'closure',
    noteId: 'tradeoff',
    visualDescription:
      'One of Alex’s two Branches closes. Half the current Charter balance is released before the fee; the other Branch stays active.',
  },
  {
    id: 'exit-fee',
    simpleLabel: 'The exit fee',
    protocolLabel: 'The Resolution Fee',
    claimId: 'fee',
    noteId: 'intent',
    visualDescription:
      'Higher recent withdrawal pressure raises the Resolution Fee. The fee splits equally between burning and remaining Bankers.',
  },
  {
    id: 'bigger-picture',
    simpleLabel: 'The bigger picture',
    protocolLabel: 'The bigger picture',
    claimId: 'system',
    noteId: 'eth',
    visualDescription:
      'Alex’s Charter leads to Branch capacity and accrued STANDARD, then forks into burning to expand or closing a Branch to withdraw after the fee.',
  },
];

export const terminology = {
  charter: { simple: 'Participation license', protocol: 'Charter' },
  banker: { simple: 'Participant', protocol: 'Banker' },
  branch: { simple: 'Capacity unit', protocol: 'Branch' },
  balance: { simple: 'Internal balance', protocol: 'Charter ledger balance' },
  issuance: { simple: 'New STANDARD', protocol: 'STANDARD issuance' },
  fee: { simple: 'Exit fee', protocol: 'Resolution Fee' },
  burn: { simple: 'Permanently removed', protocol: 'Burned' },
  remaining: { simple: 'Participants who stay', protocol: 'Remaining Bankers' },
} satisfies Record<string, Record<Mode, string>>;

export const pressureCopy: Record<Pressure, Record<Mode, string>> = {
  low: {
    simple: 'Less recent withdrawal pressure. A lower exit fee.',
    protocol: 'Lower recent withdrawal pressure. A lower Resolution Fee.',
  },
  medium: {
    simple: 'More recent withdrawal pressure. A higher exit fee.',
    protocol: 'More recent withdrawal pressure. A higher Resolution Fee.',
  },
  high: {
    simple: 'High recent withdrawal pressure. A higher exit fee still.',
    protocol: 'High recent withdrawal pressure. A higher Resolution Fee still.',
  },
};

export const excludedParameters = [
  'Token price, APR, yield, and expected returns',
  'Base issuance, multiplier limits, and epoch duration',
  'Resolution Fee bounds and pressure thresholds',
  'Exact expansion cost and final auction settings',
  'ETH amounts, market forecasts, and launch dates',
];
