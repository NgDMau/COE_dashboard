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
import { storeSetListHasTag } from "./store/data-reducer";

const RootRouter = function () {
  const navigate = useNavigate();
  const isAuth = true;
  const listRowData = useSelector((state) => state.data.listRowData);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(storeSetListHasTag(listRowData.concat(listRowData[0])))
  }, []);
  // const authToken = "2da85980d74b87041eaa3d01f9d3f619c584aff5";
  // const chatSocket = new WebSocket(
  //   "wss://" + "f99b-113-175-119-25.ngrok.io" + "/ws/data/" + "AnT" + "/",
  //   ["Token", authToken]
  // );
  // useEffect(() => {
  //   chatSocket.onmessage = function (e) {
  //     const data = JSON.parse(e?.data);
  //     console.log("ssss", data);
  //     const message = JSON.parse(
  //       data?.message?.replaceAll(`'`, `"`).replaceAll("None", `null`)
  //     );
  //     console.log("dataaa", message);
  //     if (message) {
  //       dispatch(storeSetListHasTag(listRowData.concat(message)));
  //     }
  //   };
  // }, [listRowData]);

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
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
