import { Checkbox } from "antd";
import "./filter.css";

type Rating = {
    setRatingFilter: (value: number) => void;
}; 

export default function RatingFilter({ setRatingFilter }: Rating) {

    return (
        <div className="filter-box">
            <p className="filter-title">
                ĐÁNH GIÁ
            </p>
            <p><Checkbox onChange={() => setRatingFilter(4)}>
                4★ trở lên
            </Checkbox></p>

            <p><Checkbox onChange={() => setRatingFilter(3)}>
                3★ trở lên
            </Checkbox></p>

            <p><Checkbox onChange={() => setRatingFilter(2)}>
                2★ trở lên
            </Checkbox></p>
        </div>
    )
}