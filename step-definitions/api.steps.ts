import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect, request } from '@playwright/test';
import { CustomWorld } from '../support/world';

const BASE = 'https://jsonplaceholder.typicode.com';

When('I send a GET request to {string}', async function (this: CustomWorld, path: string) {
  const api = await request.newContext({ baseURL: BASE });
  this.apiResponse = await api.get(path);
  this.apiBody = await this.apiResponse.json().catch(() => null);
  await api.dispose();
});

When('I send a POST request to {string} with the body',
  async function (this: CustomWorld, path: string, table: DataTable) {
    const api = await request.newContext({ baseURL: BASE });
    this.apiResponse = await api.post(path, { data: table.rowsHash() });
    this.apiBody = await this.apiResponse.json();
    await api.dispose();
  });

Then('the response status should be {int}',
  async function (this: CustomWorld, status: number) {
    expect(this.apiResponse!.status()).toBe(status);
  });

Then('the response should have the fields {string}',
  async function (this: CustomWorld, fields: string) {
    for (const field of fields.split(',').map((f) => f.trim())) {
      expect(this.apiBody).toHaveProperty(field);
    }
  });

Then('the response should contain {int} items',
  async function (this: CustomWorld, count: number) {
    expect(Array.isArray(this.apiBody)).toBe(true);
    expect(this.apiBody).toHaveLength(count);
  });

Then('the response field {string} should be {string}',
  async function (this: CustomWorld, field: string, value: string) {
    expect(this.apiBody[field]).toBe(value);
  });