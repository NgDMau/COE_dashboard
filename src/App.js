import "./App.css";
import Dashboard from "./dashboard/index";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "./pages/login";
import AppsPage from "./pages/apps";

const RootRouter = function () {
  const navigate = useNavigate();
  const isAuth = true;
  return (
    <div>
      <Suspense>
        {isAuth ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apps" element={<AppsPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  );
}

export default App;
