import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";

export class RegistrationPage extends BasePage {
  private readonly firstNameInput: Locator
  private readonly lastNameInput: Locator
  private readonly dateSelect: Locator
  private readonly monthSelect: Locator
  private readonly yearSelect: Locator
  private readonly genderFemaleRadioButton: Locator
  private readonly genderMaleRadioButton: Locator
  private readonly genderOtherRadioButton: Locator
  private readonly heightInput: Locator
  private readonly streetInput: Locator
  private readonly houseNumberInput: Locator
  private readonly postalCodeInput: Locator
  private readonly cityInput: Locator
  private readonly emailInput: Locator
  private readonly telephoneNumberInput: Locator
  private readonly commentsInput: Locator
  private readonly termsCheckbox: Locator
  private readonly powerOfferCheckbox: Locator
  private readonly gdprCheckbox: Locator
  private readonly nextButton: Locator
  private readonly backButton: Locator
  private readonly errorMessage: Locator

  constructor(page: Page) {
    super(page, 'https://account.swapfiets.com/registration/enroll/')
    this.firstNameInput = page.locator('[name="firstname"]')
    this.lastNameInput = page.locator('[name="lastname"]')
    this.dateSelect = page.locator('.date-dropdowns select').nth(0)
    this.monthSelect = page.locator('.date-dropdowns select').nth(1)
    this.yearSelect = page.locator('.date-dropdowns select').nth(2)
    this.genderFemaleRadioButton = page.locator('[for="gender-female"]')
    this.genderMaleRadioButton = page.locator('[for="gender-male"]')
    this.genderOtherRadioButton = page.locator('[for="gender-other"]')
    this.heightInput = page.locator('[name="height"]')
    this.streetInput = page.locator('[name="street"]')
    this.houseNumberInput = page.locator('[name="houseNumber"]')
    this.postalCodeInput = page.locator('[name="postalCode"]')
    this.cityInput = page.locator('[name="city"]')
    this.emailInput = page.locator('[name="email"]')
    this.telephoneNumberInput = page.locator('[name="telephoneNumber1"]')
    this.commentsInput = page.locator('[name="deliveryRemarks"]')
    this.termsCheckbox = page.locator('[for="terms-checkbox"]')
    this.powerOfferCheckbox = page.locator('[for="winterOffer-terms-checkbox"]')
    this.gdprCheckbox = page.locator('[for="gdpr-checkbox"]')
    this.nextButton = page.locator('[data-met="Signup - Personal details - CTA"]')
    this.backButton = page.locator('.back-button')
    this.errorMessage = page.locator('.error-message').first()
  }

  public async checkPageOpened() {
    await expect(this.page).toHaveURL(/registration\/enroll/)
  }

  public async fill() {
    await this.firstNameInput.fill('Stanislav')
    await this.lastNameInput.fill('Rogozhin')
    await this.dateSelect.selectOption('3')
    await this.monthSelect.selectOption('August')
    await this.yearSelect.selectOption('1987')
    await this.genderMaleRadioButton.click()
    await this.heightInput.fill('185')
    await this.streetInput.fill('Boscombe Road')
    await this.houseNumberInput.fill('3')
    await this.postalCodeInput.fill('W12 9HT')
    await this.cityInput.fill('London')
    await this.emailInput.fill('stanislav.rogozhin@gmail.com')
    await this.telephoneNumberInput.fill('123456789')
    await this.termsCheckbox.check()

    await expect(this.errorMessage).not.toBeVisible()
    await expect(this.nextButton).toBeEnabled()
  }
  public async register() {
    await this.nextButton.click()
  }

  public async goBack() {
    await this.backButton.click()
  }
}