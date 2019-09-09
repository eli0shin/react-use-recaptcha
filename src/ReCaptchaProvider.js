/* globals grecaptcha */

import React, { createContext, useEffect, useState } from "react";
import useScript from "./useScript";

export const ReCaptchaContext = createContext({ script: null, apiKey: null });

export default function ReCaptchaProvider({ apiKey, children }) {
  const [reCaptcha, setReCaptcha] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const script = useScript(
    `https://www.google.com/recaptcha/api.js?render=${apiKey}`
  );

  useEffect(() => {
    if (script) {
      if (!initialized) {
        grecaptcha.ready(() => {
          setInitialized(true);
        });
      } else if (!reCaptcha) {
        setReCaptcha(grecaptcha);
      }
    }
  }, [script, reCaptcha, initialized]);

  useEffect(() => {
    const element = document.querySelector(".grecaptcha-badge");
    if (element) {
      element.style.display = "none";
    }
  }, [reCaptcha]);

  return (
    <ReCaptchaContext.Provider value={{ script: reCaptcha, apiKey }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}
