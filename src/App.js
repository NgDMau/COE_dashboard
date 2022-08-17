import "./App.css";
import Dashboard from "./dashboard/index";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "./pages/login";
import AppsPage from "./pages/apps";
import { Provider } from "react-redux";
import { store } from "./rootStore";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  storeSetDashboardData,
  storeSetListHasTag,
} from "./store/data-reducer";
import { useState } from "react";

const RootRouter = function () {
  const navigate = useNavigate();
  const listRowData = useSelector((state) => state.data.listRowData);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("useruseruser", user);
  const dispatch = useDispatch();
  var coeSocket = null;
  const AUTH_TOKEN = user?.token;
  const COE_WS_URL =
    "wss://" + "1527-113-22-84-32.ngrok.io" + "/ws/data/" + "AnT" + "/";
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
      if (message) {
        dispatch(storeSetDashboardData(message));
      }
    };

    // coeSocket.onclose = function (e) {
    //   if (coeSocket.readyState == 3) {
    //     coeSocket = null;
    //     setTimeout(function () {
    //       wsConnectionCOE(url, options, "reload");
    //     }, 5000);
    //   }
    // };
  }

  // const chatSocket = new WebSocket(
  //   "wss://" + "1527-113-22-84-32.ngrok.io" + "/ws/data/" + "AnT" + "/",
  //   ["Token", user?.token]
  // );
  useEffect(() => {
    wsConnectionCOE(COE_WS_URL, SUB_PROTOCOL);

    // chatSocket.onmessage = function (e) {
    //   const data = JSON.parse(e?.data);
    //   console.log("ssss", data);
    //   const message = JSON.parse(
    //     data?.message?.replaceAll(`'`, `"`).replaceAll("None", `null`)
    //   );
    //   console.log("dataaa", message);
    //   if (message) {
    //     dispatch(storeSetListHasTag(listRowData.concat(message)));
    //   }
    // };
  }, [listRowData]);

  return (
    <div>
      <Suspense>
        {user?.token ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apps" element={<AppsPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<LoginPage />} />
            <Route path="/apps" element={<LoginPage />} />
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
        <RootRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
