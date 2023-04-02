import { test, expect } from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {DATA} from "../data/data";
import {CityPage} from "../pages/CityPage";
import {ConfigurePage} from "../pages/ConfigurePage";
import {RegistrationPage} from "../pages/RegistrationPage";

test.beforeEach(async ({page, context}) => {
  await context.addCookies([
    {
      name: 'CookieConsent',
      value: 'test',
      domain: 'swapfiets.co.uk',
      path: '/',
    },
    {
      name: 'CookieConsent',
      value: 'test',
      domain: 'account.swapfiets.com',
      path: '/',
    },
  ])
})

test('Order bike flow', async ({ page , browser}) => {
  // A. Go to the website “https://swapfiets.com/en-GB”
  const homePage = new HomePage(page)
  await homePage.goto()

  // B. Search/select city “London”
  await homePage.selectCity(DATA.CITY_NAME)
  const cityPage = new CityPage(page, DATA.CITY_CODE)

  // Perform at least five assertions after executing step B
  await cityPage.checkPageOpened()
  await cityPage.checkBikeTypeSwitches()
  await cityPage.checkBikeTypes()

  // C. Subscribe to a Power 1
  await cityPage.subscribe(DATA.BIKES.POWER_1.name)
  const configurePage = new ConfigurePage(page, DATA.CITY_CODE, DATA.BIKES.POWER_1.code)

  // Perform at least five assertions after executing step C
  await configurePage.checkPageOpened()
  await configurePage.checkConfiguration(
    {
      loyal: true,
      flexible: false,
      heavyUsageYes: false,
      heavyUsageNo: false
    })
  await configurePage.checkStudentOptionsDisplayed(false)
  await configurePage.checkHeavyUsageOptionsDisplayed(true)

  // D. Order the bike
  await configurePage.configure({loyal: true, flexible: false, heavyUsageNo: true})

  // E. Fill in your details
  const registrationPage = new RegistrationPage(page)

  // Perform at least two assertions after executing step E
  await registrationPage.checkPageOpened()
  await registrationPage.fill()

  // F. Click back
  await registrationPage.goBack()

  // Perform at least two assertions after executing step F.
  await configurePage.checkPageOpened()
  await configurePage.checkConfiguration(
    {
      loyal: true,
      flexible: false,
      heavyUsageYes: false,
      heavyUsageNo: true,
    })
});