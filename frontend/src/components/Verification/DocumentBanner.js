import React from "react";
import lock from "./lock.png";
export default function DocumentBanner() {
  return (
    <div>
      <section className="document-type-banner">
        <div className="banner-text">
          <img src={lock} alt="" />
          Secure Identity Verifcation
        </div>
      </section>
    </div>
  );
}
