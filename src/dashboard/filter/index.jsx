/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Alert, DatePicker, Segmented } from "antd";
import { Select, Spin } from "antd";

import html2pdf from "html2pdf.js";

import { useSelector, useDispatch } from "react-redux";
import { BtnExportCity, FilterWrapper } from "./styled";
import { linkApi, SCREEN_DEFAULT } from "../../common/ngok";

import {
  storeSetCitiesData,
  storeSetCurrentQuarter,
  storeSetHostpitalData,
  storeSethospitalSelected,
  storeSetCitySelected,
} from "../../store/data-reducer";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { storeSetTab } from "../../store/document-reducer";
import Loading from "../../components/common/Loading/Loading";
import moment from "moment";
import { getListQuanter } from "../../helpers/getListQuanter";

const FilterComponent = ({ disabled, screen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const patch = location?.pathname || "/dashboard";

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const citySelected = useSelector((state) => state.data.citySelected);

  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || 0;
  const citiesData = useSelector((state) => state.data.citiesData);
  const hostPitals = useSelector((state) => state.data.hostPitals);
  const tabDocument = useSelector((state) => state.document.tab);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const defaultCity = useMemo(() => {
    return citySelected?.name || "";
  }, [hospitalSelected, citiesData]);
  const exportPdfData = async () => {
    setIsLoadingScreen(true);
    setTimeout(() => {
      const element = document.getElementById("exportDagta");
      const element2 = document.getElementById("exportDagta2");
      const opt = {
        margin: 1,
        image: { type: "jpeg", quality: 0.98 },
        filename: "KQKS_Q2_2022.pdf",
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["legacy"] },
      };
      html2pdf().set(opt);
      html2pdf()
        .from(element)
        .save("KQKS_SK_Q2_2022.pdf")
        .then(() => {
          setTimeout(() => {
            setIsLoadingScreen(false);
          }, 500);
        });
      html2pdf().from(element2).save("KQKS_NK_Q2_2022.pdf");
    }, 0);
  };

  const getCities = async () => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/province?info=all`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        const reDataCity = data?.provinces;
        reDataCity.unshift({
          name: t("common.none"),
          code: -1,
        });
        dispatch(storeSetCitiesData(reDataCity || []));
      });
  };

  const getHostPital = async (code) => {
    setIsLoading(true);
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/province?code=${code}&info=hospitals`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        const reDataCity = data?.hospitals;
        reDataCity.unshift({
          name: t("common.none"),
          code: -1,
        });
        dispatch(storeSetHostpitalData(reDataCity || []));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const listQuater = useMemo(() => {
    return getListQuanter();
  }, [moment]);

  useEffect(() => {
    getCities();
  }, []);
  return (
    <FilterWrapper>
      {isLoadingScreen && <Loading />}
      <div className="adress">
        {patch === SCREEN_DEFAULT[6] && (
          <div
            className="back"
            onClick={() => navigate(`${SCREEN_DEFAULT[1]}`)}
          >
            {t("filter.back")}
          </div>
        )}
        {!disabled && <span>{t("filter.city")}</span>}
        {!disabled ? (
          <Select
            defaultValue={defaultCity || t("common.none")}
            className="select-city"
            onChange={(e) => {
              getHostPital(citiesData[e].code);
              dispatch(storeSetHostpitalData([]));
              dispatch(storeSethospitalSelected(null));
              dispatch(storeSetCitySelected(citiesData[e]));
            }}
            // disabled={disabled && screen !== 2}
          >
            {citiesData?.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  {index + 1}. {element?.name}
                </Select.Option>
              );
            })}
          </Select>
        ) : (
          <div />
        )}
        {!disabled && <span className="hostpital">{t("filter.hospital")}</span>}
        {!disabled && (
          <Select
            defaultValue={hospitalSelected?.name || t("common.none")}
            value={hospitalSelected?.name || t("common.none")}
            className="select-hostpital"
            onChange={(e) => {
              dispatch(storeSethospitalSelected(hostPitals[e]));
            }}
            disabled={disabled}
          >
            {isLoading ? (
              <Select.Option>
                <Spin />
              </Select.Option>
            ) : (
              <>
                {hostPitals?.map((element, index) => {
                  return (
                    <Select.Option key={String(index)}>
                      {index + 1}. {element?.name}
                    </Select.Option>
                  );
                })}
              </>
            )}
          </Select>
        )}
        {(!disabled || !hospitalSelected) && patch !== SCREEN_DEFAULT[4] ? (
          <div>
            {listQuater?.length > 0 && (
              <Select
                defaultValue={listQuater[7 - currentQuarter]}
                className="select-quarter"
                onChange={(e) => {
                  dispatch(storeSetCurrentQuarter(7 - e));
                }}
              >
                {listQuater?.map((element, index) => {
                  return (
                    <Select.Option key={String(index)}>{element}</Select.Option>
                  );
                })}
              </Select>
            )}
          </div>
        ) : null}
        {/* {patch === SCREEN_DEFAULT[3] && <RangePicker className="datePicker" />} */}
        {patch === SCREEN_DEFAULT[4] && (
          <Segmented
            options={[
              { label: t("document.decisionInstruction"), value: 1 },
              { label: t("document.awardedHospitals"), value: 2 },
            ]}
            value={tabDocument}
            onChange={(e) => {
              dispatch(storeSetTab(e));
            }}
            size="large"
          />
        )}
      </div>

      {(patch === SCREEN_DEFAULT[1] || patch === "/") &&
      hospitalSelected &&
      dashboardData ? (
        <div
          className="export"
          onClick={() => navigate(`${SCREEN_DEFAULT[6]}`)}
        >
          {t("filter.generateReport")}
        </div>
      ) : null}
      {(patch === SCREEN_DEFAULT[1] || patch === "/") &&
      !hospitalSelected &&
      citySelected &&
      dashboardData ? (
        <BtnExportCity onClick={() => null}>
          {t("dashBoard.provincialReport")}
        </BtnExportCity>
      ) : null}

      {patch === SCREEN_DEFAULT[6] && (
        <div className="export" onClick={exportPdfData}>
          {t("filter.exportReport")}
        </div>
      )}
    </FilterWrapper>
  );
};

export default FilterComponent;
