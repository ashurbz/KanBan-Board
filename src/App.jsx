import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

// implmented lazy loading
const SignUp = lazy(() => import("./pages/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn"));

function App() {
  return (
    <>
      {/* implemented routing */}
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
