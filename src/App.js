import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="monitoring/pending" element={<Pending/>}></Route>
          <Route path="monitoring/completed" element={<Completed/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
