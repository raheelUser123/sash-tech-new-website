import Script from "next/script";

/** Load the supplied live-chat widget once, after the first-page intro finishes. */
export function LiveChat() {
  return <Script id="sashtech-live-chat" strategy="lazyOnload">{`
    (function () {
      function loadChat() {
        if (document.getElementById("sashtech-tawk-embed")) return;
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        var script = document.createElement("script");
        script.id = "sashtech-tawk-embed";
        script.async = true;
        script.src = "https://embed.tawk.to/6a9e93dc27a69434428b87f6/1k1tn35hh";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.head.appendChild(script);
      }
      if (document.documentElement.classList.contains("is-preloading")) {
        window.addEventListener("tas:intro", loadChat, { once: true });
      } else {
        loadChat();
      }
    })();
  `}</Script>;
}
