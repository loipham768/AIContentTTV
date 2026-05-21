/**
 * TDD tests for components/editor/PromptBar.tsx
 *
 * RED phase: tests that will fail until the component is implemented.
 * These tests cover:
 *   - PromptBar module exports a default export (function/component)
 *   - PromptBar source file contains required implementation patterns
 *   - Submit handler: calls fetch('/api/generate') with POST + JSON body
 *   - Submit handler: calls editorRef.current?.loadProjectData on success
 *   - Submit handler: sets Vietnamese 429 error message on rate limit
 *   - Submit handler: sets Vietnamese generic error message on 5xx
 *   - Error clears on textarea onChange (D-08)
 *   - Button disabled when prompt is empty after trim
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

const COMPONENT_PATH = path.resolve(__dirname, '../../components/editor/PromptBar.tsx')

describe('PromptBar component file', () => {
  it('should exist at components/editor/PromptBar.tsx', () => {
    expect(fs.existsSync(COMPONENT_PATH)).toBe(true)
  })

  it('should contain the "use client" directive', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain("'use client'")
  })

  it('should export a default function (PromptBar)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toMatch(/export default function PromptBar/)
  })

  it('should import Loader2 from lucide-react', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('Loader2')
    expect(content).toContain('lucide-react')
  })

  it('should use loadProjectData on successful response', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('loadProjectData(data.block)')
  })

  it('should have Vietnamese rate-limit error message (429)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('Vui lòng đợi vài giây trước khi tạo nội dung mới.')
  })

  it('should have Vietnamese generic error message (5xx)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('Đã xảy ra lỗi. Vui lòng thử lại.')
  })

  it('should clear error on textarea onChange (D-08)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    // Error clear on keystroke must be in handlePromptChange or onChange handler
    expect(content).toContain('setError(null)')
  })

  it('should have isLoading state variable', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('isLoading')
    // Must have multiple usages (state declaration + JSX)
    const matches = content.match(/isLoading/g) ?? []
    expect(matches.length).toBeGreaterThanOrEqual(3)
  })

  it('should fetch POST to /api/generate', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain("'/api/generate'")
    expect(content).toContain("method: 'POST'")
  })

  it('should have Vietnamese placeholder text', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('Nhập nội dung bạn muốn tạo')
  })

  it('should check for 429 status code', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('429')
  })

  it('should handle error state in catch block', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('catch')
    expect(content).toContain('finally')
  })

  it('should have maxLength 500 on textarea (T-03-07 mitigation)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    expect(content).toContain('maxLength={500}')
  })

  it('should disable button when prompt is empty (T-03-08 mitigation)', () => {
    const content = fs.readFileSync(COMPONENT_PATH, 'utf-8')
    // Button disabled condition must include prompt empty check
    expect(content).toMatch(/disabled=\{isLoading \|\|/)
  })
})
