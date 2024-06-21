import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import PrivateRoute from "./components/PrivateRoute";

// implmented lazy loading
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));

const DashBoard = lazy(() => import("./pages/DashBoard"));
const TaskManagement = lazy(() => import("./pages/TaskManagement"));

function App() {
  return (
    <div className="layout">
      {/* implemented routing */}
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/task_management"
              element={
                <PrivateRoute>
                  <TaskManagement />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
