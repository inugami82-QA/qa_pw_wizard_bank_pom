import { faker } from '@faker-js/faker';

export const customer = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postCode: faker.location.zipCode()
}