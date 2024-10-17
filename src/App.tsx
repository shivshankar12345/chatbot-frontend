import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoute";
import FormPage from "./pages/FormPage";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/chatbot/admin/:businessName/*" element={<AdminRoutes />}></Route>
        <Route path="/chatbot/user/:businessName" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
