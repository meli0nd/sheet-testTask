import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"

const App = () => {
  return (
    <div>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <div></div>
    </div>
  )
}

export default App
