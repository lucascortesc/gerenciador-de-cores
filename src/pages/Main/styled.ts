import styled from "styled-components";

export const MainCointainer = styled.div`
  width: 100vw;
  max-width: 1600px;

  padding: 50px;
  margin: 0 auto;

  .main__container-noPalletes {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    z-index: -1;
  }

  .main__noPalettes {
    font-size: 24px;
    text-align: center;
    font-weight: bold;
  }

  Button {
    display: block;
    margin: 0 auto;
  }

  Button:hover {
    filter: brightness(1.5);
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  @media screen and (min-width: 480px) {
    Button {
      margin: 0;
    }
  }
`;
