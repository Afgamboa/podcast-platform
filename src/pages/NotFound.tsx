import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography variant="h4" component="h1">
        {t("notFound.title")}
      </Typography>
      <h1>404</h1>
      <p>{t("notFound.message")}</p>
    </div>
  );
};

export default NotFoundPage;
