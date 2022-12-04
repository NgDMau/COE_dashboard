import styled from "styled-components";

export const VietNamChartWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  height: 750px;
`;
export const ContentWrapper = styled.div`
  text-align: center;
  height: 30px;
`;
export const ColorGroup = styled.div`
  margin-left: 200px;
`;
export const CountryWrapper = styled.div`
  margin-bottom: 10px;
  .select {
    width: 500px;
  }
`;
export const HeaderTableWrapper = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #bdc3c7;
  border-bottom: ${(props) => (props?.borderbottom ? "1px solid #bdc3c7" : "none")};
`;
export const Content = styled.div`
  width: 60%;
  padding-left: 12px;
`;
export const BornWrapper = styled.div`
  width: 20%;
  border-left: 1px solid #bdc3c7;
  text-align: center;
`;
export const BothWrapper = styled.div`
  width: 40%;
  border-left: 1px solid #bdc3c7;
  text-align: center;
`;
