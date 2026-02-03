import React, { useEffect } from "react";

const AdSidebar: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  return (
    <aside className="my-6">
      <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1234567890123456"
          data-ad-slot="3456789012"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
    </aside>
  );
};

export default AdSidebar;
