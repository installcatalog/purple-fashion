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
    style.textContent = `
      .no-select-mode,
      .no-select-mode *{
        user-select:none;
        -webkit-user-select:none;
        -webkit-touch-callout:none;
      }

      .no-select-mode input,
      .no-select-mode textarea,
      .no-select-mode select,
      .no-select-mode option,
      .no-select-mode [contenteditable='true']{
        user-select:text;
        -webkit-user-select:text;
        -webkit-touch-callout:default;
      }
    `;

    document.head.appendChild(style);
  }

  function applyPremiumHeader(){
    if(document.getElementById("premiumHeaderStyle")){
      return;
    }

    var style = document.createElement("style");
    style.id = "premiumHeaderStyle";
    style.textContent = `
      html,
      body{
        width:100%!important;
        max-width:100%!important;
        overflow-x:hidden!important;
      }

      *{
        box-sizing:border-box!important;
      }

      .header{
  display:grid!important;
  grid-template-columns:105px 1fr 50px!important;
  align-items:center!important;
  gap:6px!important;
  background:rgba(255,255,255,0.96)!important;
  backdrop-filter:blur(10px)!important;
  width:100%!important;
  overflow:hidden!important;
  padding:14px 12px!important;
}

#welcome{
  width:105px!important;
  max-width:105px!important;
  font-size:14px!important;
  font-weight:800!important;
  font-family:Georgia,serif!important;
  line-height:20px!important;
  color:#8a2be2!important;
  overflow:hidden!important;
  text-align:left!important;
}

.right-header{
  display:contents!important;
}

.brand{
  font-size:25px!important;
  font-weight:900!important;
  line-height:28px!important;
  color:#5b1a9c!important;
  font-family:Georgia,serif!important;
  white-space:nowrap!important;
  text-align:center!important;
}

.profile-btn{
  width:46px!important;
  height:46px!important;
  border-radius:50%!important;
  background:#f5edff!important;
  overflow:hidden!important;
  justify-self:end!important;
  box-shadow:0 6px 16px rgba(138,43,226,0.16)!important;
}

.profile-btn i{
  display:none!important;
}

.profile-btn img{
  width:100%!important;
  height:100%!important;
  object-fit:cover!important;
  border-radius:50%!important;
  display:block!important;
}

      .bottom-nav{
        position:fixed!important;
        left:0!important;
        right:0!important;
        bottom:0!important;
        width:100vw!important;
        max-width:100vw!important;
        overflow:hidden!important;
        transform:none!important;
      }

      .categories,
      .price-filters{
        max-width:100vw!important;
        overflow-x:auto!important;
        overflow-y:hidden!important;
      }

      .products{
        width:100%!important;
        max-width:100%!important;
        overflow-x:hidden!important;
      }

      .search-section,
      .banner-slider,
      .section-title,
      .category-section-title{
        max-width:100vw!important;
        overflow:hidden!important;
      }

      @media(max-width:380px){
        .header{
          grid-template-columns:104px 1fr 52px!important;
          gap:6px!important;
        }

        #welcome{
          width:104px!important;
          max-width:104px!important;
          font-size:12.5px!important;
          line-height:18px!important;
        }

        .brand{
          font-size:23px!important;
          line-height:25px!important;
        }

        .profile-btn{
          width:48px!important;
          height:48px!important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function applyProfileLogo(){
    var buttons = document.querySelectorAll(".profile-btn");

    buttons.forEach(function(btn){
      if(!btn.querySelector("img")){
        btn.innerHTML = '<img src="icon-192.png" alt="Purple Fashion">';
      }
    });
  }

  function applyCommonUi(){
    var config = getConfig();

    applyTheme(config);

    if(config.ui && config.ui.preventTextSelection){
      addNoSelectStyles();
      document.body.classList.add("no-select-mode");
    }

    applyPremiumHeader();
    applyProfileLogo();
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
