import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2467607_sf5ou36jx9q.js", // ε¨ iconfont.cn δΈηζ
});

export default function Icon({ type, ...itemProps }) {
  if (!type) return null;
  return <MyIcon type={type} {...itemProps} />;
}
