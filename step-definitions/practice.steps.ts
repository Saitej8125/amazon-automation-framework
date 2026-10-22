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