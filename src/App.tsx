import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatbot from "./pages/HomePage";
import AdminRoutes from "./routes/AdminRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
