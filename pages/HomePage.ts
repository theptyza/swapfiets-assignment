import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class HomePage extends BasePage {
  private readonly citySelector: Locator
  private readonly citySelectorOption: Locator
  constructor(page: Page) {
    super(page, 'https://swapfiets.com/en-GB')
    this.citySelector = page.getByTestId('city-selector-input')
    this.citySelectorOption = page.getByTestId('city-selector-option')
  }

  async selectCity(cityName: string) {
    await this.citySelector.click()
    await this.citySelectorOption.filter({ hasText: cityName }).click()
  }
}