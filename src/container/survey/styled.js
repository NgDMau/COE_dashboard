import styled from "styled-components";

export const SurveyLinkWrapper = styled.div`
  width: 90%;
  background-size: cover;
  padding: 20px;
  margin: 20px;
  font-size: 20px;
  .search-input {
    margin-bottom: 20px;
  }
  .container {
    display: flex;
    .city-link {
      width: 35%;
      .link-container {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: fit-content;

        :hover {
          text-decoration: underline;
          color: blue;
        }
      }
      .selected {
        text-decoration: underline;
        color: blue;
      }
    }
    .link-selected {
      flex: 65%;
      .link {
        cursor: pointer;
        :hover {
          text-decoration: underline;
          color: blue;
        }
      }
      .chart {
        margin-top: 2em;
        border-radius: 5px;
      }
      .loading-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 100px;
      }
    }
  }
  .select-hostpital {
    width: 200px;
  }
`;
