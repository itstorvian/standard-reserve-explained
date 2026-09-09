export type Mode = 'simple' | 'protocol';
export type ClaimStatus =
  | 'DOCUMENTED'
  | 'DESIGN INTENT'
  | 'NOT PUBLIC'
  | 'UNPROVEN IN LIVE MARKET';
export type Pressure = 'low' | 'medium' | 'high';
export interface Claim {
  id: string;
  simpleTitle: string;
  protocolTitle: string;
  simpleDescription: string;
  protocolDescription: string;
  status: ClaimStatus;
  source: string;
  sourceUrl: string;
  sourceTopic: string;
  confirms: string;
}
export interface Chapter {
  id: string;
  simpleLabel: string;
  protocolLabel: string;
  claimId: string;
  noteId: string;
  visualDescription: string;
}
