import styled from "styled-components";

export const ContentPage = styled.div`
  position: fixed;
  z-index: 470;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.panelColor} !important;
  background-color: transparent !important;
  justify-content: flex-start;
  overflow: scroll;
  
  * p, * li{
    font-weight: 800 !important;
  }
  * li{
    padding: 2px 5px;
    width: min-content;
  }
  * li:hover{
    color: ${props => props.theme.textHover} !important;
    background-color: ${props => props.theme.LiHover} !important;
  }
  * ul{
    list-style: none !important;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
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
    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding: 10px;
    }
  }
  .about-form {
    backdrop-filter: blur(var(--blur)) ;
    padding: 20px;
    width: 65ch;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    textarea {
      height: 30vh;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 100%;
      textarea {
        height: 100%;
      }
    }
  }
  .formWrap {
    @media screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: calc((var(--margin) * 3));
    }
    @media screen and (min-width: 768px) {
      resize: horizontal;
      overflow-y: scroll;
      padding: 15px 0 15px 15px;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 20px;
  }
  form {
    backdrop-filter: blur(var(--blur)) ;
    background-color: ${props => props.theme.layerBG} !important;
    border: 1px solid ${props => props.theme.panelColor} !important;
    border-radius: 5px;
    @media screen and (max-width: 768px) {
      justify-content: space-evenly;
      padding: 15px;
      .fileInput{
        height: 80px;
      }
    }
    @media screen and (min-width: 768px) {
      justify-content: flex-start;
      padding: 15px;
    }
    width: 100%;
    height: min-content;
    display: flex;
    flex-direction: column !important;
    row-gap: 20px;
    .nameGroup{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      column-gap: 10px;

      & .name{
        width: 100%;
      }

      & .published{
        margin: auto 0;
        height: 30px;
        width: 30px;
      }
    }

    .fileGroup{
      display: flex;
      flex-direction: row;
      column-gap: 10px;

      & input{
        width: 100%;
      }
    }

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
    border: 1px solid ${props => props.theme.panelColor};
    border-radius: 5px;
    color: ${props => props.theme.panelColor} !important;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  input::-webkit-datetime-edit-day-field,
  input::-webkit-datetime-edit-month-field,
  input::-webkit-datetime-edit-year-field {
    /* background-color: red; */
    color: ${props => props.theme.panelColor} !important;
    outline: none;
  }

  input {
    height: 40px;
  }
  textarea {
    resize: vertical;
    height: 120px;
    @media screen and (max-width: 768px) {
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
    color: #fff;
    border: none;
    border-radius: 0;
    border: 1px solid ${props => props.theme.textHover};
    background-color: ${props => props.theme.LiHover} !important;
    &:hover:not(.disabled) {
      opacity: 50%;
      background-color:${props => props.theme.LiHover} !important;
      color: #fff !important;
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
    @media screen and (max-width: 768px) {
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
