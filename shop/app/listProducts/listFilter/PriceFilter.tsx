import { Slider } from "antd";
import "./filter.css";
export default function PriceFilter({setPriceRange}:{setPriceRange:(range:number[])=>void}){

  return(
    <div className="filter-box">

      <div className="filter-title">
        LỌC THEO GIÁ
      </div>

      <Slider
        range
        min={0}
        max={2000}
        defaultValue={[0,2000]}
        onChange={(value)=>setPriceRange(value)}
      />

      <div className="price-range">
        <span>$0</span>
        <span>$2000</span>
      </div>

    </div>
  )
}