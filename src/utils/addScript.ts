export const addScript = (src, type = "", onLoaded = () => {}) => {
  const script = document.createElement("script");
  script.type = type || "text/javascript";
  script.src = src;

  document.head.appendChild(script);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (script.readyState) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    script.onreadystatechange = function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (script.readyState == "loaded" || script.readyState == "complete") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        script.onreadystatechange = null;
        onLoaded && onLoaded();
      }
    };
  } else {
    script.onload = () => {
      onLoaded && onLoaded();
    };
  }
};
