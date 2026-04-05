import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
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
  await page.reload();
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can open account for a new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.clickOpenAccount();
  await openAccountPage.waitForOpened();
  await openAccountPage.selectCustomer(customer.fullName);
  await openAccountPage.selectRandomCurrency();
  await openAccountPage.clickProcessButton();
  await page.reload();
  await openAccountPage.clickCustomersButton();
  await customersListPage.waitForOpened();
  await customersListPage.assertCustomerHasAccount(
    customer.firstName, 
    customer.lastName, 
    customer.postCode
  ); 
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
});
