import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #08061a 0%, #170c38 100%)',
          borderRadius: 8,
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#a78bfa',
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'sans-serif',
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  )
}
