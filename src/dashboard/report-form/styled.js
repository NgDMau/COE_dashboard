import styled from "styled-components";

export const ReportFormWrapper = styled.div`
  background-color: #74b9ff;
  width: 180px;
  display: flex;
  height: 100%;
  align-items: center;
  font-weight: 500;
  flex-direction: column;
  padding-top: 1em;
  .title {
    border-bottom: 1px solid #95a5a6;
    width: 100%;
    text-align: center;
  }
  .report {
    width: 100%;
    padding: 0.7em;
    border-bottom: 1px solid #95a5a6;
    cursor: default;
  }
  .report:hover {
    background-color: #95a5a6;
  }
`;
