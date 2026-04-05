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
}