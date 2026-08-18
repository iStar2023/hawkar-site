/* ============================================================
   HAWKAR — language suggestion
   If a visitor's browser is set to Kurdish or Arabic and they
   landed on the English page (or the reverse), offer the other
   language once, quietly, at the top of the page.

   Deliberately NOT an automatic redirect, and deliberately NO
   storage of any kind — no cookie, no localStorage. The header
   promises "no tracking, no cookies" and that promise is worth
   more than remembering a preference. The visitor decides; the
   strip simply appears and can be dismissed.
   ============================================================ */

(function () {
  const isKurdishPage = document.documentElement.lang === "ckb";

  // What the browser says the reader prefers.
  const langs = (navigator.languages || [navigator.language || ""])
    .join(",")
    .toLowerCase();

  const prefersKurdish = /\b(ckb|ku|kmr|ar)\b/.test(langs) || /(^|,)(ckb|ku|kmr|ar)-/.test(langs);

  // Only offer the language the visitor is NOT currently reading.
  const shouldOffer = isKurdishPage ? !prefersKurdish : prefersKurdish;
  if (!shouldOffer) return;

  const copy = isKurdishPage
    ? { text: "Prefer English?", cta: "Read in English", href: "en.html", dir: "ltr", close: "Dismiss" }
    : { text: "بە کوردی دەخوێنیتەوە؟", cta: "بڕۆ بۆ کوردی", href: "index.html", dir: "rtl", close: "داخستن" };

  const bar = document.createElement("div");
  bar.className = "lang-offer";
  bar.setAttribute("dir", copy.dir);
  bar.innerHTML =
    '<span>' + copy.text + '</span>' +
    '<a href="' + copy.href + '">' + copy.cta + '</a>' +
    '<button type="button" aria-label="' + copy.close + '">&times;</button>';

  bar.querySelector("button").addEventListener("click", function () {
    bar.remove();
  });

  document.body.insertBefore(bar, document.body.firstChild);
})();
