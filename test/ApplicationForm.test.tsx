import ApplicationForm from "../components/NewApplicForm";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, beforeEach } from "vitest";

// ─── router mock ────────────────────────────────────────────────────────────
const pushMock    = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

// ─── helpers ─────────────────────────────────────────────────────────────────
/** Fill in the two required fields so client-side validation passes. */
async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Company Name"), "Acme Corp");
  await user.type(screen.getByLabelText("Role Title"),   "Engineer");
}

// Reset mocks between tests so state doesn't leak.
beforeEach(() => {
  pushMock.mockClear();
  refreshMock.mockClear();
});

// ─── rendering ───────────────────────────────────────────────────────────────
test("renders all form fields", () => {
  render(<ApplicationForm />);

  expect(screen.getByText("Company Name")).toBeInTheDocument();
  expect(screen.getByText("Role Title")).toBeInTheDocument();
  expect(screen.getByText("Date Applied")).toBeInTheDocument();
  expect(screen.getByText("Source")).toBeInTheDocument();
  expect(screen.getByText("Status")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

// ─── input behaviour ─────────────────────────────────────────────────────────
test("allows user input in company name field", async () => {
  const user = userEvent.setup();
  render(<ApplicationForm />);

  const companyInput = screen.getByLabelText("Company Name");
  await user.type(companyInput, "Microsoft");
  expect(companyInput).toHaveValue("Microsoft");
});

test("status select updates when an option is chosen", async () => {
  const user = userEvent.setup();
  render(<ApplicationForm />);

  const select = screen.getByRole("combobox");
  await user.selectOptions(select, "Interviewing");
  expect(select).toHaveValue("Interviewing");
});

// ─── client-side validation ───────────────────────────────────────────────────
test("shows inline errors when required fields are empty on submit", async () => {
  const user = userEvent.setup();
  render(<ApplicationForm />);

  // Submit with no fields filled — no fetch should be called
  global.fetch = vi.fn();
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("Company name is required.")).toBeInTheDocument();
  expect(screen.getByText("Role title is required.")).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

// ─── successful submission ────────────────────────────────────────────────────
test("form submits and redirects when required fields are filled", async () => {
  const user = userEvent.setup();

  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response)
  );

  render(<ApplicationForm />);
  await fillRequiredFields(user);

  await user.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() => { expect(pushMock).toHaveBeenCalledWith("/"); });
});

// ─── server error handling ────────────────────────────────────────────────────
test("shows server error message when API returns a non-ok response", async () => {
  const user = userEvent.setup();

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Server error" }),
    } as Response)
  );

  render(<ApplicationForm />);
  await fillRequiredFields(user);

  await user.click(screen.getByRole("button", { name: /submit/i }));
  expect(await screen.findByText("Server error")).toBeInTheDocument();
});