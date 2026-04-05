import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).first();
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.newCustomerSubmitButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.homeButton = page.getByRole('button', { name: 'Home' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  async clickSubmitButton() {
    await this.newCustomerSubmitButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
