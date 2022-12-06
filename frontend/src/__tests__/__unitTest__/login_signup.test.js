import App from "../../components/App";
import AppBar from "../../components/AppBar";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";

delete window.location;
window.location = { reload: jest.fn() };

/**
 * @jest-environment node
 */
it("login and log out test", async () => {
  act(() => {
    render(<App />);
    expect(() => screen.getByTestId("app-logo"));
  });
  act(() => {
    const username = screen.getByPlaceholderText("Username");
    fireEvent.change(username, { target: { value: "zzeng" } });
    expect(username.value).toBe("zzeng");
  });
  act(() => {
    const password = screen.getByPlaceholderText("Password");
    fireEvent.change(password, { target: { value: "12345" } });
    expect(password.value).toBe("12345");
  });
  await waitFor(() => {
    fireEvent.click(screen.getByText("Login"));
    expect(() => screen.getByTestId("account-setting"));
  });

  await waitFor(() => {
    fireEvent.click(screen.getByTestId("account-setting"));
    fireEvent.click(screen.getByTestId("button-logout"));
    expect(() => screen.getByText("Sign Up"));
  });
});

it("sign up test", async () => {
  act(() => {
    render(<App />);
    expect(() => screen.getByTestId("app-logo"));
  });

  let username, firstname, lastname, phone, password, email;
  act(() => {
    fireEvent.click(screen.getByText("Sign Up"));
    expect(() => screen.getByTestId("input-username"));
  });

  act(() => {
    username = screen.getByTestId("input-username");
    fireEvent.change(username, { target: { value: "sdsa" } });
    expect(username.value).toBe("sdsa");
  });

  act(() => {
    firstname = screen.getByTestId("input-firstname");
    fireEvent.change(firstname, { target: { value: "s" } });
    expect(firstname.value).toBe("s");
  });

  act(() => {
    lastname = screen.getByTestId("input-lastname");
    fireEvent.change(lastname, { target: { value: "d" } });
    expect(lastname.value).toBe("d");
  });

  act(() => {
    phone = screen.getByTestId("input-phone");
    fireEvent.change(phone, { target: { value: "12345" } });
    expect(phone.value).toBe("12345");
  });

  act(() => {
    password = screen.getByTestId("input-password");
    fireEvent.change(password, { target: { value: "12345" } });
    expect(password.value).toBe("12345");
  });

  act(() => {
    email = screen.getByTestId("input-email");
    fireEvent.change(email, { target: { value: "test@sdsa.edu" } });
    expect(email.value).toBe("test@sdsa.edu");
  });

  fireEvent.click(screen.getByTestId("submit-signup"));
});
