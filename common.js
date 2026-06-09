(function(){
  function getConfig(){
    if(typeof APP_CONFIG === "undefined"){
      return {};
    }

    return APP_CONFIG || {};
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
