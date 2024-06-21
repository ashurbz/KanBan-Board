import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
// implmented lazy loading
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));

const DashBoard = lazy(() => import("./pages/DashBoard"));

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
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
