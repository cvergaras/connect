(() => {
  "use strict";
  const config = window.CONNECT_CONFIG || {};
  const categories = [
    "Ask a question", "Share feedback", "Exchange research ideas",
    "Propose a collaboration", "Register interest in testing CLARENA",
    "Receive CLARENA updates", "Other enquiries"
  ];
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { const node = $(id); if (node && value) node.textContent = value; };
  const email = typeof config.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ? config.email : "";
  const mailto = email ? `mailto:${email}` : "";
  const validHttps = (value, host) => {
    try { const url = new URL(value); return url.protocol === "https:" && (url.hostname === host || url.hostname.endsWith(`.${host}`)) ? url : null; }
    catch { return null; }
  };
  const validPublicUrl = (value) => { try { const url = new URL(value); return url.protocol === "https:" ? url : null; } catch { return null; } };
  const tally = validHttps(config.tallyFormUrl, "tally.so");
  const tallyId = tally && /^\/r\/([A-Za-z0-9]+)\/?$/.exec(tally.pathname)?.[1];
  const calendly = validHttps(config.calendlyUrl, "calendly.com");
  if (tallyId) {
    const widget = document.createElement("script");
    widget.src = "https://tally.so/widgets/embed.js";
    widget.onload = () => window.Tally?.loadEmbeds?.();
    document.head.append(widget);
  }

  setText("research-title", config.research?.heading);
  setText("research-description", config.research?.description);
  setText("clarena-description", config.research?.clarena);
  ["hero-name", "footer-name", "copyright-name"].forEach(id => setText(id, config.name));
  setText("hero-role", config.role && config.institution ? `${config.role} at ${config.institution}` : "");
  setText("footer-role", config.role);
  setText("footer-institution", config.institution);
  setText("year", new Date().getFullYear().toString());
  if (validPublicUrl(config.clarenaUrl)) {
    $("clarena-link").href = config.clarenaUrl;
    $("footer-clarena-link").href = config.clarenaUrl;
  }
  if (validHttps(config.linkedinUrl, "linkedin.com")) $("linkedin-link").href = config.linkedinUrl;
  if (email) {
    ["email-link", "form-email"].forEach(id => { $(id).href = mailto; });
    if (!calendly) $("meeting-link").href = mailto;
  }
  if (calendly) {
    $("meeting-link").href = calendly.href;
    $("meeting-link").target = "_blank";
    $("meeting-link").rel = "noopener noreferrer";
    $("meeting-link").innerHTML = 'Schedule a meeting <span aria-hidden="true">↗</span>';
    setText("meeting-status", "Choose a time for a research conversation through Calendly.");
  }

  function embedUrl(category) {
    const url = new URL(`https://tally.so/embed/${tallyId}`);
    url.searchParams.set("alignLeft", "1");
    url.searchParams.set("hideTitle", "1");
    url.searchParams.set("transparentBackground", "1");
    url.searchParams.set("dynamicHeight", "1");
    if (category) url.searchParams.set("category", category);
    return url.href;
  }
  function shareUrl(category) {
    const url = new URL(`https://tally.so/r/${tallyId}`);
    if (category) url.searchParams.set("category", category);
    return url.href;
  }
  function showForm(category) {
    const selected = categories.includes(category) ? category : "";
    setText("form-category", selected || "Choose a topic above");
    document.querySelectorAll("[data-category]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.category === selected)));
    if (!tallyId) return;
    const content = $("form-content");
    content.replaceChildren();
    const iframe = document.createElement("iframe");
    iframe.title = selected ? `Private form: ${selected}` : "Private contact form";
    iframe.loading = "lazy";
    iframe.width = "100%";
    iframe.height = "540";
    iframe.setAttribute("data-tally-src", embedUrl(selected));
    content.append(iframe);
    const fallback = document.createElement("p");
    fallback.className = "form-fallback";
    fallback.append("Form not showing? ");
    const link = document.createElement("a");
    link.href = shareUrl(selected);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Open it directly in Tally";
    fallback.append(link, ".");
    content.append(fallback);
    if (window.Tally?.loadEmbeds) window.Tally.loadEmbeds();
    else iframe.src = embedUrl(selected);
  }

  const startCategory = new URLSearchParams(location.search).get("category");
  showForm(startCategory);
  document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      showForm(button.dataset.category);
      $("form").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    });
  });
})();
