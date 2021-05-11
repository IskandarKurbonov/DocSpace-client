import Checkbox from "@appserver/components/checkbox";
import ContextMenuButton from "@appserver/components/context-menu-button";
import PropTypes from "prop-types";
import React from "react";
import { ReactSVG } from "react-svg";
//import equal from "fast-deep-equal/react";
import styled, { css } from "styled-components";
import ContextMenu from "@appserver/components/context-menu";

import Link from "@appserver/components/link";

const svgLoader = () => <div style={{ width: "96px" }}></div>;

const FlexBoxStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

const FolderStyles = css`
  padding-left: 13px;
  box-sizing: border-box;
`;

const StyledTile = styled.div`
  cursor: ${(props) =>
    props.isFolder && !props.isRecycleBin ? "pointer" : "default"};

  min-height: 55px;
  width: 100%;

  ${(props) => props.isFolder && FlexBoxStyles}
  ${(props) => props.isFolder && FolderStyles}

  ${(props) =>
    props.isFolder &&
    `&:before {
    content: "";
    position: absolute;
    top: -7px;
    left: -1px;
    border: 1px solid #eceef1;
    border-top-left-radius: 3px;
    border-top-right-radius: 7px;
    width: 50px;
    height: 7px;
    background-color: #FFF;
    border-bottom: transparent;
  }`}
  ${(props) =>
    props.isFolder &&
    props.dragging &&
    `&:before {
        background-color: #F8F7BF;
        width: 51px; 
        left: -2px;
  }`}
  ${(props) =>
    props.isFolder &&
    props.dragging &&
    `&:hover:before {
        background-color: #EFEFB2;
  }`}
`;

const StyledFileTileTop = styled.div`
  ${FlexBoxStyles}
  justify-content: space-between;
  align-items: baseline;
  background-color: #f8f9f9;
  padding: 13px;
  height: 157px;
  position: relative;

  .thumbnailImage {
    //pointer-events: none;
    & > .injected-svg {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 0;
    }
  }

  .temporary-icon > .injected-svg {
    margin-bottom: 16px;
  }
`;

const StyledFileTileBottom = styled.div`
  ${FlexBoxStyles}
  padding: 9px 13px;
  padding-right: 0;
  min-height: 56px;
  box-sizing: border-box;
`;

const StyledContent = styled.div`
  display: flex;
  flex-basis: 100%;

  a {
    display: block;
    display: -webkit-box;
    max-width: 400px;
    height: auto;
    margin: 0 auto;
    font-size: 15px;
    line-height: 19px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  @media (max-width: 1024px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledCheckbox = styled.div`
  flex: 0 0 16px;
  margin-right: -4px;
`;

const StyledElement = styled.div`
  flex: 0 0 auto;
  display: flex;
  margin-right: 4px;
  user-select: none;
`;

const StyledOptionButton = styled.div`
  display: block;

  .expandButton > div:first-child {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 13px;
  }
`;

class Tile extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   if (this.props.needForUpdate) {
  //     return this.props.needForUpdate(this.props, nextProps);
  //   }
  //   return !equal(this.props, nextProps);
  // }
  constructor(props) {
    super(props);

    this.cm = React.createRef();
    this.tile = React.createRef();
  }

  getIconFile = () => {
    const { item, temporaryIcon, thumbnailClick } = this.props;

    const icon = item.thumbnail ? item.thumbnail : temporaryIcon;
    let className = "thumbnailImage";
    if (!item.thumbnail) className += " temporary-icon";

    return (
      <Link type="page" onClick={thumbnailClick}>
        <ReactSVG className={className} src={icon} loading={svgLoader} />
      </Link>
    );
  };

  changeCheckbox = (e) => {
    const { onSelect, item } = this.props;
    onSelect && onSelect(e.target.checked, item);
  };

  render() {
    const {
      checked,
      children,
      contextButtonSpacerWidth,
      contextOptions,
      element,
      indeterminate,
      tileContextClick,
      dragging,
      isRecycleBin,
      item,
    } = this.props;
    const { isFolder } = item;

    const renderCheckbox = Object.prototype.hasOwnProperty.call(
      this.props,
      "checked"
    );

    const renderElement = Object.prototype.hasOwnProperty.call(
      this.props,
      "element"
    );

    const renderContext =
      Object.prototype.hasOwnProperty.call(this.props, "contextOptions") &&
      contextOptions.length > 0;

    const getOptions = () => {
      tileContextClick && tileContextClick();
      return contextOptions;
    };

    const onContextMenu = (e) => {
      tileContextClick && tileContextClick();
      if (!this.cm.current.menuRef.current) {
        this.tile.current.click(e); //TODO: need fix context menu to global
      }
      this.cm.current.show(e);
    };

    const icon = this.getIconFile();

    return (
      <StyledTile
        ref={this.tile}
        {...this.props}
        onContextMenu={onContextMenu}
        dragging={dragging && isFolder}
        isFolder={isFolder}
        isRecycleBin={isRecycleBin}
      >
        {isFolder ? (
          <>
            {renderCheckbox && (
              <StyledCheckbox>
                <Checkbox
                  isChecked={checked}
                  isIndeterminate={indeterminate}
                  onChange={this.changeCheckbox}
                />
              </StyledCheckbox>
            )}
            {renderElement && !isFolder && (
              <StyledElement>{element}</StyledElement>
            )}
            <StyledContent isFolder={isFolder}>{children}</StyledContent>
            <StyledOptionButton spacerWidth={contextButtonSpacerWidth}>
              {renderContext ? (
                <ContextMenuButton
                  className="expandButton"
                  directionX="right"
                  getData={getOptions}
                />
              ) : (
                <div className="expandButton"> </div>
              )}
              <ContextMenu model={contextOptions} ref={this.cm}></ContextMenu>
            </StyledOptionButton>
          </>
        ) : (
          <>
            <StyledFileTileTop>
              {renderCheckbox && (
                <StyledCheckbox>
                  <Checkbox
                    isChecked={checked}
                    isIndeterminate={indeterminate}
                    onChange={this.changeCheckbox}
                  />
                </StyledCheckbox>
              )}
              {icon}
            </StyledFileTileTop>
            <StyledFileTileBottom>
              <StyledElement>{element}</StyledElement>
              <StyledContent isFolder={isFolder}>{children}</StyledContent>
              <StyledOptionButton spacerWidth={contextButtonSpacerWidth}>
                {renderContext ? (
                  <ContextMenuButton
                    className="expandButton"
                    directionX="right"
                    getData={getOptions}
                  />
                ) : (
                  <div className="expandButton"> </div>
                )}
                <ContextMenu model={contextOptions} ref={this.cm}></ContextMenu>
              </StyledOptionButton>
            </StyledFileTileBottom>
          </>
        )}
      </StyledTile>
    );
  }
}

Tile.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.element,
  className: PropTypes.string,
  contextButtonSpacerWidth: PropTypes.string,
  contextOptions: PropTypes.array,
  data: PropTypes.object,
  element: PropTypes.element,
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  needForUpdate: PropTypes.func,
  onSelect: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  viewAs: PropTypes.string,
  tileContextClick: PropTypes.func,
};

Tile.defaultProps = {
  contextButtonSpacerWidth: "32px",
};

export default Tile;
