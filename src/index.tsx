import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { store } from "./Redux/store/store"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
