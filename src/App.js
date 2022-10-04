/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Dashboard from "./dashboard/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "./pages/login";
import AppsPage from "./pages/apps";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./rootStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { storeSetDashboardData } from "./store/data-reducer";
import { PersistGate } from "redux-persist/integration/react";
import UserManager from "./pages/users";
import StyleGlobal from "./styles";

const RootRouter = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = useSelector((state) => state?.auth?.token);
  console.log("useruseruser", user);
  const dispatch = useDispatch();
  var coeSocket = null;
  const AUTH_TOKEN = token;
  const COE_WS_URL = "wss://coe.unopixel.io/ws/data/AnT/";
  const SUB_PROTOCOL = ["Token", AUTH_TOKEN];

  function wsConnectionCOE(url, options, ws_message) {
    console.log("Connecting...");
    coeSocket = new WebSocket(url, options);

    coeSocket.onopen = function (e) {
      if (ws_message == "reload") {
        coeSocket.send(
          JSON.stringify({
            message: ws_message,
          })
        );
      }
    };

    coeSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      const message = data.message.data
        ? JSON.parse(data.message.data)
        : data.message + "\n";
      // YOUR CODE HERE TO HANDLE MESSAGE...
      // Em lấy message server gửi về ở đây rồi xử lý tiếp nhé
      console.log("message", message);
      if (message) {
        dispatch(storeSetDashboardData(message));
      }
    };
  }

  useEffect(() => {
    if (token) {
      wsConnectionCOE(COE_WS_URL, SUB_PROTOCOL);
    }
  }, [token]);

  return (
    <div>
      <Suspense>
        {token ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/survey_urls" element={<Dashboard />} />
            <Route path="/raw_data" element={<Dashboard />} />
            <Route path="/documents" element={<Dashboard />} />
            <Route path="/user_management" element={<Dashboard />} />
            <Route path="/exportData" element={<Dashboard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AppsPage />} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StyleGlobal />
          <RootRouter />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
