import React from "react";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { isMobileOnly } from "react-device-detect";

import { ClientProps, Scope } from "@docspace/common/utils/oauth/interfaces";

import Button from "@docspace/components/button";

import BlockHeader from "./components/BlockHeader";
import Block from "./components/Block";
import InputHeader from "./components/InputHeader";
import Input from "./components/Input";

// @ts-ignore
import { OAuthStoreProps } from "SRC_DIR/store/OAuthStore";

import CheckboxComponent from "./components/Checkbox";

import {
  Container,
  FormContainer,
  CheckboxGroup,
  InputGroup,
} from "./ClientForm.styled";
import { ClientFormProps } from "./ClientForm.types";
import Preview from "./components/Preview";

const ClientForm = ({
  id,

  client,

  scopeList,

  tenant,
  fetchTenant,

  fetchClient,
  fetchScopes,

  saveClient,
  updateClient,

  regenerateSecret,
}: ClientFormProps) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [initClient, setInitClient] = React.useState<ClientProps | null>();

  const [form, setForm] = React.useState<{ [key: string]: string }>({
    appName: "",
    appIcon: "",
    description: "",

    redirectUrl: "",
    termsURL: "",
    privacyURL: "",
    logoutRedirectUrl: "",

    authenticationMethod: "",
  });

  const [clientId, setClientId] = React.useState<string>("");
  const [secret, setSecret] = React.useState<string>("");

  const [scopes, setScopes] = React.useState<Scope[]>([]);
  const [checkedScopes, setCheckedScopes] = React.useState<string[]>([]);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((v) => {
        v[name] = value;

        return { ...v };
      });
    },
    []
  );

  const onCheckboxChange = React.useCallback(
    (name: string) => {
      const idx = checkedScopes.findIndex((scope) => scope === name);

      if (idx === -1) {
        setCheckedScopes((val) => [...val, name]);
      } else {
        setCheckedScopes((val) => val.filter((scope) => scope !== name));
      }
    },
    [checkedScopes]
  );

  const onSaveClick = async () => {
    const newClient: ClientProps = client ? { ...client } : ({} as ClientProps);

    newClient.name = form.appName;
    newClient.logoUrl = form.appIcon;
    newClient.description = form.description;
    newClient.redirectUri = form.redirectUrl;
    newClient.logoutRedirectUri = form.logoutRedirectUrl;
    newClient.policyUrl = form.privacyURL;
    newClient.clientId = clientId;
    newClient.secret = secret;
    newClient.scopes = [...checkedScopes];

    if (!id) {
      if (!saveClient) return;

      if (tenant === -1 && fetchTenant) {
        const t = await fetchTenant();

        newClient.tenant = t;
      }

      await saveClient(newClient);
    } else {
      if (!updateClient) return;
      await updateClient(clientId, newClient);
    }

    onCancelClick();
  };

  const onCancelClick = () => {
    navigate("/portal-settings/developer-tools/oauth");
  };

  const onResetClick = React.useCallback(async () => {
    if (!regenerateSecret) return;
    const newSecret = await regenerateSecret(clientId);

    setSecret(newSecret);
  }, [clientId, regenerateSecret]);

  const getScopeList = React.useCallback(async () => {
    if (!fetchScopes) return;

    await fetchScopes();
  }, [fetchScopes]);

  const getClient = React.useCallback(async () => {
    if (!fetchClient || !id) return;

    const client = await fetchClient(id);

    setClient(client);
  }, [id, fetchClient]);

  const setClient = React.useCallback(async (client: ClientProps) => {
    setForm({
      appName: client.name,
      appIcon: client.logoUrl || "",
      description: client.description,

      redirectUrl: client.redirectUri,
      privacyURL: client.policyUrl,
      termsUrl: client.termsUrl,
      logoutRedirectUrl: client.logoutRedirectUri,

      authenticationMethod: client.authenticationMethod,
    });

    setSecret(client.secret);

    setCheckedScopes([...client.scopes]);

    setInitClient({ ...client, scopes: [...client.scopes] });

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
  }, []);

  React.useEffect(() => {
    if (scopeList && scopeList?.length !== 0) return setScopes([...scopeList]);

    getScopeList();
  }, [id, scopeList, fetchScopes, getScopeList]);

  React.useEffect(() => {
    if (id) {
      setClientId(id);
      if (!client) {
        getClient();
      } else {
        setClient(client);
      }
    }
  }, [id, client, fetchClient, getClient, setClient]);

  const compareAndValidate = () => {
    let isValid = false;

    for (let key in form) {
      if (!!form[key] || key === "appIcon" || key === "authenticationMethod") {
        if (initClient) {
          switch (key) {
            case "appName":
              isValid = isValid || initClient.name !== form[key];

              break;
            case "appIcon":
              isValid = isValid || initClient.name !== form[key];

              break;
            case "description":
              isValid = isValid || initClient.description !== form[key];

              break;
            case "redirectUrl":
              isValid = isValid || initClient.redirectUri !== form[key];

              break;
            case "logoutRedirectUrl":
              isValid = isValid || initClient.logoutRedirectUri !== form[key];

              break;
            case "privacyUrl":
              isValid = isValid || initClient.policyUrl !== form[key];

              break;

            case "termsUrl":
              isValid = isValid || initClient.termsUrl !== form[key];

              break;
          }
        }
        isValid = true;
      } else {
        isValid = false;
      }
    }

    if (checkedScopes.length > 0) {
      if (initClient) {
        let isSame = checkedScopes.length === initClient?.scopes.length;
        if (isSame) {
          checkedScopes.forEach((scope) => {
            if (!initClient?.scopes.includes(scope)) isSame = false;
          });
        }

        isValid = isValid || !isSame;
      }
    } else {
      isValid = false;
    }

    return isValid;
  };

  const isValid = compareAndValidate();

  return (
    <Container>
      <FormContainer>
        <Block>
          <BlockHeader header={"Basic info"} helpButtonText="" />
          <InputGroup>
            <InputHeader header={"App name"} />
            <Input
              value={form.appName}
              name={"appName"}
              placeholder={"Enter name"}
              onChange={onInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputHeader header={"App icon"} />
            <Input
              value={form.appIcon}
              name={"appIcon"}
              placeholder={"Add icon"}
              onChange={onInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputHeader header={"Description"} />
            <Input
              value={form.description}
              name={"description"}
              placeholder={"Enter description"}
              onChange={onInputChange}
            />
          </InputGroup>
        </Block>

        {id && (
          <Block>
            <BlockHeader header={"Client"} helpButtonText="" />
            <InputGroup>
              <InputHeader header={"ID"} />
              <Input
                value={clientId}
                name={"ID"}
                placeholder={"Enter id"}
                onChange={onInputChange}
                isReadOnly
                withCopy
              />
            </InputGroup>
            <InputGroup>
              <InputHeader header={"Secret"} />
              <Input
                value={secret}
                name={"secret"}
                placeholder={"Enter secret"}
                onChange={onInputChange}
                isReadOnly
                isSecret
                withCopy
                withButton
                buttonLabel="Reset"
                onClickButton={onResetClick}
              />
            </InputGroup>

            <InputGroup>
              <InputHeader header={"Authentication method "} />
              <Input
                value={form.authenticationMethod}
                name={"authenticationMethod"}
                placeholder={"Enter secret"}
                onChange={onInputChange}
                isReadOnly
                withCopy
              />
            </InputGroup>
          </Block>
        )}

        <Block>
          <BlockHeader header={"OAuth URLs"} helpButtonText="" />
          <InputGroup>
            <InputHeader header={"Redirect url"} />
            <Input
              value={form.redirectUrl}
              name={"redirectUrl"}
              placeholder={"Enter URL"}
              onChange={onInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputHeader header={"Logout redirect url"} />
            <Input
              value={form.logoutRedirectUrl}
              name={"logoutRedirectUrl"}
              placeholder={"Enter URL"}
              onChange={onInputChange}
            />
          </InputGroup>
        </Block>

        <Block>
          <BlockHeader header={"Access scopes"} helpButtonText="" />
          <CheckboxGroup>
            {scopes.length > 0 &&
              scopes.map((scope) => (
                <CheckboxComponent
                  key={`${scope.name}`}
                  isChecked={checkedScopes.includes(scope.name)}
                  onChange={() => onCheckboxChange(scope.name)}
                  label={scope.name}
                  description={scope.description}
                />
              ))}
          </CheckboxGroup>
        </Block>

        <Block>
          <BlockHeader header={"Support & Legal info"} helpButtonText="" />

          <InputGroup>
            <InputHeader header={"Privacy policy URL"} />
            <Input
              value={form.privacyURL}
              name={"privacyURL"}
              placeholder={"Enter URL"}
              onChange={onInputChange}
            />
          </InputGroup>
          <InputGroup>
            <InputHeader header={"Terms of Service URL"} />
            <Input
              value={form.termsURL}
              name={"termsURL"}
              placeholder={"Enter URL"}
              onChange={onInputChange}
            />
          </InputGroup>
        </Block>

        <div className="button-container">
          <Button
            //@ts-ignore
            label={"Save"}
            isDisabled={!isValid}
            size={"normal"}
            primary
            scale={isMobileOnly}
            onClick={onSaveClick}
          />
          <Button
            //@ts-ignore
            label={"Cancel"}
            size={"normal"}
            scale={isMobileOnly}
            onClick={onCancelClick}
          />
        </div>
      </FormContainer>
      {id && (
        <Preview
          clientId={clientId}
          redirectURI={form.redirectUrl}
          scopes={checkedScopes}
        />
      )}
    </Container>
  );
};

export default inject(
  (
    { oauthStore }: { oauthStore: OAuthStoreProps },
    { id }: ClientFormProps
  ) => {
    const {
      clientList,
      scopeList,

      fetchClient,
      fetchScopes,

      tenant,
      fetchTenant,

      saveClient,
      updateClient,

      regenerateSecret,
    } = oauthStore;

    const props: ClientFormProps = {
      scopeList,

      fetchClient,
      fetchScopes,

      tenant,
      fetchTenant,

      saveClient,
      updateClient,

      regenerateSecret,
    };

    if (id) {
      const client = clientList.find(
        (client: ClientProps) => client.clientId === id
      );

      props.client = client;
    }

    return { ...props };
  }
)(observer(ClientForm));
