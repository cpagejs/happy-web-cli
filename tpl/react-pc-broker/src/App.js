import React from "react";
import AppRouter from "./router";
import { AppProvider } from "./context/appContext";
import LangProvider from "./languages";
import "./App.less";

console.log(NODE_ENV)

function App() {
  return (
    <AppProvider>
      <LangProvider>
        <AppRouter />
      </LangProvider>
    </AppProvider>
  );
}
export default App;


