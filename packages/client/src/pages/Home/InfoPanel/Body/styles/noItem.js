import styled, { css } from "styled-components";

const StyledNoItemContainer = styled.div`
  ${(props) =>
    props.theme.interfaceDirection === "rtl"
      ? css`
          margin: 80px 0 0 auto;
        `
      : css`
          margin: 80px auto 0 0;
        `}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;

  .no-item-text {
    font-weight: 600;
    font-size: ${(props) => props.theme.getCorrectFontSize("14px")};
    line-height: 16px;
    text-align: center;
  }

  .no-history-text {
    font-weight: 700;
    font-size: ${(props) => props.theme.getCorrectFontSize("16px")};
    line-height: 22px;
    text-align: center;
  }

  .no-thumbnail-img-wrapper {
    width: 75px;
    height: 75px;
    img {
      width: 75px;
      height: 75px;
    }
  }
`;

export { StyledNoItemContainer };
