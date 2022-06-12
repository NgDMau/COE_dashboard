import React from "react";
import { AppsWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

const AppsPage = () => {
  const navigate = useNavigate();
  return (
    <AppsWrapper>
      <div className="content">
        <div className="item blue" onClick={() => navigate("/dashboard")}>
          Bệnh viện thực hành nuôi con bằng sữa mẹ
        </div>
        <div className="item yellow">Ngân hàng sữa mẹ</div>
        <div className="item green">
          Chương trình mục tiêu Quốc gia về Dân Tộc thiểu số
        </div>
      </div>
    </AppsWrapper>
  );
};

export default AppsPage;
