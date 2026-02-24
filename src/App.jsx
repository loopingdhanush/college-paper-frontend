import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import QuestionBank from "./pages/QuestionBank"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="question-bank" />} />
          <Route path="question-bank" element={<QuestionBank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App