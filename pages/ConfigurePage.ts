import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";

interface IConfiguration {
  loyal: boolean
  flexible: boolean
  heavyUsageYes?: boolean
  heavyUsageNo?: boolean
  studentYes?: boolean
  studentNo?: boolean
}

export class ConfigurePage extends BasePage {
  private orderBikeButton: Locator
  private loyalMembershipRadioButton: Locator
  private flexibleMembershipRadioButton: Locator
  private heavyUsageRadioGroup: Locator
  private heavyUsageYesRadioButton: Locator
  private heavyUsageNoRadioButton: Locator
  private heavyUsagePrice: Locator
  private studentRadioGroup: Locator
  private studentYesRadioButton: Locator
  private studentNoRadioButton: Locator
  constructor(page: Page, cityCode: string, bikeCode: string) {
    super(page, `https://swapfiets.co.uk/${cityCode}/${bikeCode}/configure`)
    this.orderBikeButton = page.getByTestId('configure-submit-button')
    this.loyalMembershipRadioButton = page
      .locator('[class*="ChooseMembership_group"]')
      .getByTestId('radio-button')
      .nth(0);
    this.flexibleMembershipRadioButton = page
      .locator('[class*="ChooseMembership_group"]')
      .getByTestId('radio-button')
      .nth(1);
    this.heavyUsageRadioGroup = page.getByTestId('heavy-use-radio-group')
    this.heavyUsageYesRadioButton = this
      .heavyUsageRadioGroup
      .getByTestId('radio-button')
      .nth(0);
    this.heavyUsageNoRadioButton = this
      .heavyUsageRadioGroup
      .getByTestId('radio-button')
      .nth(1);
    this.heavyUsagePrice = this
      .heavyUsageYesRadioButton
      .locator('[class*="HeavyUser_price"]')
    this.studentRadioGroup = page.locator('[class*="AreYouStudent_group"]')
    this.studentYesRadioButton = this
      .studentRadioGroup
      .getByTestId('radio-button')
      .nth(0);
    this.studentNoRadioButton = this
      .studentRadioGroup
      .getByTestId('radio-button')
      .nth(1);
  }

  public async configure(configuration: IConfiguration) {
    if (configuration.loyal) await this.loyalMembershipRadioButton.check()
    if (configuration.flexible) await this.flexibleMembershipRadioButton.check()
    if (configuration.heavyUsageYes) await this.heavyUsageYesRadioButton.check()
    if (configuration.heavyUsageNo) await this.heavyUsageNoRadioButton.check()
    if (configuration.studentYes) await this.heavyUsageNoRadioButton.check()
    if (configuration.heavyUsageNo) await this.heavyUsageNoRadioButton.check()

    await this.orderBikeButton.click()
  }

  public async checkStudentOptionsDisplayed(displayed: boolean) {
    if(displayed) {
      await expect(this.studentRadioGroup).toBeVisible
    } else {
      await expect(this.studentRadioGroup).not.toBeVisible
    }
  }

  public async checkHeavyUsageOptionsDisplayed(displayed: boolean) {
    if(displayed) {
      await expect(this.heavyUsageRadioGroup).toBeVisible
      await expect(this.heavyUsagePrice).toBeVisible
    } else {
      await expect(this.heavyUsageRadioGroup).not.toBeVisible
    }
  }

  public async checkConfiguration(configuration: IConfiguration) {
    if (configuration.loyal) {
      await expect(this.loyalMembershipRadioButton).toBeChecked()
    } else {
      await expect(this.loyalMembershipRadioButton).not.toBeChecked()
    }

    if (configuration.flexible) {
      await expect(this.flexibleMembershipRadioButton).toBeChecked()
    } else {
      await expect(this.flexibleMembershipRadioButton).not.toBeChecked()
    }

    if(configuration.heavyUsageYes === true) {
      await expect(this.heavyUsageYesRadioButton).toBeChecked()
    } else if (configuration.heavyUsageYes === false) {
      await expect(this.heavyUsageYesRadioButton).not.toBeChecked()
    }

    if(configuration.heavyUsageNo === true) {
      await expect(this.heavyUsageNoRadioButton).toBeChecked()
    } else if (configuration.heavyUsageNo === false) {
      await expect(this.heavyUsageNoRadioButton).not.toBeChecked()
    }

    if(configuration.studentYes === true) {
      await expect(this.studentYesRadioButton).toBeChecked()
    } else if(configuration.studentYes === false) {
      await expect(this.studentNoRadioButton).not.toBeChecked()
    }

    if(configuration.studentNo === true) {
      await expect(this.studentYesRadioButton).not.toBeChecked()
    } else if(configuration.studentNo === false) {
      await expect(this.studentNoRadioButton).toBeChecked()
    }
  }
}