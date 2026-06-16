import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import JobCard from "../components/JobCard";

describe("JobCard", () => {

  test("renders company and role", () => {
    render(
      <JobCard
        company="Google"
        role="Software Engineer Intern"
        date="2025-07-20"
        status="Applied"
        onClick={vi.fn()}
      />
    );

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(
      screen.getByText("Software Engineer Intern")
    ).toBeInTheDocument();
  });

  test("shows formatted date", () => {
    render(
      <JobCard
        company="Google"
        role="Intern"
        date="2025-07-20"
        status="Applied"
        onClick={vi.fn()}
      />
    );

    expect(
      screen.getByText("20 Jul 25")
    ).toBeInTheDocument();
  });

  test("shows status", () => {
    render(
      <JobCard
        company="Google"
        role="Intern"
        date="2025-07-20"
        status="Interviewing"
        onClick={vi.fn()}
      />
    );

    expect(
      screen.getByText("Interviewing")
    ).toBeInTheDocument();
  });

  test("shows dash when date is missing", () => {
    render(
      <JobCard
        company="Google"
        role="Intern"
        date=""
        status="Applied"
        onClick={vi.fn()}
      />
    );

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("calls onClick when card is clicked", async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(
      <JobCard
        company="Google"
        role="Intern"
        date="2025-07-20"
        status="Applied"
        onClick={mockClick}
      />
    );

    await user.click(screen.getByText("Google"));

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

});