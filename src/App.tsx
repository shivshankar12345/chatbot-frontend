import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatbot from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}
 
export default App;
 
 