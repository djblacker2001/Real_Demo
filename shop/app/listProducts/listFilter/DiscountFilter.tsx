import { Checkbox } from "antd";
import "./filter.css";

export default function DiscountFilter({ setDiscountOnly }: { setDiscountOnly: (value: boolean) => void; }) {

  return (
    <div className="filter-box">

      <p className="filter-title">
        GIẢM GIÁ
      </p>
      <p><Checkbox onChange={(e) => setDiscountOnly(e.target.checked)}>Đang giảm giá</Checkbox></p>
      <p><Checkbox>Còn hàng</Checkbox></p>

    </div>
  )
}