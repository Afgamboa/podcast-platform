import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from './sanitizeHtml'

describe('sanitizeHtml', () => {
  it('permite HTML legítimo', () => {
    expect(sanitizeHtml('<p>Este <strong>es un mensaje</strong></p>')).toBe(
      '<p>Este <strong>es un mensaje</strong></p>'
    )
  })

  it('elimina scripts maliciosos', () => {
    expect(sanitizeHtml('<script>alert("xss")</script>')).toBe('')
  })

  it('elimina event handlers', () => {
    const result = sanitizeHtml('<img src="x" onerror="alert(1)">')
    expect(result).not.toContain('onerror')
  })

  it('elimina atributos javascript:', () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>')
    expect(result).not.toContain('javascript:')
  })

  it('retorna string vacío si no recibe valor', () => {
    expect(sanitizeHtml('')).toBe('')
  })
})