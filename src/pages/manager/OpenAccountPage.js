import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId('userSelect');
    this.currencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async waitForOpened() {
    await this.page.waitForURL(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }

  async selectRandomCurrency() {
    const currencies = ['Dollar', 'Pound', 'Rupee'];
    const randomIndex = Math.floor(Math.random() * currencies.length);
    const currency = currencies[randomIndex];
    await this.currencyDropDown.selectOption(currency);
  }

  async selectCurrency(currencyName) {
    await this.currencyDropDown.selectOption(currencyName);
  }

  async assertCurrencuDropdownContainsValue(value) {
    const currentOptionText = this.currencyDropDown;
    await expect(currentOptionText).toHaveValue(value); 
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }
}