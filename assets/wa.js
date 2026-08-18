/* ============================================================
   HAWKAR — WhatsApp links
   One number, one place. Every CTA on both language pages is an
   <a data-wa="message text"> and this fills in the href.

   ⚠️  SET THIS BEFORE LAUNCH — international format, digits only,
       no "+", no spaces, no dashes.  e.g. "14842832755"
   ============================================================ */

const HAWKAR_WHATSAPP = "";   // <-- the only line to change

(function () {
  const ready = /^\d{8,15}$/.test(HAWKAR_WHATSAPP);
  const isKurdish = document.documentElement.lang === "ckb";

  const fallback = isKurdish
    ? "ژمارەی واتسئاپ بەم زووانە دادەنرێت."
    : "Our WhatsApp number is being connected. Please check back shortly.";

  document.querySelectorAll("a[data-wa]").forEach(function (a) {
    if (!ready) {
      a.setAttribute("href", "#");
      a.addEventListener("click", function (e) {
        e.preventDefault();
        alert(fallback);
      });
      return;
    }
    a.setAttribute(
      "href",
      "https://wa.me/" + HAWKAR_WHATSAPP + "?text=" + encodeURIComponent(a.dataset.wa)
    );
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
})();
