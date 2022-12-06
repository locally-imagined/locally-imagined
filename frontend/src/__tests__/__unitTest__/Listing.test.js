import App from "../../components/App";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

delete window.location;

window.location = { reload: jest.fn() };

it("listing items rendered", async () => {
  act(() => {
    render(<App />);
  });
  expect(() => screen.getByTestId("image-0"));
});
// it("open item test", async () => {
//   act(() => {
//     render(<App />);
//     expect(() => screen.getByTestId("open-image-0"));
//   });

//   await waitFor(() => {
//     fireEvent.click(screen.getByTestId("open-image-0"));
//     expect(() => screen.getByTestId("user-avatar"));
//   });
// });
