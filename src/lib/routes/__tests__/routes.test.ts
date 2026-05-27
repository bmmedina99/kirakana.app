import { describe, expect, it } from 'vitest'
import { createPracticeGroupUrl, routeLabels, routes } from '..'

describe('publicRoutes', () => {
  it('returns "/" for home', () => {
    expect(routes.home()).toBe('/')
  })

  it('returns "/progreso/" for progress', () => {
    expect(routes.progress()).toBe('/progreso/')
  })
})

// ─── routes.learn ────────────────────────────────────────────────────────────

describe('learnRoutes', () => {
  it('returns "/aprender/" for index', () => {
    expect(routes.learn.index()).toBe('/aprender/')
  })

  it('returns the correct path for each syllabary', () => {
    expect(routes.learn.syllabary('hiragana')).toBe('/aprender/hiragana/')
    expect(routes.learn.syllabary('katakana')).toBe('/aprender/katakana/')
  })

  it('accepts arbitrary syllabary slugs for extensibility', () => {
    expect(routes.learn.syllabary('kanji')).toBe('/aprender/kanji/')
  })
})

// ─── routes.practice ─────────────────────────────────────────────────────────

describe('practiceRoutes', () => {
  it('returns "/practicar/" for index', () => {
    expect(routes.practice.index()).toBe('/practicar/')
  })

  it('returns the correct path for each mode', () => {
    expect(routes.practice.mode('lectura')).toBe('/practicar/lectura/')
  })

  it('returns the correct path for each mode and syllabary combination', () => {
    expect(routes.practice.modeSyllabary('escucha', 'hiragana')).toBe(
      '/practicar/escucha/hiragana/',
    )
  })
})

// ─── createPracticeGroupUrl ───────────────────────────────────────────────────

describe('createPracticeGroupUrl', () => {
  it("doesn't add a query string without optional params", () => {
    expect(
      createPracticeGroupUrl({ mode: 'lectura', syllabary: 'hiragana' }),
    ).toBe('/practicar/lectura/hiragana/')
  })

  it('adds ?group= when "group" is provided', () => {
    expect(
      createPracticeGroupUrl({
        mode: 'lectura',
        syllabary: 'hiragana',
        group: 'ka',
      }),
    ).toBe('/practicar/lectura/hiragana/?grupo=ka')
  })

  it('adds ?level= when "level" is provided', () => {
    expect(
      createPracticeGroupUrl({
        mode: 'lectura',
        syllabary: 'hiragana',
        level: 'completo',
      }),
    ).toBe('/practicar/lectura/hiragana/?nivel=completo')
  })

  it('with both parameters orders them correctly', () => {
    expect(
      createPracticeGroupUrl({
        mode: 'escritura',
        syllabary: 'katakana',
        group: 'a',
        level: 'completo',
      }),
    ).toBe('/practicar/escritura/katakana/?grupo=a&nivel=completo')
  })
})

// ─── routeLabels ─────────────────────────────────────────────────────────────

describe('routeLabels', () => {
  it('returns the correct label for each route', () => {
    expect(routeLabels['/']).toBe('Inicio')
    expect(routeLabels['/aprender/']).toBe('Aprender')
    expect(routeLabels['/practicar/']).toBe('Practicar')
    expect(routeLabels['/progreso/']).toBe('Progreso')
  })

  it('covers automatically generated mode and syllabary combinations', () => {
    expect(routeLabels['/practicar/reconocimiento/hiragana/']).toBe('Hiragana')
    expect(routeLabels['/practicar/escritura/katakana/']).toBe('Katakana')
  })
})
