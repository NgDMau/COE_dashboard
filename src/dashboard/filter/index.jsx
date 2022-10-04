/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { DatePicker } from "antd";
import { Select, Spin } from "antd";

import html2pdf from "html2pdf.js";

import { useSelector, useDispatch } from "react-redux";
import { FilterWrapper } from "./styled";
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

const FilterComponent = ({ disabled, screen, setScreen }) => {
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const patch = location?.pathname || "/dashboard";
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const user = JSON.parse(localStorage.getItem("user"));
  const citiesData = useSelector((state) => state.data.citiesData);
  const hostPitals = useSelector((state) => state.data.hostPitals);
  const [isLoading, setIsLoading] = useState(false);

  const defaultCity = useMemo(() => {
    return (
      citiesData?.find(
        (element) => element?.id === hospitalSelected?.province_id
      )?.name || ""
    );
  }, [hospitalSelected, citiesData]);
  const exportPdfData = () => {
    var element = document.getElementById("exportDagta");
    const opt = {
      margin: 1,
      image: { type: "jpeg", quality: 0.98 },
      filename: "KQKS_Q2_2022.pdf",
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["legacy"] },
    };
    html2pdf().set(opt);
    html2pdf(element).save("KQKS_Q2_2022.pdf");
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
        dispatch(storeSetCitiesData(data?.provinces || []));
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
        dispatch(storeSetHostpitalData(data?.hospitals || []));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // if (citiesData?.length === 0) {
    getCities();
    // }
  }, []);

  return (
    <FilterWrapper>
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
        {!disabled || patch === SCREEN_DEFAULT[2] ? (
          <Select
            defaultValue={defaultCity || ""}
            className="select-city"
            onChange={(e) => {
              getHostPital(citiesData[e].code);
              dispatch(storeSetHostpitalData([]));
              dispatch(storeSetCitySelected(citiesData[e]));
            }}
            disabled={disabled && screen !== 2}
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
            defaultValue={hospitalSelected?.name || ""}
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
        {!disabled || screen === 2 ? (
          <div>
            {dashboardData?.time?.length > 0 && (
              <Select
                defaultValue={dashboardData?.time[currentQuarter]}
                className="select-quarter"
                onChange={(e) => {
                  dispatch(storeSetCurrentQuarter(e));
                }}
              >
                {dashboardData?.time?.map((element, index) => {
                  return (
                    <Select.Option key={String(index)}>{element}</Select.Option>
                  );
                })}
              </Select>
            )}
          </div>
        ) : null}
        {patch === SCREEN_DEFAULT[3] && <RangePicker className="datePicker" />}
        {/* {screen === 4 && (
          <ButtonDownload onClick={() => {}}>
            <span>Last Awarded Year: 15/9/2020</span>
          </ButtonDownload>
        )}
        {screen === 4 && (
          <ButtonDownload onClick={() => {}}>
            <span>Next Re-evaluation Year: 15/9/2020</span>
          </ButtonDownload>
        )} */}
      </div>

      {patch === SCREEN_DEFAULT[1] && dashboardData ? (
        <div
          className="export"
          onClick={() => navigate(`${SCREEN_DEFAULT[6]}`)}
        >
          {t("filter.generateReport")}
        </div>
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
