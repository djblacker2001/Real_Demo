import { Checkbox } from "antd";
import "./filter.css";
import { useTranslation } from "react-i18next";

export default function DiscountFilter({ setDiscountOnly }: { setDiscountOnly: (value: boolean) => void; }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="filter-box">

      <p className="filter-title">
        {t("filter.discount")}
      </p>
      <p><Checkbox onChange={(e) => setDiscountOnly(e.target.checked)}>{t("filter.discounting")}</Checkbox></p>
      <p><Checkbox>{t("filter.instock")}</Checkbox></p>

    </div>
  )
}