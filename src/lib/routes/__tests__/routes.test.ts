import { describe, expect, it } from 'vitest'
import { createPracticeGroupUrl, routeLabels, routes } from '..'

describe('public routes validation', () => {
  it('returns "/" for home', () => {
    expect(routes.home()).toBe('/')
  })

  it('returns "/progreso/" for progress', () => {
    expect(routes.progress()).toBe('/progreso/')
  })
})

describe('learn route validation', () => {
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

describe('practice route validation', () => {
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

describe('createPracticeGroupUrl practice path generation', () => {
  it("doesn't add a query string without optional params", () => {
    expect(
      createPracticeGroupUrl({ mode: 'reconocimiento', syllabary: 'hiragana' }),
    ).toBe('/practicar/reconocimiento/hiragana/')
  })

  it('adds ?grupo= when "group" is provided', () => {
    expect(
      createPracticeGroupUrl({
        mode: 'escucha',
        syllabary: 'hiragana',
        group: 'ka',
      }),
    ).toBe('/practicar/escucha/hiragana/?grupo=ka')
  })

  it('adds ?nivel= when "level" is provided', () => {
    expect(
      createPracticeGroupUrl({
        mode: 'reconocimiento',
        syllabary: 'hiragana',
        level: 'completo',
      }),
    ).toBe('/practicar/reconocimiento/hiragana/?nivel=completo')
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

describe('route labels validation', () => {
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
