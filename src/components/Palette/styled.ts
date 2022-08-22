import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  text-align: center;

  .palette__container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .palette__name {
    font-weight: bold;
  }

  .palette__card {
    display: flex;
    height: 100px;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;

    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
  }

  .palette__card-color {
    width: 100%;
    flex-grow: 1;
    flex-basis: 0;

    cursor: pointer;

    :hover {
      flex-grow: 3;
      transition: flex-grow 0.3s;
    }
  }

  .palette__desc {
    text-align: center;
    width: 100%;
    height: 100%;

    display: none;

    font-weight: bold;
  }

  .palette__card-color:hover .palette__desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .palette__title {
    padding-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .palette__title path {
    justify-self: end;
  }

  .modal__excluir-title {
    color: #fd377e;
    font-weight: bold;
  }

  .modal__excluir-buttons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 30px;
  }

  .palette__icons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
