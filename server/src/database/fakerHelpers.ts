import {faker} from '@faker-js/faker'
import {toUpper} from 'lodash'

export const getFormattedDate = (): string => {
  const fakeDate = faker.date.recent()
  const year = fakeDate.getFullYear()
  const month = fakeDate.getMonth() + 1
  const date = fakeDate.getDate()
  const hours = fakeDate.getHours()
  const minutes = fakeDate.getMinutes()
  const seconds = fakeDate.getSeconds()

  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const generateZipCode = (): string => {
  const firstPart = faker.number.int({min: 10, max: 99})
  const secondPart = faker.number.int({min: 100, max: 999})

  return `${firstPart}-${secondPart}`
}

export const generatePolishCarRegistration = () => {
  const format = faker.number.int({min: 1, max: 3})

  let registration = ''

  switch (format) {
  case 1:
    // Format: XXX 0000
    registration = `${toUpper(faker.lorem.word(3))} ${faker.number.int({min: 1000, max: 9999})}`
    break
  case 2:
    // Format: XX 00000
    registration = `${toUpper(faker.lorem.word(2))} ${faker.number.int({min: 10000, max: 99999})}`
    break
  case 3:
    // Format: XXX 00000
    registration = `${toUpper(faker.lorem.word(3))} ${faker.number.int({min: 10000, max: 99999})}`
    break
  default:
    // Default to format 1 if something goes wrong
    registration = `${toUpper(faker.lorem.word(3))} ${faker.number.int({min: 1000, max: 9999})}`
    break
  }

  return registration
}
