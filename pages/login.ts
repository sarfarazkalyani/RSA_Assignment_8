import type { Page } from "@playwright/test";

class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(email: string, password: string) {
        await this.page.getByLabel("Email").fill(email);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button", { name: "Sign In" }).click();
    }
}

export { LoginPage };
