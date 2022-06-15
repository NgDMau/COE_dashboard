import React from "react";
import { AppsWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import logo from "../../assets/brand/Logo_AnT.png";

const AppsPage = () => {
  const navigate = useNavigate();
  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Button>Dự án đang phát triển</Button>,
    });
  };

  return (
    <AppsWrapper>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="content">
        <div className="item blue" onClick={() => navigate("/dashboard")}>
          Bệnh viện thực hành nuôi con bằng sữa mẹ
        </div>
        <div className="item yellow" onClick={showConfirm}>
          Ngân hàng sữa mẹ
        </div>
        <div className="item green" onClick={showConfirm}>
          Chương trình mục tiêu Quốc gia về Dân Tộc thiểu số
        </div>
      </div>
    </AppsWrapper>
  );
};

export default AppsPage;
