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

  .main__lottie-container {
    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main__addPalette {
    display: block;
    margin: 0 auto;
  }

  .main__addPalette:hover {
    filter: brightness(1.5);
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  .main__container-optionals {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }

  .main__container-Buttons {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  @media screen and (min-width: 480px) {
  }

  @media screen and (min-width: 750px) {
    .main__addPalette {
      margin: 0;
    }

    .main__container-optionals {
      flex-direction: row;
      justify-content: space-between;
      gap: 0px;
    }

    .main__container-Buttons {
      flex-direction: row;
      gap: 30px;
    }
  }
`;
