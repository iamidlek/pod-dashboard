import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";
import stores from "./store";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={stores}>
    <App />
  </Provider>
);
