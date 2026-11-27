import type { Locator, Page } from "@playwright/test";

class MyBookingsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  findBookingCard(bookingReference: string): Locator {
    return this.page.getByTestId("booking-card").filter({ hasText: bookingReference });
  }
}

export { MyBookingsPage };
