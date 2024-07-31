import { RenderOptions, render } from "@testing-library/react";
import { ReactNode } from "react";

import Providers from "../providers";

const customRender = (
  ui: ReactNode,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
