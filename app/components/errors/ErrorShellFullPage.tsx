// app/components/errors/ErrorShellFullPage.tsx
"use client";

import React from "react";
import FloatingOrbs from "../utilities/animations/FloatingOrbs";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorShellFullPage({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}: Props) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(80% 60% at 50% 50%, #021726 0%, #000 100%)",
        color: "var(--foreground)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
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
