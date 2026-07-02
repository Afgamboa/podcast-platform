import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formatea una fecha ISO correctamente', () => {
    expect(formatDate('2026-06-30T12:00:00Z')).toBe('June 30, 2026')
  })

  it('retorna string vacío si no recibe valor', () => {
    expect(formatDate('')).toBe('')
  })

  it('maneja fechas de distintos meses', () => {
    expect(formatDate('2026-01-15T12:00:00Z')).toBe('January 15, 2026')
  })
})