import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { getCredentials } from "../utils/credentials";
import { MyBookingsPage } from "../pages/mybookings";

test("Login into EventHub", async ({ page }) => {
  const { email, password } = getCredentials();
  await page.goto("/login");
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
  await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible();
});

test("Booking an Event", async ({ page }) => {
  const { email, password } = getCredentials();
  await page.goto("/login");
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
  await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible();
  await page.getByRole("link", { name: "Browse Events →" }).click();
  await expect(page).toHaveURL("/events");
  const eventCard = page.getByTestId("event-card").filter({ hasText: "Hollywood Monsoon Night — Los Angeles" });
  await eventCard.getByRole("link", { name: "Book Now" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.locator("#ticket-count")).toHaveText("3");
  await page.getByLabel("Full Name").fill("Alex Melon");
  await page.getByLabel("Email").fill("alex.melon@example.com");
  await page.getByLabel("Phone Number").fill("2025550147");
  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByRole("heading", { name: "Booking Confirmed" })).toBeVisible();
  const bookingReference = await page.locator(".booking-ref").innerText();
  await page.getByRole("button", { name: "View My Bookings" }).click();
  const myBookingsPage = new MyBookingsPage(page);
  const bookingCard = myBookingsPage.findBookingCard(bookingReference);
  await expect(bookingCard.getByText("confirmed", { exact: true })).toBeVisible();
  await bookingCard.getByRole("button", { name: "View Details" }).click();
  await expect(page.getByRole("main").getByRole("navigation")).toContainText(bookingReference);
  await page.getByRole("button", { name: "Cancel Booking" }).click();
  await expect(page.getByRole("dialog")).toContainText(bookingReference);
  await page.getByRole("dialog").getByRole("button", { name: "Yes, cancel it" }).click();
});



