import { ImageResponse } from 'next/og';

export const alt =
  'LUDUS. An interactive way to understand Standard Reserve. An unofficial educational project. Built by Torvian.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        background: '#111410',
        color: '#eeeee7',
        padding: '64px 72px',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 24 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #667459',
            width: 48,
            height: 52,
            color: '#c4da9e',
            fontSize: 36,
          }}
        >
          L.
        </div>
        LUDUS
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 76,
          lineHeight: 1.12,
          letterSpacing: '-3px',
        }}
      >
        <span>An interactive way to</span>
        <span style={{ color: '#c4da9e' }}>understand Standard Reserve.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #333b2e',
          paddingTop: 24,
          color: '#a5ad9e',
          fontSize: 20,
        }}
      >
        <span>An unofficial educational project.</span>
        <span>Built by Torvian.</span>
      </div>
    </div>,
    size,
  );
}
