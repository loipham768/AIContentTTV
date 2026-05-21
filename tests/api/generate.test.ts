import { describe, it, expect, vi, beforeEach } from 'vitest'

// ---------------------------------------------------------------------------
// Hoisted mocks — must be created with vi.hoisted() so references are
// available inside vi.mock() factories (Vitest hoists vi.mock() calls)
// ---------------------------------------------------------------------------
const mockAuth = vi.hoisted(() => vi.fn())
const mockDbConnect = vi.hoisted(() => vi.fn())
const mockRateLimitFindOne = vi.hoisted(() => vi.fn())
const mockRateLimitFindOneAndUpdate = vi.hoisted(() => vi.fn())
const mockGenerateBlock = vi.hoisted(() => vi.fn())

vi.mock('@/auth', () => ({
  auth: mockAuth,
}))

vi.mock('@/lib/mongodb', () => ({
  dbConnect: mockDbConnect,
}))

// RateLimit mock — findOne returns a chainable object with .lean()
vi.mock('@/models/RateLimit', () => ({
  default: {
    findOne: (...args: unknown[]) => ({
      lean: () => mockRateLimitFindOne(...args),
    }),
    findOneAndUpdate: mockRateLimitFindOneAndUpdate,
  },
}))

vi.mock('@/lib/ai/generate-block', () => ({
  generateBlock: mockGenerateBlock,
}))

// Import AFTER mocks are set up
import { POST } from '@/app/api/generate/route'

// ---------------------------------------------------------------------------
// Helper to build a fake NextRequest
// ---------------------------------------------------------------------------
function makeRequest(body: unknown) {
  return new Request('http://localhost/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const MOCK_SESSION = { user: { id: 'user-123', email: 'test@test.vn' } }

const MOCK_BLOCK = {
  assets: [],
  styles: [],
  pages: [
    {
      frames: [
        {
          component: {
            type: 'wrapper',
            components: [
              {
                tagName: 'section',
                components: [
                  { tagName: 'h2', content: 'Tiêu đề' },
                  { tagName: 'p', content: 'Mô tả' },
                  { tagName: 'button', content: 'Nhấn vào đây' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Reset mocks before each test
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks()
  mockDbConnect.mockResolvedValue(undefined)
})

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe('POST /api/generate', () => {
  // -------------------------------------------------------------------------
  // Auth checks
  // -------------------------------------------------------------------------
  it('returns 401 when no session', async () => {
    mockAuth.mockResolvedValue(null)

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo' })
    const res = await POST(req as any)

    expect(res.status).toBe(401)
    const data = await res.json()
    expect(data.error).toBe('Unauthorized')
    // DB should NOT be called — auth check must be first
    expect(mockDbConnect).not.toHaveBeenCalled()
  })

  it('returns 401 when session has no user id', async () => {
    mockAuth.mockResolvedValue({ user: {} })

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo' })
    const res = await POST(req as any)

    expect(res.status).toBe(401)
    expect(mockDbConnect).not.toHaveBeenCalled()
  })

  // -------------------------------------------------------------------------
  // Input validation
  // -------------------------------------------------------------------------
  it('returns 400 for empty prompt', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)

    const req = makeRequest({ prompt: '' })
    const res = await POST(req as any)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeTruthy()
  })

  it('returns 400 for prompt longer than 500 chars', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)

    const longPrompt = 'a'.repeat(501)
    const req = makeRequest({ prompt: longPrompt })
    const res = await POST(req as any)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeTruthy()
  })

  it('returns 400 for missing prompt field', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)

    const req = makeRequest({})
    const res = await POST(req as any)

    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid JSON body', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)

    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json{{{',
    })
    const res = await POST(req as any)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeTruthy()
  })

  // -------------------------------------------------------------------------
  // Rate limiting
  // -------------------------------------------------------------------------
  it('returns 429 with Vietnamese message when rate limit doc exists', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue({ userId: 'user-123', createdAt: new Date() })

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo' })
    const res = await POST(req as any)

    expect(res.status).toBe(429)
    const data = await res.json()
    expect(data.error).toBe('Vui lòng đợi vài giây trước khi tạo nội dung mới.')
    // generateBlock must NOT be called when rate limited
    expect(mockGenerateBlock).not.toHaveBeenCalled()
  })

  // -------------------------------------------------------------------------
  // Successful generation
  // -------------------------------------------------------------------------
  it('returns 200 with { block } on valid authenticated request', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)
    mockGenerateBlock.mockResolvedValue(MOCK_BLOCK)
    mockRateLimitFindOneAndUpdate.mockResolvedValue({})

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo sản phẩm' })
    const res = await POST(req as any)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.block).toEqual(MOCK_BLOCK)
    // RateLimit doc must be upserted after success
    expect(mockRateLimitFindOneAndUpdate).toHaveBeenCalledWith(
      { userId: 'user-123' },
      { $set: { createdAt: expect.any(Date) } },
      { upsert: true, new: true }
    )
  })

  it('calls generateBlock with the validated prompt string', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)
    mockGenerateBlock.mockResolvedValue(MOCK_BLOCK)
    mockRateLimitFindOneAndUpdate.mockResolvedValue({})

    const req = makeRequest({ prompt: 'Banner cho sản phẩm cà phê Việt Nam' })
    await POST(req as any)

    expect(mockGenerateBlock).toHaveBeenCalledWith('Banner cho sản phẩm cà phê Việt Nam')
  })

  // -------------------------------------------------------------------------
  // Error handling — generateBlock throws
  // -------------------------------------------------------------------------
  it('returns 500 with Vietnamese message when generateBlock throws', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)
    mockGenerateBlock.mockRejectedValue(new Error('Anthropic API error'))

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo' })
    const res = await POST(req as any)

    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.error).toBe('Đã xảy ra lỗi. Vui lòng thử lại.')
  })

  it('does NOT upsert rate limit doc when generateBlock throws', async () => {
    mockAuth.mockResolvedValue(MOCK_SESSION)
    mockRateLimitFindOne.mockResolvedValue(null)
    mockGenerateBlock.mockRejectedValue(new Error('Network error'))

    const req = makeRequest({ prompt: 'Tạo một banner quảng cáo' })
    await POST(req as any)

    // User must be able to retry immediately after server error
    expect(mockRateLimitFindOneAndUpdate).not.toHaveBeenCalled()
  })
})
