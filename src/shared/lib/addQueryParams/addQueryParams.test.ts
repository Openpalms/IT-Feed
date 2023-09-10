import { getQueryParams } from './addQueryParams'

describe('shared/url/AddQueryParams', function () {
  test('with one param', () => {
    const params = getQueryParams({
      test: 'hello_every_one',
    })
    expect(params).toBe('?test=hello_every_one')
  })
  test('with several params', () => {
    const params = getQueryParams({
      test: 'hello_every_one',
      test_two: '123',
    })
    expect(params).toBe('?test=hello_every_one&test_two=123')
  })
  test('with undefined', () => {
    const params = getQueryParams({
      test: 'hello_every_one',
      test_two: undefined,
    })
    expect(params).toBe('?test=hello_every_one')
  })
})
