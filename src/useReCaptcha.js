import { useContext } from "react";
import { ReCaptchaContext } from "./ReCaptchaProvider.js";

export default function useRecaptcha(action) {
  const recaptcha = useContext(ReCaptchaContext);
  function execute(action) {
    if (!recaptcha.script) {
      return false;
    }
    return recaptcha.script.execute(recaptcha.apiKey, { action });
  }
  return execute;
}
