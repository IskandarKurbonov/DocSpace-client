import { useTranslation } from "react-i18next";

import ErrorContainer from "../error-container/ErrorContainer";

const Error404 = () => {
  const { t, ready } = useTranslation("Common");

  return ready && <ErrorContainer headerText={t("Error404Text")} />;
};

export default Error404;