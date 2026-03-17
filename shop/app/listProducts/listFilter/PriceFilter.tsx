/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Slider } from "antd";
import { useState, useMemo } from "react";
import "./filter.css";

type Props = {
  setPriceRange: (range: [number, number]) => void;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function PriceFilter({ setPriceRange }: Props) {

  // state tạm (UI)
  const [tempPrice, setTempPrice] = useState<[number, number]>([0, 2000]);

  // debounce
  const debouncedSetPrice = useMemo(
  () =>
    debounce((value: [number, number]) => {
      setPriceRange(value);
    }, 300),
  [setPriceRange]
);

  return (
    <div className="filter-box">

      <div className="filter-title">
        LỌC THEO GIÁ
      </div>

      <Slider
        range
        min={0}
        max={2000}
        value={tempPrice}
        onChange={(value) => {
          setTempPrice(value as [number, number]);
          debouncedSetPrice(value as [number, number]);
        }}
      />

      {/* Hiển thị giá động */}
      <div className="price-range">
        <span>${tempPrice[0]}</span>
        <span>${tempPrice[1]}</span>
      </div>

    </div>
  );
}