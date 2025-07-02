import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Authentication from "./pages/Authentication.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/VideoMeet.jsx";
import HomeComponent from "./pages/Home.jsx";
import History from "./pages/History.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/auth" element={<Authentication />} />

            <Route path="/home" s element={<HomeComponent />} />
            <Route path="/history" element={<History />} />
            <Route path="/:url" element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
