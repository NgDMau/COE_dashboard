/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Document from "./document";
import i18next from "i18next";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Segmented } from "antd";

import RowData from "./row-data";
import SurveyLink from "./survey";
import ExportData from "./export-data";
import iconVietnam from "../assets/icon/vietnam.png";
import FilterComponent from "../dashboard/filter";
import iconUnitedStates from "../assets/icon/united-states.png";
import UserManager from "./../pages/users/index";

import { sendGet } from "../api/axios";
import { EDepartment } from "../common/const";
import { SCREEN_DEFAULT } from "../common/ngok";
import { storeSetLanguage } from "../store/auth-reducer";
import {
  storeSetCitySelected,
  storeSetDashboardData,
  storeSethospitalSelected,
  storeSetTableData,
} from "../store/data-reducer";
import {
  Buttonanguage,
  ContainerWrapper,
  IConLanguage,
  PathWrapper,
} from "./styled";
import Home from "./Home/Home";

const AppContainer = ({ screen, title, setScreen }) => {
  const dispath = useDispatch();
  const location = useLocation();
  const patch = location?.pathname || "/dashboard";
  const isCollapse = useSelector((state) => state.dashboard.isCollapse);

  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );

  const [value, setValue] = useState(EDepartment.OBSTETRIC);
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (selectedCode) => {
    try {
      setIsLoading(true);
      const response = await sendGet(
        `/dm/data/evaluation?hospital=${selectedCode}`
      );
      if (response[0]) {
        dispath(storeSetDashboardData(response));
      }
    } catch (error) {
      dispath(storeSetDashboardData(null));
    } finally {
      setIsLoading(false);
      getOverView(hospitalSelected?.code);
    }
  };

  const getOverView = async (selectedCode) => {
    try {
      const response = await sendGet(
        `/dm/data/evaluation/overview?hospital=${selectedCode}`
      );
      if (response?.status === "successful") {
        dispath(storeSetTableData(response?.data));
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (hospitalSelected) {
      getDataDashboard(hospitalSelected?.code);
      setValue(EDepartment.OBSTETRIC);
    }
  }, [hospitalSelected]);

  return (
    <ContainerWrapper isCollapse={isCollapse}>
      <div className="header">
        <PathComponent screen={screen} setScreen={setScreen} />
        <FilterComponent
          disabled={
            patch === SCREEN_DEFAULT[2] ||
            patch === SCREEN_DEFAULT[4] ||
            patch === SCREEN_DEFAULT[6]
          }
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {patch === SCREEN_DEFAULT[1] || patch === "/" ? (
        <Home
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          value={value}
          setValue={setValue}
        />
      ) : (
        <div />
      )}
      {patch === SCREEN_DEFAULT[2] && <SurveyLink />}
      {patch === SCREEN_DEFAULT[3] && <RowData />}
      {patch === SCREEN_DEFAULT[4] && <Document title={title} />}
      {patch === SCREEN_DEFAULT[6] && <ExportData />}
      {patch === SCREEN_DEFAULT[7] && <UserManager />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function PathComponent({ screen, setScreen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.auth?.language);
  const setLanguage = (languageChange) => {
    dispatch(storeSetLanguage(languageChange));
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage("vi");
                setLanguage("vi");
              }}
            >
              <IConLanguage src={iconVietnam} alt="" /> {t("common.vietNam")}
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage("en");
                setLanguage("en");
              }}
            >
              <IConLanguage src={iconUnitedStates} alt="" />{" "}
              {t("common.engLish")}
            </div>
          ),
        },
      ]}
    />
  );
  const screenFake = [
    t("screen.surveyResults"),
    t("screen.surveyLink"),
    t("screen.rowData"),
    t("screen.regulations"),
    t("screen.exportReport"),
  ];
  return (
    <PathWrapper>
      <div>
        <span
          onClick={() => {
            dispatch(storeSetCitySelected(null));
            dispatch(storeSethospitalSelected(null));
            setScreen(1);
            // window.location.reload();
          }}
        >
          {t("screen.home")}
        </span>{" "}
        / {screenFake[screen - 1]}
      </div>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Buttonanguage>
          {" "}
          <IConLanguage
            src={language === "vi" ? iconVietnam : iconUnitedStates}
            alt=""
          />{" "}
          {language}
        </Buttonanguage>
      </Dropdown>
    </PathWrapper>
  );
}

export const HeaderScreen = ({ value, setValue }) => {
  const { t } = useTranslation();
  return (
    <div className="segmented">
      <Segmented
        options={[
          { label: t("dashBoard.obstetricDept"), value: EDepartment.OBSTETRIC },
          { label: t("dashBoard.pediatricDept"), value: EDepartment.PEDIATRIC },
        ]}
        value={value}
        onChange={setValue}
        size="large"
      />
    </div>
  );
};
