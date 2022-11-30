import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../components/App.js";

/**
 */
test("App Renders", async () => {
  render(<App />);
});
