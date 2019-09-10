import { useEffect, useState } from "react";

/**
 * @param {string} src url of the script to be loaded
 */

export default function useScript(src) {
  const [state, setState] = useState({
    loaded: false,
    failed: false,
    inProgress: false,
    script: null
  });

  useEffect(() => {
    if (!state.loaded && !state.failed && !state.inProgress && !state.script) {
      const scriptExists = document.querySelector(`script[src='${src}']`);
      if (!scriptExists) {
        setState({ inProgress: true });
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => setState({ loaded: true, script });
        script.onerror = () => setState({ inProgress: false, failed: true });
        document.body.appendChild(script);
      }
    }
  }, [src, state]);

  if (state.loaded && state.script) {
    return state.script;
  }
  return null;
}
