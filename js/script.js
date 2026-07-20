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
      if (noteEl) {
        noteEl.textContent = "感謝您的訊息!這是示範表單,尚未連接後端寄送功能。";
        noteEl.style.color = "#b8860b";
      }
      form.reset();
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
        var matchCat = activeCat === "全部" || card.getAttribute("data-cat") === activeCat;
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
