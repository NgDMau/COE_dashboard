import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { DatePicker } from "antd";
import { Select, Spin } from "antd";

import html2pdf from "html2pdf.js";

import { useSelector, useDispatch } from "react-redux";
import { FilterWrapper } from "./styled";
import { linkApi } from "../../common/ngok";

import {
  storeSetCitiesData,
  storeSetCurrentQuarter,
  storeSetHostpitalData,
  storeSetHostpitalSelected,
} from "../../store/data-reducer";

const FilterComponent = ({ disabled, screen, setScreen }) => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const hostPitalSelected = useSelector(
    (state) => state?.data?.hostPitalSelected
  );
  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const user = JSON.parse(localStorage.getItem("user"));
  const citiesData = useSelector((state) => state.data.citiesData);
  const hostPitals = useSelector((state) => state.data.hostPitals);
  console.log("hostPitals", hostPitalSelected);
  const [isLoading, setIsLoading] = useState(false);

  const defaultCity = useMemo(() => {
    return (
      citiesData?.find(
        (element) => element?.id === hostPitalSelected?.province_id
      )?.name || ""
    );
  }, [hostPitalSelected, citiesData]);
  console.log("defaultCity", citiesData);
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
    getCities();
  }, []);

  return (
    <FilterWrapper>
      <div className="adress">
        {screen === 5 && (
          <div className="back" onClick={() => setScreen(1)}>
            Quay lại
          </div>
        )}

        {!disabled && <span>Tỉnh/ Thành phố: </span>}

        {!disabled && (
          <Select
            defaultValue={defaultCity || ""}
            className="select-city"
            onChange={(e) => {
              getHostPital(citiesData[e].code);
              dispatch(storeSetHostpitalData([]));
            }}
            disabled={disabled}
          >
            {citiesData?.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  {index + 1}. {element?.name}
                </Select.Option>
              );
            })}
          </Select>
        )}
        {!disabled && <span className="hostpital">Bệnh viện: </span>}

        {!disabled && (
          <Select
            defaultValue={hostPitalSelected?.name || ""}
            className="select-hostpital"
            onChange={(e) => {
              dispatch(storeSetHostpitalSelected(hostPitals[e]));
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
        {screen === 3 && <RangePicker className="datePicker" />}
      </div>

      {screen === 1 && dashboardData ? (
        <div className="export" onClick={() => setScreen(6)}>
          Xem báo cáo
        </div>
      ) : null}

      {screen === 6 && (
        <div className="export" onClick={exportPdfData}>
          Xuất báo cáo
        </div>
      )}
    </FilterWrapper>
  );
};

export default FilterComponent;
