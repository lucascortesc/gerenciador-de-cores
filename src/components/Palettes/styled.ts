import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 30px;

  @media screen and (max-width: 1200px) {
    justify-content: center;
  }
`;
