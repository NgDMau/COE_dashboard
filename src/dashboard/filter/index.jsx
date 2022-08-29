import { Select, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { hostpitalList } from "../../container/survey/faleData";
import { FilterWrapper } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import {
  storeSetCitiesData,
  storeSetCurrentQuarter,
  storeSetHostpitalData,
  storeSetHostpitalSelected,
} from "../../store/data-reducer";
import { useState } from "react";
import { linkApi } from "../../common/ngok";

const FilterComponent = ({ disabled, screen, setScreen }) => {
  const dispatch = useDispatch();

  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const user = JSON.parse(localStorage.getItem("user"));
  const citiesData = useSelector((state) => state.data.citiesData);
  const hostPitals = useSelector((state) => state.data.hostPitals);

  const [isLoading, setIsLoading] = useState(false);

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
        {!disabled && (
          <div>
            {!dashboardData?.time?.length > 0 && (
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
        )}
      </div>
      {screen === 1 && (
        <div className="export" onClick={() => setScreen(6)}>
          Xem báo cáo
        </div>
      )}
    </FilterWrapper>
  );
};

export default FilterComponent;
