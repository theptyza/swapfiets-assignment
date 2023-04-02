// types
import type {Locator, Page} from '@playwright/test'
import {expect} from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page
  protected readonly url: string

  protected constructor(page: Page, url: string) {
    this.page = page
    this.url = url
  }

  async goto() {
    await this.page.goto(this.url)
  }

  async checkPageOpened() {
    await expect(this.page).toHaveURL(this.url)
  }
}
