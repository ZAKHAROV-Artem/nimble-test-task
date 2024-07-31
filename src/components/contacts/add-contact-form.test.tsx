import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import toast from "react-hot-toast";
import { describe, expect, it, vi } from "vitest";

import { render } from "../../tests/utils";
import AddContactForm from "./add-contact-form";

vi.mock("react-hot-toast");

describe("AddContactForm", () => {
  it("renders the form fields correctly", () => {
    render(<AddContactForm />);

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add contact/i }),
    ).toBeInTheDocument();
  });

  it("displays validation errors when fields are empty", async () => {
    user.setup();
    render(<AddContactForm />);

    await user.click(screen.getByRole("button", { name: /Add contact/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it("submits the form successfully when fields are filled correctly", async () => {
    user.setup();

    render(<AddContactForm />);

    await user.type(screen.getByLabelText(/First name/i), "John");
    await user.type(screen.getByLabelText(/Last name/i), "Doe");
    await user.type(screen.getByLabelText(/Email/i), "john.doe@example.com");

    await user.click(screen.getByRole("button", { name: /Add contact/i }));

    expect(toast.success).toHaveBeenCalledWith("Contact added successfully");
  });
});
