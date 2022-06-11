import styled from "styled-components";

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
  .logo {
    width: 200px;
    height: 55px;
    margin: 9px;
  }
  .title {
    border-top: 1px solid #dfe6e9;
    padding-top: 0.5em;
    margin-top: 1em;
    width: 100%;
    text-align: center;
    font-size: 22px;
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
`;
