import { classNames } from './classNames'

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass')
  })
  test('with additional param', () => {
    const expected = 'someClass class1 class2'
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected)
  })
  test('with mods param', () => {
    const expected = 'someClass class1 class2 hovered active'
    expect(classNames('someClass', { hovered: true, active: true }, ['class1', 'class2'])).toBe(expected)
  })
  test('with 1 false mods param', () => {
    const expected = 'someClass class1 class2 hovered'
    expect(classNames('someClass', { hovered: true, active: false }, ['class1', 'class2'])).toBe(expected)
  })
  test('with undefined mods param', () => {
    const expected = 'someClass class1 class2 active'
    expect(classNames('someClass', { hovered: undefined, active: true }, ['class1', 'class2'])).toBe(expected)
  })
})
