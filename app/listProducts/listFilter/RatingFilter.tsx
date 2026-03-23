import { Checkbox } from "antd";
import "./filter.css";
import { useTranslation } from "react-i18next";

type Rating = {
    setRatingFilter: (value: number) => void;
}; 

export default function RatingFilter({ setRatingFilter }: Rating) {
    const { t, i18n } = useTranslation();
    return (
        <div className="filter-box">
            <p className="filter-title">
                {t("filter.rating")}
            </p>
            <p><Checkbox onChange={() => setRatingFilter(4)}>
                4★ {t("filter.ormore")}
            </Checkbox></p>

            <p><Checkbox onChange={() => setRatingFilter(3)}>
                3★ {t("filter.ormore")}
            </Checkbox></p>

            <p><Checkbox onChange={() => setRatingFilter(2)}>
                2★ {t("filter.ormore")}
            </Checkbox></p>
        </div>
    )
}