import styled from "styled-components";
import { hugeMobile } from "@docspace/components/utils/device";

const FillingStatusContainer = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 10px auto;

  @media ${hugeMobile} {
    max-width: 350px;
  }

  .status-done-text, 
  .status-interrupted-text {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
  }

  .status-done-text {
    color: ${(props) => (props.isDone ? "#4781D1" : "#A3A9AE")};
  }

  .status-done-icon {
    circle,
    path {
      stroke: ${(props) => (props.isDone ? "#4781D1" : "#A3A9AE")};
    }
  }
  

  .status-interrupted-text {
    color: ${(props) => props.isInterrupted && "#F2675A"};
  }

  .status-interrupted-icon {
    circle,
    path {
      stroke: ${(props) => props.isInterrupted && "#F2675A"};
    }
  }

  .status-done-icon,
  .status-interrupted-icon {
    margin-right: 10px;
  }
`;

const AccordionItem = styled.div`
  width: 100%;

  .accordion-item-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    height: 38px;
    padding: 18px 0;
  
    .user-avatar {
      padding 1px;
      border: 2px solid #A3A9AE;
      border-color: ${(props) => (props.isDone && "#4781D1") || (props.isInterrupted && "#F2675A")};
      border-radius: 50%;
    }

    .accordion-displayname {
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
      color: #333333;
      margin-left: 10px;
    }

    .accordion-role {
      font-size: 12px;
      line-height: 16px;
      color: #657077;
      margin-left: 10px;
    }
  
    .arrow-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transform: ${(props) => props.isOpen ? "rotate(270deg)" : "rotate(90deg)"};
      path { 
        fill: ${(props) => (props.isOpen ? "#4781d1" : "#A3A9AE")};
      }
    }
  }

  .accordion-item-history {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;

    .status-date {
      color: #657077;
    }
  }

  .accordion-item-wrapper {
    display: flex;
    align-items: center;
    min-height: 40px;
    margin: ${(props) => (props.isDone || props.isInterrupted ? "0" : "2px 0")};
    border-left: 2px ${(props) => props.isDone || props.isInterrupted ? "solid" : "dashed"} #A3A9AE;
    border-color: ${(props) => (props.isDone && "#4781D1") || (props.isInterrupted && "#F2675A")};

    .status-text {
      margin-left: 15px;
      color: #657077;
    }

    .filled-status-text {
      font-size: 12px;
      line-height: 16px;
      margin-left: 15px;
      color: ${(props) => (props.isDone ? "#4781D1" : "#657077")};
    }
  }
`;

export { FillingStatusContainer, AccordionItem };
