import styled from "styled-components";

export const ButtonLogout = styled.div`
  cursor: pointer;
  width: 100%;
  padding-left: 40px;
  margin-bottom: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  img {
    width: 22px;
    height: auto;
    margin-right: 6px;
  }
  :hover {
    color: #1890ff;
  }
`;
export const SiderbarWrapper = styled.div`
  background-color: white;
  width: 280px;
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
  .ant-layout-sider {
    background-color: white;
  }
  .logo {
    width: 100%;
    height: 96px;
    padding-bottom: 30px;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    border-bottom: 1px solid #ecf0f1;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 200px;
      height: auto;
      padding: 10px;
    }
  }
  .title {
    border-top: 1px solid #dfe6e9;
    padding: 0.5em;
    width: 100%;
    font-size: 22px;
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
