import api from "../api";
import { setWithCredentialsStatus } from "../api/client";

type TLoginProps = {
  user: string;
  hash: string;
  session: boolean;
  captchaToken: string;
}

export async function login({ user, hash, session = true, captchaToken = "" }: TLoginProps
): Promise<string | object> {
  try {
    const response = await api.user.login(user, hash, session, captchaToken);

    if (!response || (!response.token && !response.tfa))
      throw response.error.message;

    if (response.tfa && response.confirmUrl) {
      const url = response.confirmUrl.replace(window.location.origin, "");
      return url;
    }

    setWithCredentialsStatus(true);

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function thirdPartyLogin(SerializedProfile) {
  try {
    const response = await api.user.thirdPartyLogin(SerializedProfile);

    if (!response || !response.token) throw new Error("Empty API response");

    setWithCredentialsStatus(true);

    // this.reset();

    // this.init();

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
}
