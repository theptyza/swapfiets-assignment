import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {DATA} from "../data/data";

export class CityPage extends BasePage {
  private allBikesRadioButton: Locator
  private eBikesRadioButton: Locator
  private cityBikesRadioButton: Locator

  constructor(page: Page, cityCode: string) {
    super(page, `https://swapfiets.co.uk/${cityCode}`)
    this.allBikesRadioButton = page
      .locator('[class*="ProductFilters_group"]')
      .getByTestId('radio-button')
      .nth(0);
    this.eBikesRadioButton = page
      .locator('[class*="ProductFilters_group"]')
      .getByTestId('radio-button')
      .nth(1);
    this.cityBikesRadioButton = page
      .locator('[class*="ProductFilters_group"]')
      .getByTestId('radio-button')
      .nth(2);
  }

  private getBikeItem = (bikeName: string): Locator =>
    this
      .page
      .getByTestId('city-product-list-item')
      .filter({ hasText: bikeName })

  private getSubscribeButton = (bikeName: string): Locator =>
    this
      .getBikeItem(bikeName)
      .getByTestId('product-cta-link')

  private getTestRideButton = (bikeName: string): Locator =>
    this
      .getBikeItem(bikeName)
      .locator('[data-gtag*="test ride"]')

  async subscribe(bikeName: string) {
    await this
      .getSubscribeButton(bikeName)
      .click()
  }

  async checkBikeTypeSwitches() {
    await expect(this.allBikesRadioButton).toBeVisible()
    await expect(this.eBikesRadioButton).toBeVisible()
    await expect(this.cityBikesRadioButton).toBeVisible()
  }

  async checkBikeTypes() {
    for (let b in DATA.BIKES) {
      await expect(this.getSubscribeButton(DATA.BIKES[b].name)).toBeVisible()
    }

    for (let b in DATA.BIKES) {
      if (DATA.BIKES[b].electric) {
        await expect(this.getTestRideButton(DATA.BIKES[b].name)).toBeVisible()
      } else {
        await expect(this.getTestRideButton(DATA.BIKES[b].name)).not.toBeVisible()
      }
    }
  }
}