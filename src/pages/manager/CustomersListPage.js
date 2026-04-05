import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.homeButton = page.getByRole('button', { name: 'Home' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.customerRows = page.locator('table tbody tr');
    this.lastRow = this.customerRows.last();
    this.targetRow = (firstName, lastName, postCode) => this.customerRows.filter({ 
      hasText: `${firstName} ${lastName} ${postCode}`, 
    });
    this.searchField = page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async getLastCustomerDetails() {
    const firstName = await this.lastRow.locator('td').nth(0).textContent();
    const lastName = await this.lastRow.locator('td').nth(1).textContent();
    const postCode = await this.lastRow.locator('td').nth(2).textContent();
    return { firstName, lastName, postCode };
  }

  async assertLastRowContains(item) {
    await expect(this.lastRow).toContainText(item);
  }

  async assertLastRowDoesNotContain(item) {
    await expect(this.lastRow).not.toContainText(item);
  }

  async assertLastRowHasNoAccount() {
    await expect(this.lastRow.locator('td').nth(3)).toBeEmpty();
  }

  async assertOnlyOneRow() {
    expect(this.customerRows).toHaveCount(1);
  }

  async deleteCustomer(firstName, lastName, postCode) {
    await this.targetRow(firstName, lastName, postCode)
    .locator('button').click();
  }

  async assertNoSuchCustomerIsListed(firstName, lastName, postCode) {
    await expect(this.targetRow(firstName, lastName, postCode)).toBeHidden();
  }

  async assertCustomerHasAccount(firstName, lastName, postCode) {
    await expect(this.targetRow(firstName, lastName, postCode)
    .getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async searchCustomer(value) {
    await this.searchField.fill(value);
  }
}