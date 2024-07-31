import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { render } from "../../tests/utils";
import { Contact } from "../../types/contacts";
import ContactItem from "./contact-item";

const contact: Contact = {
  id: "1",
  record_type: "person",
  fields: {
    "first name": [{ label: "First Name", modifier: "primary", value: "John" }],
    "last name": [{ label: "Last Name", modifier: "primary", value: "Doe" }],
    email: [
      { label: "Email", modifier: "primary", value: "john.doe@example.com" },
    ],
  },
  owner_id: "owner-id",
  avatar_url: "https://example.com/avatar.jpg",
  tags: [{ id: "1", tag: "Friend" }],
  created: "2024-01-01T00:00:00Z",
  updated: "2024-01-01T00:00:00Z",
  privacy: {
    read: "public",
    edit: "private",
  },
};

describe("ContactItem", () => {
  it("renders the contact item text", () => {
    render(<ContactItem contact={contact} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Friend")).toBeInTheDocument();
  });

  it("renders the contact item avatar", () => {
    render(<ContactItem contact={contact} />);
    const imgElement = screen.getByAltText("John Doe's avatar");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });
});
