# Task 4 - UI Test Automation

> Given you need to write an automated test for the scenario below.  
Scenario:  
A. Go to the website “https://swapfiets.com/en-GB”  
B. Search/select city “London”  
C. Subscribe to a Power 1  
D. Order the bike  
E. Fill in your details  
F. Click back
Brief:  
Perform at least five assertions after executing step B  
Perform at least five assertions after executing step C.  
Perform at least two assertions after executing step E.  
Perform at least two assertions after executing step F.  

## Pre-requisites
1. Node.js
2. Install modules  
```shell
npm install
```
3. Install chromium browser for Playwright   
```shell
npx playwright install chromium
```
## How to run
Run test
```shell
npm run test
```
Run test in debug mode (with Playwright Inspector UI)  
```shell
npm run test-debug
```
## Implementation notes

### Project components

- data - test data
- pages - page objects.  
Each page has private properties for locators and public methods to run steps and checks.  
Most locators use `data-test-id` property (set as default test ID attribute in `playwright.config.ts`).
- tests - actual tests.  
Only one test is implemented.

### Cookies

To suppress the cookies dialog, a `CookieConsent` cookie is set before the test.

## ToDo

1. Some elements don't have a unique `data-test-id`. Best practice would be to add them consistently.
2. Only one browser and screen size is currently used. It is possible to add multiple browsers and viewport sizes.

## Test steps
### Order bike flow
1. Go to the website "https://swapfiets.com/en-GB"
2. Search/select city “London”
3. Check that 
    - Page for London is opened
    - Page has All/E-bikes/City bikes switch
    - Page has 4 bike types
    - All bike types have "Subscribe" buttons
    - Only E-bikes have "Book a free test ride" buttons
4. Subscribe to a Power 1
5. Check that
    - Bike configuration page for London, Power 1 is opened
    - Loyal membership is selected by default
    - Heavy usage options are displayed
    - Heavy usage price is displayed
    - No default selection in Heavy usage
    - Student options are not displayed
6. Select Loyal membership, Heavy usage = No. Order the bike.
7. Fill in your details. Check Terms checkbox.
8. Check that
    - Error messages are not displayed
    - Next button is enabled
9. Click back
10. Check that
    - Bike configuration page for London, Power 1 is opened
    - Loyal membership is selected
    - Heavy usage = No is selected