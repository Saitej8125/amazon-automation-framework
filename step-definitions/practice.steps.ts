import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// ---- checkboxes ----
Given('I open the checkboxes practice page', async function (this: CustomWorld) {
  await this.practice.openCheckboxes();
});

When('I tick checkbox {int}', async function (this: CustomWorld, n: number) {
  await this.practice.checkbox(n).check();
});

When('I untick checkbox {int}', async function (this: CustomWorld, n: number) {
  await this.practice.checkbox(n).uncheck();
});

Then('checkbox {int} should be ticked', async function (this: CustomWorld, n: number) {
  await expect(this.practice.checkbox(n)).toBeChecked();
});

Then('checkbox {int} should not be ticked', async function (this: CustomWorld, n: number) {
  await expect(this.practice.checkbox(n)).not.toBeChecked();
});

// ---- dropdown ----
Given('I open the dropdown practice page', async function (this: CustomWorld) {
  await this.practice.openDropdown();
});

When('I select the {string} option', async function (this: CustomWorld, label: string) {
  await this.practice.dropdown.selectOption({ label });
});

Then('{string} should be selected', async function (this: CustomWorld, label: string) {
  await expect(this.practice.dropdown.locator('option:checked')).toHaveText(label);
});

// ---- nested frames ----
Given('I open the nested frames practice page', async function (this: CustomWorld) {
  await this.practice.openNestedFrames();
});

Then('the {string} frame should show {string}',
  async function (this: CustomWorld, frame: string, text: string) {
    await expect(this.practice.frameBody(frame)).toContainText(text);
  });

// ---- drag and drop ----
Given('I open the drag and drop practice page', async function (this: CustomWorld) {
  await this.practice.openDragAndDrop();
});

When('I drag box A onto box B', async function (this: CustomWorld) {
  await this.practice.dragAToB();
});

Then('box A should now show the letter {string}',
  async function (this: CustomWorld, letter: string) {
    await expect(this.practice.columnHeader('a')).toHaveText(letter);
  });

// ---- new window ----
Given('I open the windows practice page', async function (this: CustomWorld) {
  await this.practice.openWindows();
});

When('I click the link that opens a new window', async function (this: CustomWorld) {
  this.newWindow = await this.practice.openNewWindow();
});

Then('the new window should show the heading {string}',
  async function (this: CustomWorld, heading: string) {
    await expect(this.newWindow!.locator('h3')).toHaveText(heading);
  });

// ---- alerts and right-click ----
Given('I open the alerts practice page', async function (this: CustomWorld) {
  await this.practice.openAlerts();
});

When('I accept the JavaScript alert', async function (this: CustomWorld) {
  await this.practice.acceptJsAlert();
});

Then('the result should say {string}',
  async function (this: CustomWorld, text: string) {
    await expect(this.practice.result).toHaveText(text);
  });

Given('I open the context menu practice page', async function (this: CustomWorld) {
  await this.practice.openContextMenu();
});

When('I right-click the box', async function (this: CustomWorld) {
  this.alertMessage = await this.practice.rightClickBox();
});

Then('the alert message should be {string}',
  async function (this: CustomWorld, text: string) {
    expect(this.alertMessage).toBe(text);
  });

Given('I open the hover practice page', async function (this: CustomWorld) {
  await this.practice.openHover();
});

When('I hover over avatar {int}', async function (this: CustomWorld, n: number) {
  await this.practice.avatar(n).hover();
});

Then('the caption {string} should be visible',
  async function (this: CustomWorld, text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  });

When('I click View profile for avatar {int}', async function (this: CustomWorld, n: number) {
  await this.practice.avatar(n).getByRole('link', { name: 'View profile' }).click();
});

Then('I should be on the page for user {int}', async function (this: CustomWorld, n: number) {
  await expect(this.page).toHaveURL(new RegExp(`/users/${n}`));
});

Given('I open the key press practice page', async function (this: CustomWorld) {
  await this.practice.openKeyPresses();
});

When('I press the key {string}', async function (this: CustomWorld, key: string) {
  await this.practice.pressKey(key);
});

Given('I open the slider practice page', async function (this: CustomWorld) {
  await this.practice.openSlider();
});

When('I press the right arrow {int} times on the slider',
  async function (this: CustomWorld, times: number) {
    await this.practice.moveSliderRight(times);
  });

Then('the slider value should be {string}',
  async function (this: CustomWorld, value: string) {
    await expect(this.practice.sliderValue()).toHaveText(value);
  });

Given('I open the infinite scroll practice page', async function (this: CustomWorld) {
  await this.practice.openInfiniteScroll();
});

When('I scroll down', async function (this: CustomWorld) {
  this.blocksBefore = await this.practice.scrollBlocks().count();
  await this.practice.scrollDown();
});

Then('more content should be loaded', async function (this: CustomWorld) {
  await expect
    .poll(async () => await this.practice.scrollBlocks().count())
    .toBeGreaterThan(this.blocksBefore);
});