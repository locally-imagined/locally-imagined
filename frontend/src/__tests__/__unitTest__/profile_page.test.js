import App from "../../components/App";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

delete window.location;
window.location = { reload: jest.fn() };
afterEach(cleanup);
/**
 * @jest-environment node
 */
it("login can see account ", async () => {
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
    fireEvent.click(screen.getByTestId("button-profile"));
  });
  await act(() => {
    const user = screen.getByTestId("account-detail");
    expect(user.textContent).toBe("z");
  });
});
