import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/testProvider";
import { RegisterForm } from "../RegisterForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom")
}));
describe("RegisterForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders LoginForm correctly", () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderWithProviders(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/First Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });
});
