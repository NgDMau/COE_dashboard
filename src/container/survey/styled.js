import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";

export const SurveyLinkWrapper = styled.div`
  background-image: url(${background});
  width: 90%;
  background-size: cover;
  padding: 20px;
  margin: 20px;
  font-size: 20px;
  .search-input {
    margin-bottom: 20px;
  }
  .link-container {
    .link {
      cursor: pointer;
      margin-left: 1em;
    }
    .link:hover {
      text-decoration: underline;
      color: blue;
    }
  }
`;
