"use client";
import React, { useEffect } from "react";

const AdInArticle: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  return (
    <div className="my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1234567890123456"
          data-ad-slot="2345678901"
          data-ad-format="fluid"
          data-ad-layout="in-article"
        ></ins>
    </div>
  );
};

export default AdInArticle;
