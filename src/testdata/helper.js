import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export const customer = {
  firstName,
  lastName,
  fullName: `${firstName} ${lastName}`,
  postCode: faker.location.zipCode()
}
