import { Page, Locator } from '@playwright/test';

export class PracticePage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
    this.result = page.locator('#result');
  }

  private async go(path: string) {
    await this.page.goto('https://the-internet.herokuapp.com' + path);
  }

  // ---- checkboxes and dropdown ----
  async openCheckboxes() { await this.go('/checkboxes'); }
  async openDropdown() { await this.go('/dropdown'); }
  checkbox(n: number): Locator { return this.page.locator('#checkboxes input').nth(n - 1); }

  // ---- nested frames ----
  async openNestedFrames() { await this.go('/nested_frames'); }
  frameBody(name: string): Locator {
    if (name === 'frame-bottom') {
      return this.page.frameLocator('frame[name="frame-bottom"]').locator('body');
    }
    return this.page.frameLocator('frame[name="frame-top"]')
      .frameLocator(`frame[name="${name}"]`).locator('body');
  }

  // ---- drag and drop ----
  async openDragAndDrop() { await this.go('/drag_and_drop'); }
  async dragAToB() {
    await this.page.locator('#column-a').dragTo(this.page.locator('#column-b'));
  }
  columnHeader(col: 'a' | 'b'): Locator {
    return this.page.locator(`#column-${col} header`);
  }

  // ---- new window ----
  async openWindows() { await this.go('/windows'); }
  async openNewWindow(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.getByRole('link', { name: 'Click Here' }).click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  // ---- alerts and right-click ----
  async openAlerts() { await this.go('/javascript_alerts'); }
  async acceptJsAlert() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.page.getByRole('button', { name: 'Click for JS Alert' }).click();
  }

  async openContextMenu() { await this.go('/context_menu'); }
  async rightClickBox(): Promise<string> {
    let message = '';
    this.page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.accept();
    });
    await this.page.locator('#hot-spot').click({ button: 'right' });
    return message;
  }
}