// app/components/home/dynamicText/DynamicTextServer.tsx
import DynamicTextClient from "./DynamicTextClient";
import styles from "./DynamicText.module.css";

export default function DynamicTextServer() {
  return (
    <div className={styles.container}>
      <div className={styles.borderTop} />
      
      {/* Prerendered Static Structure, Dynamic Text Loads via Client Component */}
      <DynamicTextClient />

      <div className={styles.borderBottom} />
    </div>
  );
}
