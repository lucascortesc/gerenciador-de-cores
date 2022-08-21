import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 72px;

  background-color: #212429;
  display: flex;
  justify-content: center;

  .header__container {
    width: 100%;
    height: 100%;
    max-width: 1600px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  padding: 50px 5vw;

  .header__wellcome {
    font-size: 32px;
    color: #e0e1dd;
  }

  .header__logo {
    width: 90px;
    height: 80px;
  }

  #invisible {
    display: none;
  }

  .rotate {
    animation: rotation 1s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  Button {
    color: white;
    background-color: #fd377e;

    width: 75px;
    height: 32px;

    :hover {
      background-color: #868e96;
      font-weight: bold;
      filter: brightness(1.5);
      transform: scale(1.1);
      transition: transform 0.2s;
    }
  }
`;
