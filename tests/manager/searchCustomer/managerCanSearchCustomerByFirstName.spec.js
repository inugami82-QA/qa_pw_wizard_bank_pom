import { test } from '@playwright/test';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { customer } from '../../../src/testdata/helper';

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);

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

test('Assert manager can search customer by First Name', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  
  await customersListPage.open();
  await customersListPage.searchCustomer(customer.firstName);
  await customersListPage.assertLastRowContains(customer.firstName);
  await customersListPage.assertOnlyOneRow();
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
