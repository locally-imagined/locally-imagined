import App from "../../components/App";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

delete window.location;

window.location = { reload: jest.fn() };

test("listing items rendered", async () => {
  await waitFor(() => {
    render(<App />);
    expect(() => screen.getByTestId("image-0"));
  });
});
test("open item test", async () => {
  await waitFor(() => {
    render(<App />);
    expect(() => screen.getByTestId("open-image-0"));
  });
  // await waitFor(() => {
  //   fireEvent.click(screen.getByTestId("open-image-0"));
  //   expect(() => screen.getByTestId("user-avatar"));
  // });
});
