import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import JobModal from "../components/Modal";

const mockJob = {
  _id: "123",
  companyName: "Google",
  roleTitle: "Software Engineer Intern",
  dateApplied: new Date("2025-07-20"),
  source: "LinkedIn",
  status: "Applied",
};

test("renders job information", () => {
  render(
    <JobModal
      job={mockJob}
      onClose={vi.fn()}
      onDelete={vi.fn()}
    />
  );

  expect(
    screen.getByDisplayValue("Google")
  ).toBeInTheDocument();

  expect(
    screen.getByDisplayValue("Software Engineer Intern")
  ).toBeInTheDocument();

  expect(
    screen.getByDisplayValue("2025-07-20")
  ).toBeInTheDocument();
});

test("allows editing company name", async () => {
  const user = userEvent.setup();

  render(
    <JobModal
      job={mockJob}
      onClose={vi.fn()}
      onDelete={vi.fn()}
    />
  );

  const companyInput =
    screen.getByDisplayValue("Google");

  await user.clear(companyInput);
  await user.type(companyInput, "Microsoft");

  expect(companyInput).toHaveValue("Microsoft");
});

test("calls onClose when close button clicked", async () => {
  const user = userEvent.setup();

  const mockClose = vi.fn();

  render(
    <JobModal
      job={mockJob}
      onClose={mockClose}
      onDelete={vi.fn()}
    />
  );

  await user.click(
    screen.getByRole("button", {
      name: /close/i,
    })
  );

  expect(mockClose).toHaveBeenCalledTimes(1);
});

test("calls onDelete with job id", async () => {
  const user = userEvent.setup();

  const mockDelete = vi.fn();

  render(
    <JobModal
      job={mockJob}
      onClose={vi.fn()}
      onDelete={mockDelete}
    />
  );

  await user.click(
    screen.getByRole("button", {
      name: /delete/i,
    })
  );

  expect(mockDelete)
    .toHaveBeenCalledWith("123");
});

test("updates application", async () => {
  const user = userEvent.setup();

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status : 200,
      json : async ()=> ({
        message : "Updated successfully"
      }), 
    } as Response)
  )as typeof fetch;

  const mockClose = vi.fn();

  render(
    <JobModal
      job={mockJob}
      onClose={mockClose}
      onDelete={vi.fn()}
    />
  );

  await user.click(
    screen.getByRole("button", {
      name: /save changes/i,
    })
  );

  await waitFor(() => {
    expect(fetch).toHaveBeenCalled();
  });

  expect(mockClose).toHaveBeenCalled();
});