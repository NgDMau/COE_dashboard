import "./App.css";
import Dashboard from "./dashboard/index";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import LoginPage from "./pages/login";
import AppsPage from "./pages/apps";

const RootRouter = function () {
  const navigate = useNavigate();
  const isAuth = true;

  // useEffect(() => {
  //   const authToken = "2da85980d74b87041eaa3d01f9d3f619c584aff5";
  //   const chatSocket = new WebSocket(
  //     "wss://" + "5b48-58-186-117-1.ngrok.io" + "/ws/data/" + "AnT" + "/",
  //     ["Token", authToken]
  //   );
  //   chatSocket.onmessage = function (e) {
  //     const data = JSON.parse(e.data);
  //     console.log("dataaa", data)
  //   };
  // }, []);

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
