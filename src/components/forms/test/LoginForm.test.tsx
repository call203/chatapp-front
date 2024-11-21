import { fireEvent, screen } from "@testing-library/react";

import { LoginForm } from "../LoginForm";
import { renderWithProviders } from "../../../utils/testProvider";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom")
}));

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders LoginForm correctly", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
