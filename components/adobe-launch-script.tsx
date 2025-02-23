/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const AdobeLaunchScript = () => {
  const [digitalData, setDigitalData] = useState<string>("");

  useEffect(() => {
    const handleDigitalDataReady = (event: Event) => {
      if (window.digitalData) {
        setDigitalData(
          `window.digitalData = ${JSON.stringify(window.digitalData)};`
        );
      }
    };

    window.addEventListener("digitalDataReady", handleDigitalDataReady);
    return () =>
      window.removeEventListener("digitalDataReady", handleDigitalDataReady);
  }, []);

  return (
    <>
      {digitalData && (
        <Script
          id="digital-data"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: digitalData }}
        />
      )}
      {digitalData && (
        <Script
          id="adobe-launch"
          src="https://assets.adobedtm.com/81adfcd42355/2c67a3825f8a/launch-688c37746f3a-development.min.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
};

export default AdobeLaunchScript;
