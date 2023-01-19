import App from "../../components/App";
import Listing from "../../components/Listing";
import FrontPage from "../../components/FrontPage";
import { act } from "react-dom/test-utils";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import * as axios from "axios";

delete window.location;

window.location = { reload: jest.fn() };
afterEach(cleanup);
it("listing items page rendered", async () => {
  await act(async () => {
    render(<FrontPage />);
  });
  const imagePage = screen.getByTestId("image-page");
  fireEvent.load(imagePage);
});
