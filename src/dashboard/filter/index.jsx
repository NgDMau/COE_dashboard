import { Select, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { hostpitalList } from "./faleData";
import { FilterWrapper } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import {
  storeSetCitiesData,
  storeSetHostpitalData,
  storeSetHostpitalSelected,
} from "../../store/data-reducer";
import { useState } from "react";

const FilterComponent = ({ disabled, screen, setScreen }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const citiesData = useSelector((state) => state.data.citiesData);
  const hostPitals = useSelector((state) => state.data.hostPitals);

  const [isLoading, setIsLoading] = useState(false);

  const getCities = async () => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch("https://1527-113-22-84-32.ngrok.io/dm/data/province?info=all", {
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
    fetch(
      `https://1527-113-22-84-32.ngrok.io/dm/data/province?code=${code}&info=hospitals`,
      {
        method: "POST",
        headers: myHeaders,
      }
    )
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
              console.log(e);
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
      </div>
      {screen === 1 && (
        <div className="export" onClick={() => setScreen(5)}>
          Xem báo cáo
        </div>
      )}
    </FilterWrapper>
  );
};

export default FilterComponent;
