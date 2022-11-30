import App from "../../components/App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

test("Button test", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Sign Up"));
});
/**
 * @jest-environment node
 */
// test("login and log out test", async () => {
//   render(<App />);
//   let input = screen.getByPlaceholderText("Username");
//   fireEvent.change(input, { target: { value: "zzeng" } });
//   expect(input.value).toBe("zzeng");
//   input = screen.getByPlaceholderText("Password");
//   fireEvent.change(input, { target: { value: "12345" } });
//   expect(input.value).toBe("12345");
//   fireEvent.click(screen.getByText("Login"));
//   await waitFor(() => screen.getAllByTestId("account-setting"));
// });
