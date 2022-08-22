import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  .modal__body {
    width: 90%;
    min-height: 80px;
    max-height: 100%;
    max-width: 600px;
    overflow: auto;

    background-color: white;
    border-radius: 15px;

    padding: 25px;
  }

  .modal__close {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .modal__close p {
    cursor: pointer;
    font-weight: bold;
  }
`;
