import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Containers/Home/Home";
import UserDetails from "./Containers/UserDetails/UserDetails";
import Repo from "./Containers/Repo/Repo";
import NotFound from "./Containers/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="main-card">
        <div className="main-title">
          <h1>GitFinder</h1>
        </div>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:username" element={<UserDetails />} />
            <Route path="/repo" element={<Repo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
