/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman("string")).toBe(false)
  expect(convertBytesToHuman(true)).toBe(false)
  expect(convertBytesToHuman([1, 2, 3])).toBe(false)
  expect(convertBytesToHuman(null).toBe(false))
  expect(convertBytesToHuman(-1).toBe(false))
  expect(convertBytesToHuman(Object).toBe(false))
  expect(convertBytesToHuman(undefined).toBe(false))
  expect(convertBytesToHuman(Symbol).toBe(false))
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(256)).toBe("1 B")
  expect(convertBytesToHuman(1024)).toBe("1 KB")
  expect(convertBytesToHuman(2e20)).toBe("1 МБ")
  expect(convertBytesToHuman(2e30)).toBe("1 GB")
  expect(convertBytesToHuman(2e40)).toBe("1 TB")
  expect(convertBytesToHuman(2e50)).toBe("1 PB")
});

// другая группа проверок
