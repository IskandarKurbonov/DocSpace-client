import React from "react";
import { withTranslation } from "react-i18next";
import Button from "@appserver/components/button";
import TextInput from "@appserver/components/text-input";
import { saveToSessionStorage } from "../../../utils";

class AmazonStorage extends React.Component {
  constructor(props) {
    super(props);
    const { t, availableStorage, selectedId } = this.props;

    this.state = {
      bucket: "",
      forcePathStyle: "",
      region: "",
      serviceUrl: "",
      sse: "",
      useHttp: "",
      isError: false,
      isChangedInput: false,
    };
    this.isDisabled =
      availableStorage[selectedId] && !availableStorage[selectedId].isSet;

    this.defaultBucketPlaceholder =
      availableStorage[selectedId] &&
      availableStorage[selectedId].properties[0].title;

    this.defaultForcePathStylePlaceholder = t("ForcePathStyle");

    this.defaultRegionPlaceholder =
      availableStorage[selectedId] &&
      availableStorage[selectedId].properties[2].title;

    this.defaultServiceUrlPlaceholder = t("ServiceUrl");

    this.defaultSSEPlaceholder = t("SSE");

    this.defaultUseHttpPlaceholder = t("UseHttp");
    this._isMounted = false;
  }

  onChange = (event) => {
    const { target } = event;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  isInvalidForm = () => {
    const { bucket, region } = this.state;

    if (bucket || region) return false;

    this.setState({
      isError: true,
    });
    return true;
  };

  onMakeCopy = () => {
    const { fillInputValueArray } = this.props;
    const {
      bucket,
      forcePathStyle,
      region,
      serviceUrl,
      sse,
      useHttp,
    } = this.state;

    if (this.isInvalidForm()) return;

    saveToSessionStorage("selectedManualStorageType", "thirdPartyStorage");

    const valuesArray = [
      bucket,
      forcePathStyle,
      region,
      serviceUrl,
      sse,
      useHttp,
    ];

    const inputNumber = valuesArray.length;

    this.setState({
      isError: false,
    });
    fillInputValueArray(inputNumber, valuesArray);
  };
  render() {
    const {
      isError,
      bucket,
      forcePathStyle,
      region,
      serviceUrl,
      sse,
      useHttp,
    } = this.state;
    const { t, isLoadingData, isLoading, maxProgress } = this.props;

    return (
      <>
        <TextInput
          name="bucket"
          className="backup_text-input"
          scale={true}
          value={bucket}
          hasError={isError}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultBucketPlaceholder || ""}
          tabIndex={1}
        />
        <TextInput
          name="region"
          className="backup_text-input"
          scale={true}
          value={region}
          hasError={isError}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultRegionPlaceholder || ""}
          tabIndex={1}
        />
        <TextInput
          name="serviceUrl"
          className="backup_text-input"
          scale={true}
          value={serviceUrl}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultServiceUrlPlaceholder || ""}
          tabIndex={1}
        />
        <TextInput
          name="forcePathStyle"
          className="backup_text-input"
          scale={true}
          value={forcePathStyle}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultForcePathStylePlaceholder || ""}
          tabIndex={1}
        />
        <TextInput
          name="useHttp"
          className="backup_text-input"
          scale={true}
          value={useHttp}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultUseHttpPlaceholder || ""}
          tabIndex={1}
        />
        <TextInput
          name="sse"
          className="backup_text-input"
          scale={true}
          value={sse}
          onChange={this.onChange}
          isDisabled={isLoadingData || isLoading || this.isDisabled}
          placeholder={this.defaultSSEPlaceholder || ""}
          tabIndex={1}
        />

        <div className="manual-backup_buttons">
          <Button
            label={t("MakeCopy")}
            onClick={this.onMakeCopy}
            primary
            isDisabled={!maxProgress || this.isDisabled}
            size="medium"
            tabIndex={10}
          />
          {!maxProgress && (
            <Button
              label={t("Copying")}
              onClick={() => console.log("click")}
              isDisabled={true}
              size="medium"
              style={{ marginLeft: "8px" }}
              tabIndex={11}
            />
          )}
        </div>
      </>
    );
  }
}
export default withTranslation("Settings")(AmazonStorage);
