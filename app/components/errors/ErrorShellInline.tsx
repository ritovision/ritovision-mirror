// app/components/errors/ErrorShellInline.tsx
"use client";

import React from "react";
import FloatingOrbs from "../utilities/animations/FloatingOrbs";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorShellInline({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "400px",
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at center, rgba(2,23,38,0.6), rgba(0,0,0,0.3))",
        color: "var(--foreground)",
        overflow: "hidden",
        borderRadius: "var(--border-radius-medium)",
        border: "1px solid rgba(var(--secondary-blue-rgb),0.3)",
        margin: "2rem auto",
        maxWidth: "var(--container-max-width-medium)",
        padding: "2rem",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "var(--border-radius-medium)" }}>
        <FloatingOrbs />
      </div>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 24 }}>
        <h1 style={{ fontSize: "1.875rem", lineHeight: 1.2, margin: "0 0 8px" }}>{title}</h1>
        <p style={{ opacity: 0.85, margin: "0 0 16px" }}>{message}</p>
        {onRetry ? (
          <button
            onClick={onRetry}
            style={{
              border: "1px solid rgba(var(--secondary-blue-rgb),0.8)",
              background: "rgba(var(--secondary-blue-rgb),0.25)",
              color: "var(--foreground)",
              padding: "10px 14px",
              borderRadius: "var(--border-radius-button)",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
}
