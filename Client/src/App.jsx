// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import ResumeAnalyzer from "./Pages/ResumeAnalyzer";
// import ResumeAnalysis from "./Pages/ResumeAnalysis";
// import CarrerCoach from "./Pages/CarrerCoach";
// import Roadmap from "./Pages/Roadmap";
// import JobRecommendations from "./pages/JobRecommendations";
// import ProtectedRoute from "./Protect/ProtectedRoute";



import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./Pages/Dashboard";

import ResumeAnalyzer from "./Pages/ResumeAnalyzer";
import ResumeAnalysis from "./Pages/ResumeAnalysis";
import CarrerCoach from "./Pages/CarrerCoach";
import Roadmap from "./Pages/Roadmap";

import JobRecommendations from "./pages/JobRecommendations";

import ProtectedRoute from "./Protect/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to={token ? "/dashboard" : "/login"}
            />
          }
        />

        <Route
          path="/Login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />

        <Route
          path="/resume-analysis/:id"
          element={<ResumeAnalysis />}
        />

        <Route
          path="/career-coach"
          element={<CarrerCoach />}
        />

        <Route path="roadmap"
          element={<Roadmap />}
        />

        <Route
          path="/jobs"
          element={
            <JobRecommendations />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;



