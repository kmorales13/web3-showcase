import { createRoot } from "react-dom/client"
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react"
import { BrowserRouter as Router } from "react-router-dom"
import { StateContextProvider } from "./context"

import App from "./App"

import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
  <ThirdwebProvider activeChain={ChainId.Goerli}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
)