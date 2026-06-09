(function(){
  function getConfig(){
    if(typeof APP_CONFIG === "undefined"){
      return {};
    }

    return APP_CONFIG || {};
  }

  function hexToRgb(hex){
    hex = String(hex || "").trim().replace("#","");

    if(hex.length === 3){
      hex = hex.split("").map(function(char){
        return char + char;
      }).join("");
    }

    if(!/^[0-9a-fA-F]{6}$/.test(hex)){
      return null;
    }

    return {
      r: parseInt(hex.slice(0,2),16),
      g: parseInt(hex.slice(2,4),16),
      b: parseInt(hex.slice(4,6),16)
    };
  }

  function applyTheme(config){
    var root = document.documentElement;
    var theme = config.themeColor || "#8a2be2";
    var themeDark = config.themeDark || "#5b1a9c";
    var theme2 = config.theme2 || themeDark;
    var themeSoft = config.themeSoft || config.backgroundColor || "#f5edff";
    var accent = config.accentColor || "#d4af37";
    var bg = config.backgroundColor || "#f6f2ff";
    var ink = config.textColor || "#101827";
    var rgb = hexToRgb(theme);

    root.style.setProperty("--theme", theme);
    root.style.setProperty("--theme2", theme2);
    root.style.setProperty("--theme-dark", themeDark);
    root.style.setProperty("--theme-soft", themeSoft);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--bg", bg);
    root.style.setProperty("--ink", ink);

    if(rgb){
      root.style.setProperty("--theme-rgb", rgb.r + "," + rgb.g + "," + rgb.b);
    }
  }

  function addNoSelectStyles(){
    if(document.getElementById("commonNoSelectStyle")){
      return;
    }

    var style = document.createElement("style");
    style.id = "commonNoSelectStyle";
    style.textContent = [
      ".no-select-mode,",
      ".no-select-mode *{",
      "user-select:none;",
      "-webkit-user-select:none;",
      "-webkit-touch-callout:none;",
      "}",
      ".no-select-mode input,",
      ".no-select-mode textarea,",
      ".no-select-mode select,",
      ".no-select-mode option,",
      ".no-select-mode [contenteditable='true']{",
      "user-select:text;",
      "-webkit-user-select:text;",
      "-webkit-touch-callout:default;",
      "}"
    ].join("");

    document.head.appendChild(style);
  }

  function applyCommonUi(){
    var config = getConfig();

    applyTheme(config);

    if(config.ui && config.ui.preventTextSelection){
      addNoSelectStyles();
      document.body.classList.add("no-select-mode");
    }

    applyConfigLinks(config);
  }

  function buildWhatsAppLink(number,message){
    number = String(number || "").replace(/[^\d]/g,"");

    if(!number){
      return "#";
    }

    if(message){
      return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
    }

    return "https://wa.me/" + number;
  }

  function buildCallLink(number){
    number = String(number || "").replace(/[^\d]/g,"");
    return number ? "tel:+" + number : "#";
  }

  function applyConfigLinks(config){
    var whatsappNumber = config.growContactWhatsApp || config.sellerWhatsApp || "";
    var growMessage = config.whatsappMessages && config.whatsappMessages.grow
      ? config.whatsappMessages.grow
      : "";
    var callNumber = config.sellerPhone || config.sellerWhatsApp || "";

    document.querySelectorAll("[data-config-whatsapp]").forEach(function(link){
      link.href = buildWhatsAppLink(whatsappNumber,growMessage);
    });

    document.querySelectorAll("[data-config-call]").forEach(function(link){
      link.href = buildCallLink(callNumber);
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", applyCommonUi);
  }
  else{
    applyCommonUi();
  }
})();
