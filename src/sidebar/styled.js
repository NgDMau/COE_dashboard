import styled from "styled-components";
import { rem } from "../helpers/rem/px-to-rem";

export const MenuIconWrapper = styled.img`
  position: ${(props) => (props?.collapse ? "unset" : "absolute")};
  width: ${rem(24)} !important;
  height: 24px !important;
  z-index: 2;
  left: ${rem(20)};
  bottom: ${rem(10)};
`;
export const ButtonLogout = styled.div`
  cursor: pointer;
  width: 100%;
  padding-left: ${(props) => (props?.collapse ? rem(20) : rem(40))};
  margin-bottom: ${rem(30)};
  font-size: 16px;
  display: flex;
  align-items: center;
  img {
    width: ${rem(25)};
    height: auto;
    margin-right: ${rem(6)};
  }
  :hover {
    color: #1890ff;
  }
`;

export const SiderbarWrapper = styled.div`
  background-color: white;
  width: ${(props) => (props?.collapse ? rem(60) : rem(222))};
  transition: all 0.2s linear;
  display: flex;
  height: 100%;
  align-items: center;
  font-weight: 500;
  flex-direction: column;
  padding-top: 1em;
  border-right: 1px solid #ecf0f1;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  .ant-menu-item {
    width: fit-content;
  }
  .ant-layout-sider {
    background-color: white;
  }
  .logo {
    width: 100%;
    height: ${rem(100)};
    padding-bottom: ${rem(20)};
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    border-bottom: 1px solid #ecf0f1;
    display: flex;
    align-items: center;
    justify-content: center;
    .img-logo {
      display: ${(props) => (props?.collapse ? "none" : "unset")};
      width: ${rem(100)};
      height: auto;
      padding: ${rem(10)};
    }
  }
  .title {
    border-top: 1px solid #dfe6e9;
    padding: 0.5em;
    width: 100%;
    font-size: ${rem(22)};
    cursor: pointer;
  }
  .title:hover {
    background-color: #dfe6e9;
  }
  .site-layout-background {
    .ant-menu-inline {
      border-right: none;
    }
  }
  img {
    width: ${rem(16)};
    height: ${rem(16)};
  }
  .report {
    width: 100%;
    padding: 0.9em 3.5em;
    /* border-bottom: 1px solid #dfe6e9; */
    cursor: default;
  }
  .report:hover {
    background-color: #dfe6e9;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
