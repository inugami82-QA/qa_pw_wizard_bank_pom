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
  customer.fullName = `${customer.firstName} ${customer.lastName}`,

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

test('Assert manager can delete customer', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);

  await customersListPage.open();
  await customersListPage.deleteCustomer(
    customer.firstName, 
    customer.lastName, 
    customer.postCode
  );
  await customersListPage.assertNoSuchCustomerIsListed(
    customer.firstName, 
    customer.lastName, 
    customer.postCode
  );
  await page.reload();
  await customersListPage.assertNoSuchCustomerIsListed(
    customer.firstName, 
    customer.lastName, 
    customer.postCode
  );
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
