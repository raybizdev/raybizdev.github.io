document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var noteEl = form.querySelector(".form-note");
      var submitBtn = form.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            if (noteEl) {
              noteEl.textContent = "感謝您的訊息!我會盡快回覆。";
              noteEl.style.color = "#2e7d32";
            }
            if (typeof gtag === "function") {
              gtag("event", "contact_form_submit");
            }
            form.reset();
          } else {
            if (noteEl) {
              noteEl.textContent = "傳送失敗,請稍後再試,或直接寄信給我。";
              noteEl.style.color = "#c62828";
            }
          }
        })
        .catch(function () {
          if (noteEl) {
            noteEl.textContent = "傳送失敗,請確認網路連線後再試一次。";
            noteEl.style.color = "#c62828";
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  // Newsletter demo form
  var newsletter = document.querySelector(".newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = newsletter.parentElement.querySelector(".newsletter-note");
      if (note) {
        note.textContent = "已收到!這是示範表單,尚未連接後端寄送功能。";
        note.style.color = "#e2c785";
      }
      newsletter.reset();
    });
  }

  // 全站停用右鍵選單與複製（表單輸入框除外，讓聯絡表單能正常打字）
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  function inFormField(e) {
    var t = e.target;
    return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA");
  }
  document.addEventListener("copy", function (e) { if (!inFormField(e)) e.preventDefault(); });
  document.addEventListener("cut", function (e) { if (!inFormField(e)) e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });

  // Blog search + category filter
  var grid = document.getElementById("post-grid");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".post-card"));
    var searchInput = document.getElementById("post-search");
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
    var noResults = document.getElementById("no-results");
    var activeCat = "全部";

    function applyFilter() {
      var term = (searchInput && searchInput.value || "").trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(",");
        var matchCat = activeCat === "全部" || cats.indexOf(activeCat) !== -1;
        var matchText = term === "" || card.textContent.toLowerCase().indexOf(term) !== -1;
        var show = matchCat && matchText;
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (noResults) noResults.style.display = visible === 0 ? "block" : "none";
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeCat = btn.getAttribute("data-cat");
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilter);
    }
  }
});

/* ── 複製連結按鈕 ── */
document.addEventListener("DOMContentLoaded", function () {
  var box = document.querySelector(".share-box");
  if (!box) return;

  var copyBtn = box.querySelector(".share-copy");
  if (!copyBtn) return;

  var canonical = document.querySelector('link[rel="canonical"]');
  var url = (canonical && canonical.href) || window.location.href;
  var toast = box.querySelector(".copy-toast");

  function flash() {
    copyBtn.classList.add("copied");
    if (toast) toast.classList.add("show");
    setTimeout(function () {
      copyBtn.classList.remove("copied");
      if (toast) toast.classList.remove("show");
    }, 1800);
  }

  function fallback() {
    var ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    ta.style.webkitUserSelect = "text";
    ta.style.userSelect = "text";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    try { document.execCommand("copy"); flash(); } catch (e) {}
    document.body.removeChild(ta);
  }

  copyBtn.addEventListener("click", function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(flash).catch(fallback);
    } else {
      fallback();
    }
  });
});
