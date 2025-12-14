// ./app/components/utilities/media/images/OrbImage.tsx
"use client";

import React from "react";
import NextImage, { ImageProps } from "next/image";
import FloatingOrbs from "@/components/utilities/animations/FloatingOrbs";
import styles from "./OrbImage.module.css";

type OrbImageProps = Omit<ImageProps, "placeholder"> & {
  aspectRatio?: number | string;
  radius?: React.CSSProperties["borderRadius"];
  showOrbs?: boolean;
  orbZIndex?: number;
  containerClassName?: string;
  /** Styles applied to the outer container div (not the image). */
  containerStyle?: React.CSSProperties;
  /** Minimum time (ms) to keep placeholder visible; useful for demos/tests. */
  minPlaceholderMs?: number;
};

/**
 * OrbImage wraps next/image and shows FloatingOrbs as a loading placeholder.
 * Uses onLoad (not onLoadingComplete) to avoid deprecation warnings.
 */
export default function OrbImage({
  aspectRatio,
  radius,
  showOrbs = true,
  orbZIndex = 0,
  containerClassName,
  containerStyle,
  minPlaceholderMs = 0,
  onLoad,
  onError,
  fill = true,
  sizes = "100vw",
  alt,
  ...imgProps
}: OrbImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  // Extract potential image-level className/style from remaining ImageProps
  const {
    className: imageClassName,
    style: imageStyle,
  ...restImgProps
  } = imgProps;

  const loadStartRef = React.useRef<number>(Date.now());
  const loadTimeoutRef = React.useRef<number | undefined>(undefined);
  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const elapsed = Date.now() - loadStartRef.current;
    const remaining = Math.max(minPlaceholderMs - elapsed, 0);

    if (remaining > 0) {
      loadTimeoutRef.current = window.setTimeout(() => setLoaded(true), remaining);
    } else {
      setLoaded(true);
    }
    onLoad?.(e);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setErrored(true);
    onError?.(e);
  };

  const outerStyle: React.CSSProperties = {
    ...(aspectRatio
      ? {
          aspectRatio:
            typeof aspectRatio === "number" ? `${aspectRatio}` : aspectRatio,
        }
      : {}),
    borderRadius: radius,
    ...containerStyle,
  };

  React.useEffect(() => {
    // Reset load/error when source changes
    setLoaded(false);
    setErrored(false);
    loadStartRef.current = Date.now();

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, [restImgProps.src]);

  const shouldShowPlaceholder = showOrbs && (!loaded || errored);

  return (
    <div
      className={[styles.container, containerClassName]
        .filter(Boolean)
        .join(" ")}
      style={outerStyle}
    >
      {shouldShowPlaceholder && (
        <div className={styles.placeholder} aria-hidden>
          <FloatingOrbs className={styles.orbs} zIndex={orbZIndex} />
        </div>
      )}

      <NextImage
        {...restImgProps}
        alt={alt}
        fill={fill}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={[
          styles.image,
          loaded ? styles.imageVisible : styles.imageHidden,
          imageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ borderRadius: radius, ...imageStyle }}
      />
    </div>
  );
}
