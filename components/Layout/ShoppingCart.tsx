"use client";
import { Popover } from "flowbite-react";
import { BiShoppingBag } from "react-icons/bi";

export default function ShoppingCart() {
  return (
    <Popover content={""} placement="top">
      <div>
        <BiShoppingBag className="text-4xl p-2" />
      </div>
    </Popover>
  );
}
