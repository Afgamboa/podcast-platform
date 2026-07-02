import { describe, it, expect } from 'vitest'
import { formatTime } from './formatTime'

describe('formatTime', () => {
  it('formatea duración en horas correctamente', () => {
    expect(formatTime(3661000)).toBe('01:01:01')
  })

  it('formatea duración en minutos sin horas', () => {
    expect(formatTime(150000)).toBe('02:30')
  })

  it('formatea duración de exactamente 1 hora', () => {
    expect(formatTime(3600000)).toBe('01:00:00')
  })

  it('agrega ceros a la izquierda correctamente', () => {
    expect(formatTime(65000)).toBe('01:05')
  })

  it('retorna N/A si la duración es 0', () => {
    expect(formatTime(0)).toBe('N/A')
  })

  it('retorna N/A si la duración es negativa', () => {
    expect(formatTime(-1000)).toBe('N/A')
  })
})