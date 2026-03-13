import { Checkbox } from "antd";
import "./filter.css";

export default function RatingFilter({ setRatingFilter }: { setRatingFilter: (rating: number) => void }) {

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