// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Navigate,
// } from "react-router-dom";

// import Login from "./Pages/Login";
// import Register from "./Pages/Register";

// import Dashboard from "./Pages/Dashboard";

// import ResumeAnalyzer from "./Pages/ResumeAnalyzer";
// import ResumeAnalysis from "./Pages/ResumeAnalysis";
// import CarrerCoach from "./Pages/CarrerCoach";
// import Roadmap from "./Pages/Roadmap";

// import Result from "./Components/Result";

// import JobRecommendations from "./Pages/JobRecommendations";

// import ProtectedRoute from "./Protect/ProtectedRoute";


// function App() {

//     const token = localStorage.getItem("token");

//     return (
//         <BrowserRouter>

//             <Routes>

//                 {/* ==========================================
//                     PUBLIC ROUTES
//                 ========================================== */}

//                 {/* First page */}
//                 <Route
//                     path="/"
//                     element={
//                         token
//                             ? <Navigate to="/dashboard" replace />
//                             : <Navigate to="/register" replace />
//                     }
//                 />

//                 {/* Register */}
//                 <Route
//                     path="/register"
//                     element={
//                         token
//                             ? <Navigate to="/dashboard" replace />
//                             : <Register />
//                     }
//                 />

//                 {/* Login */}
//                 <Route
//                     path="/Login"
//                     element={
//                         token
//                             ? <Navigate to="/dashboard" replace />
//                             : <Login />
//                     }
//                 />


//                 {/* ==========================================
//                     PROTECTED ROUTES
//                 ========================================== */}

//                 {/* Dashboard */}

//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <Dashboard />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Resume Analyzer */}

//                 <Route
//                     path="/resume-analyzer"
//                     element={
//                         <ProtectedRoute>
//                             <ResumeAnalyzer />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Resume Analysis */}

//                 <Route
//                     path="/resume-analysis/:id"
//                     element={
//                         <ProtectedRoute>
//                             <ResumeAnalysis />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Result */}

//                 <Route
//                     path="/result"
//                     element={
//                         <ProtectedRoute>
//                             <Result />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Career Coach */}

//                 <Route
//                     path="/career-coach"
//                     element={
//                         <ProtectedRoute>
//                             <CarrerCoach />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Career Roadmap */}

//                 <Route
//                     path="/roadmap"
//                     element={
//                         <ProtectedRoute>
//                             <Roadmap />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* Job Recommendations */}

//                 <Route
//                     path="/jobs"
//                     element={
//                         <ProtectedRoute>
//                             <JobRecommendations />
//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* ==========================================
//                     UNKNOWN ROUTE
//                 ========================================== */}

//                 <Route
//                     path="*"
//                     element={
//                         <Navigate to="/" replace />
//                     }
//                 />

//             </Routes>

//         </BrowserRouter>
//     );
// }

// export default App;





import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

import Dashboard from "./Pages/Dashboard.jsx";

import ResumeAnalyzer from "./Pages/ResumeAnalyzer.jsx";
import ResumeAnalysis from "./Pages/ResumeAnalysis.jsx";
import CarrerCoach from "./Pages/CarrerCoach.jsx";
import Roadmap from "./Pages/Roadmap.jsx";

import Result from "./Components/Result.jsx";

import JobRecommendations from "./Pages/JobRecommendations.jsx";

import ProtectedRoute from "./Protect/ProtectedRoute.jsx";

function App() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        token ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Navigate
                                to="/register"
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/register"
                    element={
                        token ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Register />
                        )
                    }
                />

                <Route
                    path="/Login"
                    element={
                        token ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Login />
                        )
                    }
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
                    element={
                        <ProtectedRoute>
                            <ResumeAnalyzer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume-analysis/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeAnalysis />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/result"
                    element={
                        <ProtectedRoute>
                            <Result />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/career-coach"
                    element={
                        <ProtectedRoute>
                            <CarrerCoach />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/roadmap"
                    element={
                        <ProtectedRoute>
                            <Roadmap />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute>
                            <JobRecommendations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;