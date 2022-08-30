import React from "react";
import { HeaderExportWrapper } from "./styled";
import { useDispatch, useSelector } from "react-redux";

const HeaderExport = () => {
  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const hostPitalSelected = useSelector(
    (state) => state?.data?.hostPitalSelected
  );
  return (
    <HeaderExportWrapper>
      <div className="title">
        KẾT QUẢ KHẢO SÁT SẢN PHỤ QUA ĐIỆN THOẠI DI ĐỘNG
      </div>
      <div className="last-update">
        Cập nhật đến {dashboardData?.time[currentQuarter]}
      </div>
      <div className="hospital">{hostPitalSelected?.name}</div>
    </HeaderExportWrapper>
  );
};

export default HeaderExport;
