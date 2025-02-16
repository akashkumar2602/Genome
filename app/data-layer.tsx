// components/DataLayer.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Define the structure of DataLayer events
interface DataLayerEvent {
  event: string;
  page?: {
    title: string;
    url: string;
    path: string;
  };
}

// Extend the global `window` object to include `dataLayer`
declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

export const pushToDataLayer = (event: DataLayerEvent) => {
  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

const DataLayer = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure dataLayer exists before pushing events
    window.dataLayer = window.dataLayer || [];

    pushToDataLayer({
      event: "page_view",
      page: {
        title: document.title,
        url: window.location.href,
        path: pathname,
      },
    });
  }, [pathname]);

  return null;
};

export default DataLayer;
