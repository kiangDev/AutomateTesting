import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { validUsers } from '../test-data/users';
import { invalidUsers } from '../test-data/users';

test.describe('LOGIN FUNCTION', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    //Input กับ Display ต้องตรงกัน 
    test('TC-001: Input fields should display as the data that was filled', async ({ loginPage }) => {
        await loginPage.fillUserPassword('testuser', 'password');

        expect (await loginPage.getUsername()).toBe('testuser');
        expect (await loginPage.getPassword()).toBe('password');
    });

    //ไม่กรอก username แต่กรอก password
    test('TC-002: Should show an error message if log in without a username', async ({ loginPage }) => {
        await loginPage.fillUserPassword('', 'password');
        await loginPage.clickLogin();

        const message = await loginPage.getErrorMessage();
        expect(message).toContain('is required');
        expect(await loginPage.isValidUrl()).toBe(true);
    });

    //ไม่กรอก password แต่กรอก username
    test('TC-003: Should show an error message if log in without a password', async ({ loginPage }) => {
        await loginPage.fillUserPassword('testuser', '');
        await loginPage.clickLogin();

        const message = await loginPage.getErrorMessage();
        expect(message).toContain('is required');
        expect(await loginPage.isValidUrl()).toBe(true);
    });

    //ไม่กรอกทั้ง username และ password
    test('TC-004: Should show an error message if log in with both fields blank', async ({ loginPage }) => {
        await loginPage.fillUserPassword('', '');
        await loginPage.clickLogin();
        
        const message = await loginPage.getErrorMessage();
        expect(message).toContain('is required');
        expect(await loginPage.isValidUrl()).toBe(true);
    });

    //กรอก username และ password ถูก
    validUsers.forEach(({ username, password }) => {
        test(`TC-005: Should logged in successfully with valid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).not.toContain('is required');
            expect(await loginPage.isValidUrl()).toBe(false);
        });
    });


    invalidUsers.forEach(({ username, password }) => {
        test(`TC-006: Should logged in fails with an error message when using invalid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLogin();
            expect(await loginPage.getErrorMessage()).toContain('Epic sadface');
            expect(await loginPage.isValidUrl()).toBe(true);
        });
    });
});