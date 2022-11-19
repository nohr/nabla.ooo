import styled from "styled-components";

export const ContentPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--main-text-color) !important;
  justify-content: flex-start;
  .homebar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .dash {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    @media screen and (max-width: 900px) {
      flex-direction: column;
      padding: 10px;
    }
  }
  .about-form {
    background-color: var(--main-bg-color) !important;
    padding: 20px;
    width: 65ch;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    textarea {
      height: 30vh;
    }
    @media screen and (max-width: 900px) {
      width: 100%;
      height: 100%;
      textarea {
        height: 100%;
      }
    }
  }
  .formWrap {
    @media screen and (max-width: 900px) {
      width: 100%;
      margin-bottom: calc((var(--margin) * 3));
    }
    @media screen and (min-width: 900px) {
      resize: horizontal;
      overflow-y: scroll;
      padding: 15px 0 15px 15px;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 20px;
    background-color: var(--main-hover-color-alpha);
  }
  form {
    background-color: var(--main-bg-color) !important;
    @media screen and (max-width: 900px) {
      justify-content: space-evenly;
    }
    @media screen and (min-width: 900px) {
      justify-content: flex-start;
      padding: 15px;
    }
    width: 100%;
    height: min-content;
    display: flex;
    flex-direction: column !important;
    row-gap: 20px;
    .section {
      row-gap: 20px;
      display: flex;
      flex-direction: column;
    }
    .third {
      padding: 10px;
    }
    .addContentWrap {
      column-gap: 30px;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      align-items: center;
    }
  }
  input,
  textarea {
    &:focus {
      outline: none;
      border-width: 3px;
    }
    padding: 0 5px;
    font-size: 16px;
    background-color: transparent !important;
    border: 1px solid var(--main-hover-color);
    color: 1px solid var(--main-hover-color);
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  input {
    height: 40px;
  }
  textarea {
    resize: vertical;
    height: 120px;
    @media screen and (max-width: 900px) {
      height: 80px;
    }
  }
  button {
    white-space: nowrap;
    display: block;
    cursor: pointer;
    width: 100%;
    height: 30px;
    padding: 5px 10px !important;
    -webkit-appearance: none;
    color: var(--main-bg-color);
    border: none;
    border-radius: 0;
    border: 1px solid var(--main-hover-color);
    background-color: var(--main-hover-color) !important;
    &:hover {
      opacity: 50%;
      background-color: var(--main-hover-color-alpha) !important;
      color: var(--main-text-color) !important;
    }
  }
  .disabled {
    border: 1px solid var(--grey) !important;
    background-color: var(--greyalpha) !important;
    color: var(--grey) !important;
    &:hover {
      opacity: 100% !important;
      background-color: var(--greyalpha) !important;
    }
  }
  .addContent {
    width: min-content;
    button {
      width: 100%;
    }
  }
  .submit {
    width: 100%;
  }
  .submit,
  .addContent,
  .delete {
    align-self: flex-start;
    align-items: center;
    row-gap: 0;
    border: 1px solid var(----main-hover-color);
  }
  .delete {
    background-color: var(--red) !important;
    border: 1px solid var(--red) !important;
    &:hover {
      background-color: var(--redalpha) !important;
    }
  }
  .slideshow {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll !important;
    align-items: center;
    position: relative;
    padding: 0 30px;
    iframe {
      height: 80%;
      border: none;
    }
  }
  .previewContent {
    img,
    video,
    iframe {
      height: 70vh;
    }
    @media screen and (max-width: 900px) {
      img,
      video,
      iframe {
        height: 50vh;
      }
    }
    button {
      width: 25%;
      margin: 0 auto;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;
