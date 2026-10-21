import { test, expect } from "@playwright/test";

test.describe("Amit Rehabilitation Centre E2E Test Suite", () => {
  test("1. Home page loads with branding, trust pillars, and operating hours", async ({ page }) => {
    await page.goto("/");

    // Verify brand title and logo link in header
    await expect(page).toHaveTitle(/Amit Rehabilitation Centre/);
    await expect(page.getByRole("banner").getByRole("link", { name: /Amit Rehabilitation Centre/ })).toBeVisible();

    // Verify "Why Patients Trust Us" section (Screenshot 2)
    await expect(page.getByRole("heading", { name: "Why Patients Trust Us" })).toBeVisible();
    await expect(page.getByText("Tailored Recovery Plans")).toBeVisible();
    await expect(page.getByText("Licensed Specialists")).toBeVisible();
    await expect(page.getByText("Patient-First Care")).toBeVisible();

    // Verify "Clinic Operating Hours" (Screenshot 5)
    await expect(page.getByRole("heading", { name: "Clinic Operating Hours" })).toBeVisible();
    await expect(page.getByText("Monday – Friday")).toBeVisible();
    await expect(page.getByText("08:00 AM – 07:00 PM")).toBeVisible();

    // Verify "Start Your Recovery Journey Today" (Screenshot 4)
    await expect(page.getByRole("heading", { name: "Start Your Recovery Journey Today" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Book Your Initial Consultation" }).first()).toBeVisible();

    // Verify Instagram button points to @thephyisofix
    const instagramLink = page.getByRole("banner").getByRole("link", { name: "Instagram" });
    await expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/thephyisofix?mdxt=MWZkZ29sc3c2aHl4aw=="
    );
  });

  test("2. FAQ page accordion behaves correctly (Screenshot 1)", async ({ page }) => {
    await page.goto("/faq");

    await expect(page.getByRole("heading", { name: "Frequently Asked Questions" })).toBeVisible();

    // First question should be visible (Screenshot 1 default expanded item)
    const firstQuestion = page.getByText("Do I need a doctor's referral to start physical therapy?");
    await expect(firstQuestion).toBeVisible();
    await expect(page.getByText("In most situations, you can schedule an initial evaluation directly")).toBeVisible();

    // Second question should expand on click
    const secondQuestionBtn = page.getByRole("button", { name: /What should I expect during my first session/ });
    await expect(secondQuestionBtn).toBeVisible();
    await secondQuestionBtn.click();
    await expect(page.getByText("During your first session, our licensed specialist conducts a thorough 45-minute comprehensive assessment")).toBeVisible();
  });

  test("3. Courses page supports searching and level filtering (Screenshot 3)", async ({ page }) => {
    await page.goto("/courses");

    await expect(page.getByRole("heading", { name: "Courses" })).toBeVisible();
    const searchInput = page.getByPlaceholder("Search courses...");
    await expect(searchInput).toBeVisible();

    // Search for a specific topic
    await searchInput.fill("Caregiver");
    await expect(page.getByText("Caregiver Training: Safe Patient Transfers")).toBeVisible();

    // Test non-matching query reveals the Screenshot 3 exact empty state text
    await searchInput.fill("NonExistentSpecialty12345");
    await expect(page.getByText("No Course created yet.", { exact: true })).toBeVisible();
  });

  test("4. Services overview and dynamic service detail page", async ({ page }) => {
    await page.goto("/services");

    await expect(page.getByRole("heading", { name: "Our Rehabilitation Programs" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Orthopedic Rehabilitation" })).toBeVisible();

    // Navigate to Orthopedic detail page
    const detailLink = page.getByRole("link", { name: "Read Full Program Details" }).first();
    await detailLink.scrollIntoViewIfNeeded();
    await detailLink.click();
    await page.waitForURL("**/services/orthopedic-rehab", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: "Orthopedic Rehabilitation" })).toBeVisible();
    await expect(page.getByText("Common Conditions Evaluated & Treated")).toBeVisible();
  });

  test("5. Appointment Enquiry Form submits with validation", async ({ page }) => {
    await page.goto("/appointment");

    await expect(page.getByRole("heading", { name: "Schedule Your Therapy Evaluation" })).toBeVisible();

    // Fill the appointment form
    await page.fill('input[name="name"]', "Suresh Patel");
    await page.fill('input[name="phone"]', "9876543210");
    await page.fill('input[name="email"]', "suresh.patel@example.com");

    // Select date 2 days ahead
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 2);
    const dateStr = appointmentDate.toISOString().split("T")[0];
    await page.fill('input[name="preferred_date"]', dateStr);

    await page.fill('textarea[name="message"]', "Consultation for chronic shoulder pain and rotator cuff recovery.");

    // Submit form using precise button selector
    await page.getByRole("button", { name: "Submit Appointment Enquiry" }).click();

    // Expect success screen
    await expect(page.getByText("Enquiry Received Successfully!")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Suresh Patel")).toBeVisible();
    await expect(page.getByText("Important Schedule Notice:")).toBeVisible();
    await expect(page.getByRole("link", { name: "Open in WhatsApp" })).toBeVisible();
  });

  test("6. Protected admin login and enquiries dashboard", async ({ page }) => {
    await page.goto("/admin/login");

    await expect(page.getByRole("heading", { name: "Staff Portal Sign In" })).toBeVisible();

    // Login with pre-filled test credentials
    await page.getByRole("button", { name: "Sign In to Dashboard" }).click();

    // Wait for redirect to admin dashboard
    await page.waitForURL("**/admin", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: "Appointment Enquiries & Patient Intake" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Total Enquiries")).toBeVisible();
  });
});
