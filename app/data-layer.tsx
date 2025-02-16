// components/DataLayer.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const pushToDataLayer = (event: object) => {
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(event);
};

const DataLayer = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure the dataLayer is initialized
    (window as any).dataLayer = (window as any).dataLayer || [];

    // Push page information to the dataLayer
    pushToDataLayer({
      event: "page_view",
      page: {
        title: document.title,
        url: window.location.href,
        path: pathname,
      },
    });
  }, [pathname]); // Runs when the pathname changes

  return null;
};

export default DataLayer;
