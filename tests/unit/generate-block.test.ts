/**
 * TDD tests for lib/ai/generate-block.ts
 *
 * RED phase: tests written before implementation.
 * These tests cover:
 *   - GrapesBlockSchema validates MOCK_BLOCK correctly
 *   - generateBlock calls client.messages.parse with zodOutputFormat
 *   - generateBlock returns parsed_output on success
 *   - generateBlock propagates errors when parsed_output is null
 *   - generateBlock propagates errors thrown by client.messages.parse
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GrapesBlockSchema, generateBlock } from '@/lib/ai/generate-block'
import { MOCK_BLOCK } from '@/lib/mockBlock'

// Mock the entire @anthropic-ai/sdk module
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: {
        parse: vi.fn(),
      },
    })),
  }
})

// Mock zodOutputFormat helper
vi.mock('@anthropic-ai/sdk/helpers/zod', () => ({
  zodOutputFormat: vi.fn().mockReturnValue({ _type: 'zod-output-format' }),
}))

describe('GrapesBlockSchema', () => {
  it('validates MOCK_BLOCK shape correctly', () => {
    const result = GrapesBlockSchema.safeParse(MOCK_BLOCK)
    expect(result.success).toBe(true)
  })

  it('rejects object missing pages field', () => {
    const invalid = { assets: [], styles: [] }
    const result = GrapesBlockSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('rejects object with invalid styles field type', () => {
    const invalid = { ...MOCK_BLOCK, styles: 'not-an-array' }
    const result = GrapesBlockSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})

describe('generateBlock', () => {
  let mockParse: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    vi.clearAllMocks()
    const Anthropic = (await import('@anthropic-ai/sdk')).default as ReturnType<typeof vi.fn>
    const instance = Anthropic.mock.results[0]?.value ?? Anthropic()
    mockParse = instance.messages.parse
  })

  it('returns parsed_output when client.messages.parse succeeds', async () => {
    const fakeBlock = { ...MOCK_BLOCK }
    mockParse.mockResolvedValueOnce({ parsed_output: fakeBlock })

    const result = await generateBlock('Banner khuyến mãi Flash Sale 50%')
    expect(result).toEqual(fakeBlock)
  })

  it('throws when parsed_output is null', async () => {
    mockParse.mockResolvedValueOnce({ parsed_output: null })

    await expect(generateBlock('test prompt')).rejects.toThrow(
      'Claude returned null parsed_output — Zod validation failed'
    )
  })

  it('propagates errors thrown by client.messages.parse', async () => {
    const apiError = new Error('API rate limit exceeded')
    mockParse.mockRejectedValueOnce(apiError)

    await expect(generateBlock('test prompt')).rejects.toThrow(
      'API rate limit exceeded'
    )
  })

  it('calls client.messages.parse with correct model and max_tokens', async () => {
    const fakeBlock = { ...MOCK_BLOCK }
    mockParse.mockResolvedValueOnce({ parsed_output: fakeBlock })

    await generateBlock('test prompt')

    expect(mockParse).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
      })
    )
  })

  it('calls client.messages.parse with the user prompt in messages', async () => {
    const fakeBlock = { ...MOCK_BLOCK }
    mockParse.mockResolvedValueOnce({ parsed_output: fakeBlock })
    const userPrompt = 'Banner bán hàng mùa hè'

    await generateBlock(userPrompt)

    expect(mockParse).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [{ role: 'user', content: userPrompt }],
      })
    )
  })

  it('system prompt contains MOCK_BLOCK JSON as few-shot example', async () => {
    const fakeBlock = { ...MOCK_BLOCK }
    mockParse.mockResolvedValueOnce({ parsed_output: fakeBlock })

    await generateBlock('test prompt')

    const callArgs = mockParse.mock.calls[0][0]
    expect(callArgs.system).toContain(JSON.stringify(MOCK_BLOCK, null, 2))
  })
})
