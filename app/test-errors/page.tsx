"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TestErrorsPage() {
  const router = useRouter();
  const [shouldError, setShouldError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/");
    }
  }, [router]);

  if (shouldError) {
    throw new Error("Test error triggered!");
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Error Boundary Test Page</h1>
      <p>Click the button to trigger an error and see the ErrorShellInline component</p>
      <button
        onClick={() => setShouldError(true)}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          background: "var(--primary-red)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Trigger Error
      </button>
    </div>
  );
}
