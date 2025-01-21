/* ------------------------------------------------------- *\

	Powered by Incredibox
	Incredibox © So Far So Good
	http://www.sofarsogood.fr

\* ------------------------------------------------------- */

function init() {
    activeHeader();
    initFooterFollow();
    initPopup();
    initBanner();
    checkabp();
    checkiframe();
    if (versionIE == 8 || versionIE == 9) {
        $("input, textarea").placeholder();
    }
}
function trace(t) {
    console.log(t);
}
function openNewTab(href) {
    window.open(href, "tab");
}
function checkParent() {
    $(".lien#bt1").attr("onclick", "").click(clicBtHome);

    if (window.opener != null) {
        $(".lien#bt1 .title").html("Close tab");
    } else {
        $(".lien#bt1 .title").html("Incredibox");
    }
}
function clicBtHome() {
    if (window.opener != null) {
        window.close();
    } else {
        window.name = "";
        window.location = "./";
    }
}
function convertToSlug(txt) {
    return txt
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}
function getPath() {
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf("/") + 1);
    url = sPage;
}
function getHash() {
    var url = location.hash.split("#/").join("");
    window.location.hash = ""; // remove hash
    return url;
}
function rgb2hex(rgb) {
    if (rgb.indexOf("#") > -1) {
        return rgb;
    } else {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
    }
}
function initPlaceHolder() {
    // call by placeholder.js
    // a tester
    $("input").placeholder();
}
function ajaxCall(AXhttp, AXurl, AXdata, AXfunc, AXparam) {
    $.ajax({
        type: AXhttp, // str
        url: AXurl, // str
        data: AXdata, // {obj}
        success: function (msg) {
            console.log(msg);
            AXfunc(msg, AXparam); // function callback
        },
    });
}

function checkiframe() {
    var tabDomain = ["stumbleupon.com", "boredbutton.com"];
    if (inIframe()) {
        var ok = false;
        var domain = document.referrer;
        //trace("EMBED -> "+domain)
        for (var a = 0; a < tabDomain.length; a++) {
            if (domain.indexOf(tabDomain[a]) > -1) {
                ok = true;
                break;
            }
        }
        if (!ok) {
            //trace("REFRESH -> "+document.location.href)
            window.top.location.replace(document.location.href);
        }
    }
}
function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
var abpShow = false;

function checkabp() {
    blockAdBlock = new BlockAdBlock();
    checkabpagain();
}
function checkabpagain() {
    trace("checkabpagain()");
    setTimeout(function () {
        if (typeof blockAdBlock === "undefined") {
            adBlockDetected();
        } else {
            blockAdBlock.onDetected(adBlockDetected).onNotDetected(adBlockNotDetected);
            blockAdBlock.check();
        }
    }, 300);
}
function adBlockDetected() {
    trace("showabp()");
    var script = document.createElement("script");
    script.src = domain + "js/jquery-hck.js";
    document.head.appendChild(script);
    saveGA("open_popup_ABP", "Adblock detected", "open_popup");
}
function adBlockNotDetected() {
    trace("hideabp()");
    abpShow = false;
}
// -------------------- OUVRIR UNE POPUP
function windowPopup(_url, _width, _height, _center) {
    var top = _center ? screen.height / 2 - _height / 2 : 0;
    var left = _center ? screen.width / 2 - _width / 2 : 0;
    window.open(_url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + _width + ",height=" + _height + ",top=" + top + ",left=" + left);
}

/*	============================================================================================
	 __    __    ______   .___  ___.  _______ 
	|  |  |  |  /  __  \  |   \/   | |   ____|
	|  |__|  | |  |  |  | |  \  /  | |  |__   
	|   __   | |  |  |  | |  |\/|  | |   __|  
	|  |  |  | |  `--'  | |  |  |  | |  |____ 
	|__|  |__|  \______/  |__|  |__| |_______|

	============================================================================================ */

var bestPhrase = 1;
var totalPhrase = 1;

function initHome() {
    $("#best #nav-left").click(bestClickNavLeft);
    $("#best #nav-right").click(bestClickNavRight);
    //
    totalPhrase = $("#best #diapo-text .phrase").length;
    var diapopoint = $("#best #diapo-point");
    $("#best #diapo-text .phrase").each(function (i) {
        $(this).attr("id", "phrase" + (i + 1));
        diapopoint.append("<div id='point" + (i + 1) + "'></div>");
    });
    $("#point1", diapopoint).addClass("light");
    $("#diapo-point div").click(bestClickNavPoint);
}
function bestClickNavPoint() {
    var num = parseInt($(this).attr("id").split("point").join(""));
    var current = $("#diapo-text #phrase" + bestPhrase);
    var currentP = $("#diapo-point #point" + bestPhrase);
    if (num != bestPhrase) {
        bestPhrase = num;
        var next = $("#diapo-text #phrase" + bestPhrase);
        var nextP = $("#diapo-point #point" + bestPhrase);
        next.css({ display: "block" });
        TweenMax.to(current, 0.3, { autoAlpha: 0, marginLeft: "20px", ease: Quint.easeOut, overwrite: true });
        TweenMax.to(next, 0.2, { autoAlpha: 1, marginLeft: "0px", ease: Quint.easeOut, overwrite: true, delay: 0.2 });
        currentP.removeClass("light");
        nextP.addClass("light");
    }
}
function bestClickNavLeft() {
    var current = $("#diapo-text #phrase" + bestPhrase);
    var currentP = $("#diapo-point #point" + bestPhrase);
    if (bestPhrase > 1) {
        bestPhrase--;
    }
    var prev = $("#diapo-text #phrase" + bestPhrase);
    var prevP = $("#diapo-point #point" + bestPhrase);
    prev.css({ display: "block" });
    TweenMax.to(current, 0.3, { autoAlpha: 0, marginLeft: "20px", ease: Quint.easeOut, overwrite: true });
    TweenMax.to(prev, 0.2, { autoAlpha: 1, marginLeft: "0px", ease: Quint.easeOut, overwrite: true, delay: 0.2 });
    currentP.removeClass("light");
    prevP.addClass("light");
}
function bestClickNavRight() {
    var current = $("#diapo-text #phrase" + bestPhrase);
    var currentP = $("#diapo-point #point" + bestPhrase);
    if (bestPhrase < totalPhrase) {
        bestPhrase++;
    }
    var next = $("#diapo-text #phrase" + bestPhrase);
    var nextP = $("#diapo-point #point" + bestPhrase);
    next.css({ display: "block" });
    TweenMax.to(current, 0.3, { autoAlpha: 0, marginLeft: "-20px", ease: Quint.easeOut, overwrite: true });
    TweenMax.to(next, 0.2, { autoAlpha: 1, marginLeft: "0px", ease: Quint.easeOut, overwrite: true, delay: 0.2 });
    currentP.removeClass("light");
    nextP.addClass("light");
}

// ----------------------------------------------------------------------
// --------------------------------------- EFFET BT HEADER STYLE BOOKMARK

var bt1, bt1Picto, bt1Title;
var btOpen = false;
var btTweening = false;
//
function activerBt(bt) {
    $("#menu #hd-left " + bt + " .box-bt").addClass("click");
}
function activeHeader() {
    bt1 = $("#menu #hd-left #bt1");
    bt1Picto = $("#menu #hd-left #bt1 .picto");
    bt1Title = $("#menu #hd-left #bt1 .title");
    //
    bt1.hover(overBtHome, outBtHome);
}
function overBtHome() {
    TweenMax.to(bt1, 0.2, { marginTop: "-15px", ease: Back.easeOut, overwrite: true });
    TweenMax.to(bt1Picto, 0.2, { top: "25px", opacity: 0.8, ease: Back.easeOut, overwrite: true });
    TweenMax.to(bt1Title, 0.2, { top: "0px", opacity: 1, ease: Quint.easeOut, overwrite: true });
}
function outBtHome() {
    TweenMax.to($(this), 0.3, { marginTop: "-39px", ease: Quint.easeOut, delay: 0.1, overwrite: true });
    TweenMax.to(bt1Picto, 0.2, { top: "7px", opacity: 0.6, ease: Quint.easeOut, delay: 0.1, overwrite: true });
    TweenMax.to(bt1Title, 0.3, { top: "-10px", opacity: 0, ease: Quint.easeOut, overwrite: true });
}

// ---------------------------------------------------------------
// --------------------------------------- FROM FLASH SHUFFLE MODE

function fondNoir() {
    $("#wrap").css({ "background-color": "#000" });
    $(".cache").css({ "border-color": "#000" });
    $(".head").css({ opacity: ".5" });
    $(".lineP").parent().removeClass("white").addClass("black");
}
function fondBlanc() {
    $("#wrap").css({ "background-color": "#FFF" });
    $(".cache").css({ "border-color": "#FFF" });
    $(".head").css({ opacity: "1" });
    $(".lineP").parent().removeClass("black").addClass("white");
}

/*	============================================================================================
	     _______. __    __       ___      .______       _______ 
	    /       ||  |  |  |     /   \     |   _  \     |   ____|
	   |   (----`|  |__|  |    /  ^  \    |  |_)  |    |  |__   
	    \   \    |   __   |   /  /_\  \   |      /     |   __|  
	.----)   |   |  |  |  |  /  _____  \  |  |\  \----.|  |____ 
	|_______/    |__|  |__| /__/     \__\ | _| `._____||_______|

	============================================================================================ */

var shareOpen = false;

function openShare() {
    if (!shareOpen) {
        shareOpen = true;
        TweenMax.to($("#b_more"), 0.4, { width: "0px", marginLeft: "0px", ease: Quint.easeInOut });
        TweenMax.to($("#b_pint"), 0.4, { width: "69px", marginLeft: "10px", ease: Quint.easeInOut });
        TweenMax.to($("#b_stum"), 0.4, { width: "87px", marginLeft: "10px", ease: Quint.easeInOut });
        TweenMax.to($("#b_redd"), 0.4, { width: "77px", marginLeft: "10px", ease: Quint.easeInOut });
        TweenMax.to($("#b_tumb"), 0.4, { width: "81px", marginLeft: "10px", ease: Quint.easeInOut });
        activerRollOut();
    }
}
function closeShare() {
    shareOpen = false;
    $("#bt-share").unbind("mouseover", overBtMore);
    $("#bt-share").unbind("mouseleave", outBtMore);
    TweenMax.to($("#b_more"), 0.4, { width: "22px", marginLeft: "10px", ease: Quint.easeInOut });
    TweenMax.to($("#b_pint"), 0.4, { width: "0px", marginLeft: "0px", ease: Quint.easeInOut });
    TweenMax.to($("#b_stum"), 0.4, { width: "0px", marginLeft: "0px", ease: Quint.easeInOut });
    TweenMax.to($("#b_redd"), 0.4, { width: "0px", marginLeft: "0px", ease: Quint.easeInOut });
    TweenMax.to($("#b_tumb"), 0.4, { width: "0px", marginLeft: "0px", ease: Quint.easeInOut });
}
function activerRollOut() {
    $("#bt-share").bind("mouseover", overBtMore);
    $("#bt-share").bind("mouseleave", outBtMore);
}
function overBtMore() {
    TweenMax.killDelayedCallsTo(closeShare);
    openShare();
}
function outBtMore() {
    TweenMax.delayedCall(1, closeShare);
}
function shareCompo(_compoURL, _social) {
    var url = "";
    switch (_social) {
        case "facebook":
            url = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(domain + "mix/" + _compoURL);
            break;
        case "twitter":
            url = "http://twitter.com/share?url=" + encodeURIComponent(domain + "mix/" + _compoURL) + "&text=" + encodeURIComponent("Guys! Check this mix on @incredibox_! #musicApp #pumpItUp #chill");
            break;
        default:
            break;
    }
    windowPopup(url, 560, 350, true);
}

function initBanner() {
    // Choisir s'il faut affciher la banniere v5 ou v6
    if ($("#wrap").hasClass("game") || $("#wrap").hasClass("top50")) {
        var tab = ["v5", "v6"];
        var choix = tab[Math.round(Math.random())];
        $("#incredi-banner").addClass(choix);
        $("#incredi-banner").click(function () {
            saveGA("open_popup_get_app", "Click banner" + choix.toUpperCase() + " from game", "open_popup");
            openPopup("box-app", choix);
        });
    }
}

/*	============================================================================================
	 _______   ______     ______   .___________. _______ .______      
	|   ____| /  __  \   /  __  \  |           ||   ____||   _  \     
	|  |__   |  |  |  | |  |  |  | `---|  |----`|  |__   |  |_)  |    
	|   __|  |  |  |  | |  |  |  |     |  |     |   __|  |      /     
	|  |     |  `--'  | |  `--'  |     |  |     |  |____ |  |\  \----.
	|__|      \______/   \______/      |__|     |_______|| _| `._____|

	============================================================================================ */

function initFooterFollow() {
    $("#footer .button").hover(overFooterFollow, outFooterFollow);
}
function overFooterFollow() {
    var bulle = $(".inbox#bulle", this.parent);
    $("span", bulle).html($(this).attr("data-text"));
    TweenMax.to(bulle, 0, { alpha: 0, marginLeft: "10px", ease: Linear.easeNone, overwrite: true });
    TweenMax.to(bulle, 0.2, { alpha: 1, marginLeft: "0px", ease: Quint.easeOut, overwrite: true });
}
function outFooterFollow() {
    var bulle = $(".inbox#bulle", this.parent);
    TweenMax.to(bulle, 0.2, { alpha: 0, marginLeft: "10px", ease: Quint.easeOut });
}

/*	******************************************************************************************************
	.______   .______     ______   ___   ___ 
	|   _  \  |   _  \   /  __  \  \  \ /  / 
	|  |_)  | |  |_)  | |  |  |  |  \  V  /  
	|   _  <  |   _  <  |  |  |  |   >   <   
	|  |_)  | |  |_)  | |  `--'  |  /  .  \  
	|______/  |______/   \______/  /__/ \__\  

	****************************************************************************************************** */

var $bbox, $bclick, $bfond, $popup;
var popupOpen = false;
var formProcess = false;
var sendMixByMail = false;
var objMail = [];
var funcOnClosePopup;

function initPopup() {
    $bbox = $("#bbox");
    $bclick = $("#bbox-click");
    $bfond = $("#bbox-fd");
}
function openPopup(id, param, close) {
    if (!popupOpen) {
        popupOpen = true;
        $popup = $(".popup#" + id, $bbox);

        $bbox.show();
        $popup.show();

        TweenMax.to($bfond, 0, { opacity: 0, ease: Linear.easeNone, overwrite: true });
        TweenMax.to($popup, 0, { opacity: 0, top: "55%", ease: Linear.easeNone, overwrite: true });

        $($bclick).bind("click", closePopup);
        $(".popup-close", $popup).bind("click", closePopup);
        TweenMax.to($bfond, 0.3, { opacity: 0.9, ease: Linear.easeNone });
        TweenMax.to($popup, 0.3, { opacity: 1, top: "50%", ease: Quad.easeOut, delay: 0.2 });

        switch (id) {
            case "box-mail":
                rapportTexte("", "alert-mail", "", "");
                if (sendMixByMail) {
                    $("#box-mail .popup-head span").text("SEND A MIX TO A FRIEND");
                    $("#box-mail .popup-body #mail-name").hide();
                    saveGA("open_popup_send_mix", "Send a mix to a friend", "open_popup");
                } else {
                    $("#box-mail .popup-head span").text("SEND INCREDIBOX TO A FRIEND");
                    $("#box-mail .popup-body #mail-name").show();
                    saveGA("open_popup_invitation", "Send invitation to a friend", "open_popup");
                }
                funcOnClosePopup = closePopupMail;

                break;
            case "box-news":
                rapportTexte("", "alert-news", "", "");
                funcOnClosePopup = closePopupNews;
                saveGA("open_popup_newsletter", "Open popup newsletter", "open_popup");
                break;
            case "box-video":
                openVideo(param);
                funcOnClosePopup = closePopupVideo;
                saveGA("open_popup_video", "Open popup video from goodies", "open_popup");
                break;
            case "box-captcha":
                funcOnClosePopup = nada;
                rapportTexte("", "alert-captcha", "", "");
                saveGA("open_popup_captcha", "Open captcha from download", "open_popup");
                break;
            case "box-app":
                $popup.addClass(param);
                funcOnClosePopup = function () {
                    $popup.removeClass("v5 v6");
                };
                break;

            default:
                break;
        }
        var px = Math.round($popup.width() / 2);
        var py = Math.round($popup.height() / 2);
        $popup.css({ "margin-left": -px + "px", "margin-top": -py + "px" });
    }
}
function nada() {
    // nib
}
function closePopup() {
    if (popupOpen) {
        popupOpen = false;
        $($bclick).unbind("click", closePopup);
        TweenMax.killDelayedCallsTo(closePopup);
        //
        TweenMax.to($bfond, 0.3, { opacity: 0, ease: Linear.easeNone, overwrite: true, delay: 0.4, onComplete: reinitPopup });
        TweenMax.to($popup, 0.3, { opacity: 0, top: "45%", ease: Quint.easeIn, overwrite: true });
    }
}
function reinitPopup() {
    $bbox.hide();
    $popup.hide();
    funcOnClosePopup();
    funcOnClosePopup = null;
    $popup = null;
}
function checkMail(input) {
    var ad = input.val();
    var val = input.attr("placeholder");
    if (ad.indexOf("@") != -1 && ad.length > 5 && ad != "" && ad != val) {
        return true;
    }
    return false;
}
function checkInput(input) {
    var txt = input.val();
    var val = input.attr("placeholder");
    if (txt.length > 2 && txt != "" && txt != val) {
        return true;
    }
    return false;
}
function inputWarning(input) {
    input.focus(function () {
        TweenMax.to($(this), 0, { ease: Linear.easeNone, overwrite: true });
        $(this).css({ "background-color": "#BBB" });
    });
    input.blur(function () {
        TweenMax.to($(this), 0, { ease: Linear.easeNone, overwrite: true });
        $(this).css({ "background-color": "#DDD" });
    });
    TweenMax.to(input, 0, { backgroundColor: "#DDD", ease: Linear.easeNone, overwrite: true });
    TweenMax.to(input, 0.3, { backgroundColor: "#FF6600", ease: Quad.easeIn, repeat: 1, yoyo: true, overwrite: true });
}
function rapportTexte(txt, div, image, posXY) {
    var margin = 20;
    var div = $("#" + div);
    if (txt == "") {
        txt = "&nbsp;";
        margin = 0;
    }
    if (image != "") {
        if (image == "mini-preload.gif") {
            posXY = "0px 1px";
            div.css({ "padding-left": "22px" });
        } else {
            div.css({ "padding-left": "18px" });
        }
        div.css({
            "background-image": "url('" + domain + "img/" + image + "')",
            "background-repeat": "no-repeat",
            "background-position": posXY,
        });
    } else {
        div.css({
            background: "none",
            "padding-left": "0px",
        });
    }
    div.html(txt);
    div.css({ "margin-left": margin + "px" });
    TweenMax.to(div, 0.4, { marginLeft: "0px", ease: Bounce.easeOut, overwrite: true });
}

// --------------------------------------------------------------------
// --------------------------------------- FUNCTION POPUP SHARE BY MAIL

function shareMix(compositeur, titre, compoURL) {
    sendMixByMail = true;
    objMail[0] = compositeur; // URIencode
    objMail[1] = titre; // URIencode
    objMail[2] = compoURL;
    openPopup("box-mail");
}
function closePopupMail() {
    formProcess = false;
    TweenMax.to($("#bt-send-mail"), 0, { autoAlpha: 1 });
    if (sendMixByMail) {
        objMail = [];
        sendMixByMail = false;
    }
}
function sendInvitation() {
    if (!formProcess) {
        formProcess = true;
        var mailInvitation = $("#form-mail #mail-email").val();
        var nomInvitation = $("#form-mail #mail-name").val();
        //
        if ((!sendMixByMail && checkMail($("#form-mail #mail-email")) && checkInput($("#form-mail #mail-name"))) || (sendMixByMail && checkMail($("#form-mail #mail-email")))) {
            mailInvitation = encodeURIComponent(mailInvitation);
            nomInvitation = encodeURIComponent(nomInvitation);

            TweenMax.to($("#bt-send-mail"), 0.2, { autoAlpha: 0 });

            if (sendMixByMail) {
                ajaxCall("POST", domain + "php/send-mail.php", { expediteur: objMail[0], email: mailInvitation, type: "composition", morceau: objMail[1], compoURL: objMail[2] }, callbackMailShare, {});
            } else {
                ajaxCall("POST", domain + "php/send-mail.php", { expediteur: nomInvitation, email: mailInvitation, type: "invitation" }, callbackMailShare, {});
            }
            rapportTexte("", "alert-mail", "mini-preload.gif", "0px 0px");
        } else {
            if (!checkMail($("#form-mail #mail-email"))) {
                inputWarning($("#form-mail #mail-email"));
            }
            if (!checkInput($("#form-mail #mail-name"))) {
                inputWarning($("#form-mail #mail-name"));
            }
            rapportTexte("Please check the fields", "alert-mail", "mini-warning.gif", "0px 2px");
            formProcess = false;
        }
    }
}
function callbackMailShare(msg, param) {
    var retour = msg.split(" ").join("");
    console.log(retour);
    switch (retour) {
        // ---------- mail envoyé, adresse enregistrée
        case "reponse=ok":
            rapportTexte("Invitation sent!", "alert-mail", "mini-ok.gif", "0px 2px");
            break;
        default:
            rapportTexte("Sending problem, please retry", "alert-mail", "mini-bug.gif", "0px 2px");
            break;
    }
}

// -----------------------------------------------------------------------------
// --------------------------------------- FUNCTION POPUP INSCRIPTION NEWSLETTER

function closePopupNews() {
    $bbox.hide();
    $popup.hide();
    TweenMax.to($("#bt-send-news"), 0, { autoAlpha: 1 });
    formProcess = false;
    $popup = "";
}
function subscriptionNews() {
    if (!formProcess) {
        formProcess = true;
        var name = $("#form-news #news-name").val();
        var address = $("#form-news #news-email").val();
        //
        if (checkMail($("#form-news #news-email")) && checkInput($("#form-news #news-name"))) {
            name = encodeURIComponent(name);
            address = encodeURIComponent(address);

            TweenMax.to($("#bt-send-news"), 0.2, { autoAlpha: 0 });
            ajaxCall("POST", domain + "php/newsletter-subscription.php", { name: name, address: address }, callbackNewsSub, {});
            rapportTexte("", "alert-news", "mini-preload.gif", "0px 0px");
        } else {
            if (!checkMail($("#form-news #news-email"))) {
                inputWarning($("#form-news #news-email"));
            }
            if (!checkInput($("#form-news #news-name"))) {
                inputWarning($("#form-news #news-name"));
            }
            rapportTexte("Please check the fields", "alert-news", "mini-warning.gif", "0px 2px");
            formProcess = false;
        }
    }
}
function callbackNewsSub(msg, param) {
    var retour = JSON.parse(msg);

    switch (retour.code) {
        case "deja":
            rapportTexte("Already registered", "alert-news", "mini-warning.gif", "0px 2px");
            break;
        case "ok":
            rapportTexte("You are now registered!", "alert-news", "mini-ok.gif", "0px 2px");
            break;
        default:
            rapportTexte("Problem connecting database", "alert-news", "mini-bug.gif", "0px 2px");
            break;
    }
}

// --------------------------------------------------------------------------
// --------------------------------------- OUVRIR POPUP VIDEO YOUTUBE GOODIES

function openVideo(videoURL) {
    var scrVideo = "//www.youtube.com/embed/" + videoURL + "?autoplay=1";
    $("#bbox .popup#box-video .popup-body").html('<iframe width="540" height="304" src="' + scrVideo + '" frameborder="0" allowfullscreen></iframe>');
}
function closePopupVideo() {
    $("#bbox .popup#box-video .popup-body").html();
    $("#bbox .popup#box-video").hide();
    $("#bbox .popup#box-video .popup-body").empty();
}

/*	============================================================================================
	  _______   ______     ______    _______   __   _______     _______.
	 /  _____| /  __  \   /  __  \  |       \ |  | |   ____|   /       |
	|  |  __  |  |  |  | |  |  |  | |  .--.  ||  | |  |__     |   (----`
	|  | |_ | |  |  |  | |  |  |  | |  |  |  ||  | |   __|     \   \    
	|  |__| | |  `--'  | |  `--'  | |  '--'  ||  | |  |____.----)   |   
	 \______|  \______/   \______/  |_______/ |__| |_______|_______/   

	============================================================================================ */

var nbImg;
var curImg = 0;

function initDiapoGoodies() {
    $("#diapo .diapo-img").each(function (index) {
        var imgId = "wall" + index;
        $(this).attr("id", imgId);
        nbImg = index + 1;
    });
    afficherTitreDiapo();
    $("#diapo").hover(overDiapo, outDiapo);
    $("#img-shop").hover(overImgShop, outImgShop);
    $("#diapo-navL").click(clickNavL);
    $("#diapo-navR").click(clickNavR);
    // selection auto résolution user
    var resoX = screen.width;
    var resoY = screen.height;
    var reso = resoX + " x " + resoY;
    $("#diapo-size a:contains('" + reso + "')").css({ "background-color": "#000" });
}
function overImgShop() {
    TweenMax.to($("#img-shop"), 0.3, { backgroundColor: "#25447F", ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#img-shop img#shop2"), 0.3, { top: "-100px", opacity: 0, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#img-shop img#shop3"), 0.3, { top: "40px", opacity: 1, ease: Quint.easeOut, overwrite: true });
}
function outImgShop() {
    TweenMax.to($("#img-shop"), 0.3, { backgroundColor: "#DCDCDC", ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#img-shop img#shop2"), 0.3, { top: "30px", opacity: 1, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#img-shop img#shop3"), 0.3, { top: "180px", opacity: 0, ease: Quint.easeOut, overwrite: true });
}
function overDiapo() {
    TweenMax.to($("#diapo-navL"), 0.3, { marginLeft: "20px", autoAlpha: 1, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#diapo-navR"), 0.3, { marginLeft: "946px", autoAlpha: 1, ease: Quint.easeOut, overwrite: true });
}
function outDiapo() {
    TweenMax.to($("#diapo-navL"), 0.3, { marginLeft: "0px", autoAlpha: 0, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($("#diapo-navR"), 0.3, { marginLeft: "966px", autoAlpha: 0, ease: Quint.easeOut, overwrite: true });
}
function afficherTitreDiapo() {
    var titre = $("#wall" + curImg + " img").attr("data-name");
    $("#diapo-title").html(titre);
    TweenMax.to($("#diapo-title"), 0.3, { marginRight: "10px", opacity: 0.7, ease: Quint.easeOut, overwrite: true });
}
function masquerTitreDiapo() {
    TweenMax.to($("#diapo-title"), 0.3, { marginRight: "50px", opacity: 0, ease: Quint.easeOut, overwrite: true });
}
function clickNavR() {
    if (curImg < nbImg - 1) {
        TweenMax.to($("#wall" + curImg), 0.5, { left: "-200px", ease: Quad.easeOut, overwrite: true, onComplete: afficherTitreDiapo });
        curImg++;
        TweenMax.to($("#wall" + curImg), 0.5, { left: "0px", ease: Quad.easeOut, overwrite: true, onComplete: afficherTitreDiapo });
        masquerTitreDiapo();
    }
}
function clickNavL() {
    if (curImg > 0) {
        TweenMax.to($("#wall" + curImg), 0.5, { left: "1000px", ease: Quad.easeOut, overwrite: true, onComplete: afficherTitreDiapo });
        curImg--;
        TweenMax.to($("#wall" + curImg), 0.5, { left: "0px", ease: Quad.easeOut, overwrite: true, onComplete: afficherTitreDiapo });
        masquerTitreDiapo();
    }
}
function selectWallpaperSize() {
    TweenMax.to($("#diapo-size"), 0.3, { top: "432px", ease: Quint.easeOut, overwrite: true });
    $("#diapo-size").bind("mouseleave", outWallpaperSize);
    //
    var alt = $("#wall" + curImg + " img").attr("data-name");
    var src = $("#wall" + curImg + " img").attr("src");
    var newSrc = src.split("1000x500.jpg").join("");
    var target = "_self";
    // --------------------------------------------- on réécrit les href de chaque bouton
    $("#diapo-size a").each(function (index) {
        var size = $(this).html().split(" ").join(""); // suppr l'espace entre le signe x
        $(this).attr("href", newSrc + size + ".jpg");
        $(this).attr("target", target);
        alt = alt.split("<font>").join("").split("</font>").join(""); // bug chelou error_log
        size = size.split("<").join("").split(">").join(""); // bug chelou error_log
        $(this).attr("download", "incredibox wallpaper - " + alt + " - " + size); // nom du fichier
    });
}
function saveDownload() {
    var alt = $("#wall" + curImg + " img").attr("data-name");
    alt = encodeURIComponent(alt);

    ajaxCall("POST", domain + "php/save-dl-wallpaper.php", { wallpaper: alt }, callBackSaveDownload, {});
}
function outWallpaperSize() {
    TweenMax.to($("#diapo-size"), 0.3, { top: "500px", ease: Quint.easeOut, overwrite: true });
    $("#diapo-size").unbind("mouseleave", outWallpaperSize);
}
function callBackSaveDownload(msg, params) {
    /*alert(msg);*/
}

// --------------------------------------------------------------------
// --------------------------------------- ROLLOVER SUR LES THB YOUTUBE

function initThbGoodies() {
    $(".bloc-thb").hover(overThb, outThb);
}
function overThb() {
    var thick = "25px";
    TweenMax.to($(".thbT", this), 0.25, { height: thick, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($(".thbB", this), 0.25, { height: thick, ease: Quint.easeOut, overwrite: true });
    TweenMax.to($(".thb-ic", this), 0.25, { backgroundPosition: "-40px 0px", opacity: 1, ease: Quint.easeOut, overwrite: true });
}
function outThb() {
    var thick = "0px";
    TweenMax.to($(".thbT", this), 0.25, { height: thick, ease: Quint.easeIn, overwrite: true });
    TweenMax.to($(".thbB", this), 0.25, { height: thick, ease: Quint.easeIn, overwrite: true });
    TweenMax.to($(".thb-ic", this), 0.25, { backgroundPosition: "0px 0px", opacity: 0.6, ease: Quint.easeIn, overwrite: true });
}

/*	============================================================================================
	.___________.  ______   .______       _____    ___   
	|           | /  __  \  |   _  \     | ____|  / _ \  
	`---|  |----`|  |  |  | |  |_)  |    | |__   | | | | 
	    |  |     |  |  |  | |   ___/     |___ \  | | | | 
	    |  |     |  `--'  | |  |          ___) | | |_| | 
	    |__|      \______/  | _|         |____/   \___/  

	============================================================================================ */

var lineOpen;
var tabInclude;
var pageTop;
var tabResearch;

function initTop50() {
    miniApp = $("#miniApp");
    $(".bt-compo").hover(overBtLine, outBtLine);
    $("#top-50 .top-line").bind("mouseover", overTopLine);
    $("#top-50 .top-line").bind("mouseleave", outTopLine);
    pageTop = $("#page-top");
    tabInclude = $("#tab-include");
    tabResearch = $("#tab-research");
    initFilter();
}
function overTopLine() {
    $(this).addClass("overTopLine");
}
function outTopLine() {
    $(this).removeClass("overTopLine");
}
function openLine(line, compoLink) {
    if (lineOpen != undefined && lineOpen != line) {
        closeLine(lineOpen);
    }
    if (lineOpen != line) {
        lineOpen = line;
        $(line).unbind("mouseover", overTopLine);
        $(line).unbind("mouseleave", outTopLine);
        $(line).removeClass("overTopLine");
        $(line).addClass("top-line-open");
        $(".t-content .t-mini-app", line).html("<div id='miniApp'></div>");
        var bckColor = rgb2hex($(line).css("background-color"));
        openMiniApp(compoLink, bckColor);
        saveGA("watch_mix_top_50", "Watch mix " + compoLink + " from TOP 50", "watch_mix");
    }
    // Selon si on clique ou dessus de la banner ou en dessous de la banner on la déplace pas de la même manière
    if ($(line).index() > 9) {
        $(".tab-top-50 #incredi-banner").removeClass("lineOpened");
    } else {
        $(".tab-top-50 #incredi-banner").addClass("lineOpened");
    }
}
function ajusterHauteurTabSearch(h) {
    $("#tab-research").css({ height: $("#tab-research").height() + h + "px" });
    $("#searchTableau").css({ height: $("#searchTableau").height() + h + "px" });
}
function closeLine(line) {
    $(".t-content .t-mini-app", line).empty();
    $(line).bind("mouseover", overTopLine);
    $(line).bind("mouseleave", outTopLine);
    $(line).removeClass("top-line-open");
    lineOpen = undefined;
}
function openMiniApp(compoLink, bckColor) {
    var tab = compoLink.split("-");
    var version = "v2";
    if (tab[1] != undefined) {
        version = tab[1].toLowerCase();
    }
    var flashvars = {};
    flashvars.mini = true;
    flashvars.compo = compoLink;
    flashvars.domain = domain;
    flashvars.rootFolder = "app/";
    flashvars.appFolder = version + "/";
    var params = {};
    params.menu = "false";
    params.quality = "best";
    params.wmode = "opaque"; /* IE8 prob z-index*/
    params.bgcolor = bckColor;
    params.allowfullscreen = "false";
    params.allowscriptaccess = "always";
    var attributes = {};
    var r = new Date().getMilliseconds();
    swfobject.embedSWF(domain + "app/index.swf?" + r, "miniApp", "500px", "200px", "9.0.0", "", flashvars, params, attributes);
}
function stopMiniApp(compoLink) {
    openMiniApp(compoLink);
}
function overBtLine() {
    var txt;
    if ($(this).hasClass("fb")) {
        txt = "Share it on Facebook";
    } else if ($(this).hasClass("tw")) {
        txt = "Share it on Twitter";
    } else if ($(this).hasClass("ma")) {
        txt = "Send it to a friend";
    } else {
        txt = "Download this track";
    }
    var span = $(this).parent().find("span");
    span.html(txt);
    TweenMax.to(span, 0, { opacity: 0, marginLeft: "10px", ease: Quint.easeOut, overwrite: true });
    span.show();
    TweenMax.to(span, 0.25, { opacity: 1, marginLeft: "0px", ease: Quint.easeOut, overwrite: true });
}
function outBtLine() {
    $(this).parent().find("span").hide();
}
// ------------------------------------------------------------------
// --------------------------------------- VOTER POUR UN COMPO TOP 50
var voteEnCours = false;
function voteLine(bt, urlCompo) {
    if (!voteEnCours) {
        voteEnCours = true;
        ajaxCall("POST", domain + "php/save-like-music.php", { lienMusic: urlCompo }, callbackVoteLine, { bouton: bt });
    }
}
function callbackVoteLine(msg, params) {
    var bt = params.bouton;
    var de = 1.2;
    switch (msg) {
        case "reponse=ok":
            $(bt).attr("onclick", "").css({ "background-color": "#555", "background-image": "url(img/ic-check.png)" }).html("Thank you!");
            break;
        case "reponse=deja":
            $(bt).attr("onclick", "").css({ "background-color": "#555", "background-image": "none", padding: "0px 15px" }).html("Only once ; )");
            de = 2;
            break;
        default:
            $(bt).attr("onclick", "").css({ "background-color": "#555", "background-image": "none", "padding-left": "10px" }).html("Sorry, impossible to vote for now");
            de = 3;
            break;
    }
    TweenMax.to($(bt), 0.3, { width: 0, padding: 0, opacity: 0, ease: Quint.easeIn, overwrite: true, delay: de, onComplete: masquerBtLike, onCompleteParams: [bt] });
    voteEnCours = false;
}
function masquerBtLike(bt) {
    $(bt).hide();
}
// ---------------------------------------------------------------
// --------------------------------------- FILTRER LA LISTE TOP 50
var filterD = "week";
var filterG = "v4";

function initFilter() {
    $("#top-50 #filter-" + filterG).addClass("opaque");
    $("#top-50 #filter-" + filterD).addClass("opaque");
    $("#top-50 #" + filterG + "-" + filterD).css({ display: "block" });
}
function filterDate(d) {
    if (filterD != d) {
        if (lineOpen != undefined) {
            closeLine(lineOpen);
            lineOpen = undefined;
        }
        $("#top-50 .list-top-50").css({ display: "none" });
        $("#top-50 #filter-" + filterD).removeClass("opaque");
        filterD = d;
        $("#top-50 #filter-" + filterD).addClass("opaque");
        $("#top-50 #" + filterG + "-" + filterD).css({ display: "block" });
        $(".tab-top-50 #incredi-banner").removeClass("lineOpened");
    }
}
function filterGame(g) {
    if (filterG != g) {
        $("#top-50 .list-top-50").css({ display: "none" });
        $("#top-50 #filter-" + filterG).removeClass("opaque");
        filterG = g;
        $("#top-50 #filter-" + filterG).addClass("opaque");
        $("#top-50 #" + filterG + "-" + filterD).css({ display: "block" });
        $(".tab-top-50 #incredi-banner").removeClass("lineOpened");
    }
}
// -------------------------------------------------------------------------
// ---------------------------------------------- RECHERCHER UNE COMPOSITION
var searchEnCours = false;
var lastSearch = "";
var sNom;
var searchRapport;
var searchTableau;
var searchNav;
var nbPageSearch;
var curPageSearch = 0;

function initSearchCompo() {
    sNom = $("#sNom");
    searchRapport = $("#searchRapport");
    searchTableau = $("#searchTableau");
    searchNav = $("#searchNav");
}
function searchCompo() {
    if (!searchEnCours) {
        searchEnCours = true;
        var nom = sNom.val();
        var test = nom.split(" ").join("");
        if (test.length < 3) {
            displaySearchRapport("Your search must be at least 3 characters...");
            nom = "";
        }
        if (nom.length < 3 || nom == lastSearch) {
            nom = "";
        }
        if (nom != "") {
            //window.location.hash = nom;
            lastSearch = nom;
            $("#sBtSearch").addClass("sNomSearch");
            ajaxCall("POST", domain + "php/recup-top-50-search.php", { nom: encodeURIComponent(nom), langue: "en" }, callbackSearchCompo, {});
            saveGA("search_form_top50", "Search a mix from TOP 50", "search_form");
        } else {
            curPageSearch = 0;
            searchEnCours = false;
        }
    }
}
function callbackSearchCompo(msg, params) {
    if (searchEnCours) {
        if (msg == "0") {
            displaySearchRapport("0 result for this search...");
        } else {
            tabInclude.hide();
            $(".tab-top-50 #incredi-banner").hide();
            pageTop.hide();
            searchNav.empty();
            searchRapport.empty();
            afficherTab(tabResearch);
            searchTableau.html(msg);
            TweenMax.to($("#search-compo form #sBtClear"), 0.25, { width: "30px", ease: Quint.easeOut, overwrite: true });
            nbPageSearch = $("#tab-research #sNbPage").html();
            $("#tab-research .list-top-50#result0").show();
            $("#searchTableau #blocNavSearch").appendTo(searchNav);
            $("#searchTableau .top-line").bind("mouseover", overTopLine);
            $("#searchTableau .top-line").bind("mouseleave", outTopLine);
        }
        $("#sBtSearch").removeClass("sNomSearch");
        curPageSearch = 0;
        searchEnCours = false;
    }
}
function displaySearchRapport(txt) {
    searchRapport.html(txt);
    TweenMax.to(searchRapport, 0, { marginRight: "20px", ease: Quint.easeInOut, overwrite: true });
    TweenMax.to(searchRapport, 0.3, { marginRight: "0px", ease: Bounce.easeOut, overwrite: true });
}
// ----------------------------------------------------------------------------
// ---------------------------------------------- VIDER LE TABLEAU DE RECHERCHE
function clearSearchCompo() {
    if (searchTableau.html() != "") {
        TweenMax.to($("#search-compo form #sBtClear"), 0.25, { width: "0px", ease: Quint.easeOut, overwrite: true });
        $("#sBtSearch").removeClass("sNomSearch");
        lastSearch = "";
        searchRapport.empty();
        sNom.val("");
        curPageSearch = 0;
        $("#searchTableau .top-line").unbind("mouseover", overTopLine);
        $("#searchTableau .top-line").unbind("mouseleave", outTopLine);
        searchEnCours = false;
        searchTableau.empty();
        searchNav.empty();
        afficherTab(tabInclude);
        afficherPageTop();
        tabResearch.hide();
        setTimeout(function () {
            // Faire réapparaitre la banner full app après que le tableau se soit recaler en haut en transition
            $(".tab-top-50 #incredi-banner").fadeIn();
        }, 250);
    }
}
function afficherTab(tab) {
    tab.show();
    TweenMax.to(tab, 0, { marginTop: "110px", ease: Quint.easeOut, overwrite: true });
    TweenMax.to(tab, 0.3, { marginTop: "0px", ease: Quint.easeOut, overwrite: true });
}
function afficherPageTop() {
    pageTop.show();
    TweenMax.to(pageTop, 0, { marginTop: "110px", ease: Quint.easeOut, overwrite: true });
    TweenMax.to(pageTop, 0.3, { marginTop: "0px", ease: Quint.easeOut, overwrite: true });
}
// -------------------------------------------------------------------------------
// ---------------------------------------------- SELECTIONNER LE BT 0 DE LA LISTE
function avanceSearch() {
    if (curPageSearch < nbPageSearch - 1) {
        if (lineOpen != undefined) {
            closeLine(lineOpen);
            lineOpen = undefined;
        }
        $("#tab-research #result" + curPageSearch.toString()).hide();
        curPageSearch++;
        $("#tab-research #result" + curPageSearch.toString()).show();
        $("#tab-research #sNbNum").html(curPageSearch + 1);
    }
}
function reculeSearch() {
    if (curPageSearch > 0) {
        if (lineOpen != undefined) {
            closeLine(lineOpen);
            lineOpen = undefined;
        }
        $("#tab-research #result" + curPageSearch.toString()).hide();
        curPageSearch--;
        $("#tab-research #result" + curPageSearch.toString()).show();
        $("#tab-research #sNbNum").html(curPageSearch + 1);
    }
}
// ----------------------------------------------------------------------------
// ---------------------------------------------- RECHERCHE AUTOMATIQUE VIA URL
function checkURLsearch() {
    if (getHash() != "") {
        window.location.hash = "";
    }
    // Pour faire une recherche auto via URL ex: incredibox.com/top-50 (good idea mais pas comme ça -> GG mail)
    /*var hashurl = window.location.hash.substr(1);
	if(hashurl!= '' && hashurl!=undefined){
		sNom.val(hashurl);
		searchCompo();
	}*/
}