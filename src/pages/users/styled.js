import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";
export const UserManagerWrapper = styled.div`
  background-image: url(${background});
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LeftContainer = styled.div`
  margin-top: 30px;
  width: 90%;
`;
export const RightContainer = styled.div`
  width: 35%;
  background-color: tomato;
`;
export const TitleManagerUser = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
`;
