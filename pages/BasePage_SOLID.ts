import {Page, Locator} from '@playwright/test';

export abstract class BasePage_SOLID
{
    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }
    async click(locator: Locator): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.click();
    }
     async fill(locator: Locator, value: string): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.fill(value);
    }
      async select(locator: Locator, value: string): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.selectOption(value);
    }
      async scrollToElement(locator: Locator): Promise<void>
    {
          await locator.scrollIntoViewIfNeeded();
      }
      async navigate(url: string): Promise<void>
      {
          await this.page.goto(url, {waitUntil: 'load'});
    }
    abstract isLoaded(): Promise<void>;

}
//domcontentloaded - browser has finished the loading and you can fire all event
//images, font other resources loading in progress

//load -images, gif, animations - resources page's load process
//webpage - images - take 5 sec

//network idle
//no network connection for atleast 500 milliseconds
//waitUnitl: networkidle
