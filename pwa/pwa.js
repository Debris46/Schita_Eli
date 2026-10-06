/* Schita PWA glue: registers sw.js and shows a friendly "new version" toast.
 * The app works without this file. Never throws; silent on file:// and old browsers. */
(function () {
  "use strict";
  try {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;

    var UPDATE_CHECK_MS = 30 * 60 * 1000;
    var lastCheck = Date.now();
    var reloading = false;
    var toastEl = null;

    function isEn() { return document.documentElement.lang === "en"; }

    function showToast(worker) {
      try {
        if (toastEl) return;
        var en = isEn();
        toastEl = document.createElement("div");
        toastEl.setAttribute("role", "status");
        toastEl.style.cssText =
          "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;" +
          "display:flex;align-items:center;gap:12px;max-width:calc(100vw - 24px);" +
          "padding:10px 12px 10px 18px;border-radius:999px;font:600 16px system-ui,sans-serif;" +
          "background:var(--paper,#fff);color:var(--ink,#1C1719);" +
          "border:2px solid var(--accent,#D6336C);box-shadow:0 4px 16px rgba(0,0,0,.2);";
        var msg = document.createElement("span");
        msg.textContent = en ? "A new version is ready." : "O versiune nouă e gata.";
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = en ? "Update" : "Actualizează";
        btn.style.cssText =
          "min-height:44px;padding:0 16px;border:0;border-radius:999px;cursor:pointer;" +
          "font:700 16px system-ui,sans-serif;background:var(--accent,#D6336C);" +
          "color:var(--accent-ink,#fff);";
        btn.addEventListener("click", function () {
          try { worker.postMessage({ type: "SKIP_WAITING" }); } catch (e) {}
          btn.disabled = true;
        });
        toastEl.appendChild(msg);
        toastEl.appendChild(btn);
        document.body.appendChild(toastEl);
      } catch (e) {}
    }

    function watch(reg) {
      // A worker already waiting (e.g. page reopened after install finished)
      if (reg.waiting && navigator.serviceWorker.controller) showToast(reg.waiting);
      reg.addEventListener("updatefound", function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener("statechange", function () {
          // "installed" + existing controller = update, not first install
          if (nw.state === "installed" && navigator.serviceWorker.controller) showToast(nw);
        });
      });
    }

    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloading) return; // guard against reload loops
      reloading = true;
      location.reload();
    });

    function register() {
      var swUrl = new URL("sw.js", document.baseURI).href;
      navigator.serviceWorker.register(swUrl, { scope: "./" }).then(function (reg) {
        watch(reg);
        document.addEventListener("visibilitychange", function () {
          try {
            if (document.visibilityState !== "visible") return;
            if (Date.now() - lastCheck < UPDATE_CHECK_MS) return;
            lastCheck = Date.now();
            reg.update().catch(function () {});
          } catch (e) {}
        });
      }).catch(function () {});
    }

    // Script is loaded with defer, but be safe if loaded late/early.
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);
  } catch (e) { /* never break the app */ }
})();
