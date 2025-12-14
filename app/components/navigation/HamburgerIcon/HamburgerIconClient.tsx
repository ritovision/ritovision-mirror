"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { toggleMobileMenu } from "@/store/slices/navigation/mobileModalSlice";

export default function HamburgerIconClient() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleMobileMenu(true))}
      className="transition-transform duration-300 ease-in-out text-3xl"
      style={{
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        color: "white",
      }}
      aria-label="Open Mobile Menu"
    >
      ☰
    </button>
  );
}
