import { Checkbox } from "antd";
import "./filter.css";

export default function DiscountFilter(){

  return(
    <div className="filter-box">

      <p className="filter-title">
        GIẢM GIÁ
      </p>
      <p><Checkbox>Đang giảm giá</Checkbox></p>
      <p><Checkbox>Còn hàng</Checkbox></p>

    </div>
  )
}