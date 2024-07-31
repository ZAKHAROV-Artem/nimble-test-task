import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "@/store";

type ProviderProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProviderProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}
