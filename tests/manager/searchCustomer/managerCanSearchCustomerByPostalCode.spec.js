import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customer;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  customer = {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          postCode: faker.location.zipCode()
      }
      customer.fullName = `${customer.firstName} ${customer.lastName}`;

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(customer.firstName);
  await addCustomerPage.fillLastName(customer.lastName);
  await addCustomerPage.fillPostCode(customer.postCode);
  await addCustomerPage.clickSubmitButton();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  
  await customersListPage.open();
  await customersListPage.searchCustomer(customer.postCode);
  await customersListPage.assertLastRowContains(customer.postCode);
  await customersListPage.assertOnlyOneRow();
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
