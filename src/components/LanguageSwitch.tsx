import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "flag-icons/css/flag-icons.min.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const sx = {
    width: 50,
    backgroundColor: "none",
    borderRadius: 5,
  }

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={(_, lang) => lang && i18n.changeLanguage(lang)}
      size="small"
      sx={{
        display: "flex",
        gap: 1,
        border: "none"
      }}
    >
      <ToggleButton value="en" className="fi fi-us" sx={sx}></ToggleButton>
      <ToggleButton value="es" className="fi fi-es" sx={sx}></ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
