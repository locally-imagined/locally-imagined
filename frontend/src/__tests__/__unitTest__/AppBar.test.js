import App from "../../components/App";
import AppBar from "../../components/AppBar";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

delete window.location;
window.location = { reload: jest.fn() };
/**
 * @jest-environment node
 */
test("login and log out test", async () => {
  render(<App />);

  let input = screen.getByPlaceholderText("Username");
  fireEvent.change(input, { target: { value: "zzeng" } });
  expect(input.value).toBe("zzeng");
  input = screen.getByPlaceholderText("Password");
  fireEvent.change(input, { target: { value: "12345" } });
  expect(input.value).toBe("12345");
  fireEvent.click(screen.getByText("Login"));
  await waitFor(() => screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("button-logout"));
  await waitFor(() => screen.getByPlaceholderText("Username"));
});

test("sign up test", async () => {
  render(<App />);

  fireEvent.click(screen.getByText("Sign Up"));

  let username = screen.getByTestId("input-username");
  fireEvent.change(username, { target: { value: "sdsa" } });
  expect(username.value).toBe("sdsa");

  let firstname = screen.getByTestId("input-firstname");
  fireEvent.change(firstname, { target: { value: "s" } });
  expect(firstname.value).toBe("s");

  let lastname = screen.getByTestId("input-lastname");
  fireEvent.change(lastname, { target: { value: "d" } });
  expect(lastname.value).toBe("d");

  let phone = screen.getByTestId("input-phone");
  fireEvent.change(phone, { target: { value: "12345" } });
  expect(phone.value).toBe("12345");

  let password = screen.getByTestId("input-password");
  fireEvent.change(password, { target: { value: "12345" } });
  expect(password.value).toBe("12345");

  let email = screen.getByTestId("input-email");
  fireEvent.change(email, { target: { value: "test@sdsa.edu" } });
  expect(email.value).toBe("test@sdsa.edu");

  // fireEvent.click(screen.getByTestId("submit-signup"));
});

test("account menu button test", async () => {
  render(<App />);

  let input = screen.getByPlaceholderText("Username");
  fireEvent.change(input, { target: { value: "zzeng" } });
  expect(input.value).toBe("zzeng");
  input = screen.getByPlaceholderText("Password");
  fireEvent.change(input, { target: { value: "12345" } });
  expect(input.value).toBe("12345");
  fireEvent.click(screen.getByText("Login"));
  await waitFor(() => screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("button-profile"));
  await waitFor(() => screen.getByTestId("nav-logo"));
  fireEvent.click(screen.getByTestId("nav-logo"));
  await waitFor(() => screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("account-setting"));
  fireEvent.click(screen.getByTestId("button-setting"));
  await waitFor(() => screen.getByTestId("nav-logo"));
  fireEvent.click(screen.getByTestId("nav-logo"));
  await waitFor(() => screen.getByTestId("account-setting"));
});
