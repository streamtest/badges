var globalUrlArray = [];
var sanitizationCharacters = ["\"", "&quot"];
var hasjQueryLoaded = false
var jQueryLoadCheckInterval = -1;
var badgeMode = 2; //Badge Mode 1 = Show Badge No Auto Placement, 2 = Hide Badge Auto Placement, 3 = Show Badge Auto Placement 

function include(filename, type) {
    var head = document.getElementsByTagName('head')[0];
    if (type == "js") {
        var script = document.createElement('script');
        script.src = filename;
        script.type = 'text/javascript';
        head.appendChild(script)
    }
    if (type == "css") {
        var cs_s = document.createElement('link');
        cs_s.href = filename;
        cs_s.type = 'text/css';
        cs_s.setAttribute("rel", "stylesheet");
        head.appendChild(cs_s);
    }
}
function getStreamTestVideoList() {
    return "<div id='StreamTestVideoList' >" +
	"<a><button id='StreamTestClose'>x</button></a>" +
	"<div id='STVLHeader'>" +
	"<img class=\"STVL_logo\" src=\"http://www.streamtest.net/content/img/logo.png\" /><br/><br/>" +
	"<div id='STVLhd'><span>We have detected the following streams on this page, which one would you like to test?</span><br/>" +
	"</div>" +
	"</div>" + '<p id="presetStreamUrlsMsg">' + window.location.host + ' is offering the following streams for testing: </p>' +
	"<div id='STVLBody'>" +
	"</div><div id=\"STVLFooter\">&copy; StreamTest.net All Rights Reserved</div>" +
	"</div>" +
	"<div id='StreamTestBackground'></div>"
}
if (!window.jQuery) {
    include("//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", "js")
}

include("https://streamtest.github.io/badges/streamtestbadge.css", "css");

function jqueryLoaded() {
    clearInterval(jQueryLoadCheckInterval);
    jQuery(document).ready(function () {
        var popupStatus = 0;

        function loadPopup() {
            if (popupStatus === 0) {

                jQuery("#StreamTestBackground").css({
                    "opacity": "0.7"
                });

                jQuery("#StreamTestBackground").fadeIn("slow");
                jQuery("#StreamTestVideoList").fadeIn("slow");

                if (typeof StreamTestURLS !== 'undefined' || window.location.host == "player.netromedia.com") {
                    jQuery("#presetStreamUrlsMsg").show();
                    jQuery("#STVLBody").css('height', '56%');
                }

                popupStatus = 1;
            }
        }
        function disablePopup() {
            if (popupStatus === 1) {
                jQuery("#StreamTestBackground").fadeOut("slow");
                jQuery("#StreamTestVideoList").fadeOut("slow");
                popupStatus = 0;
            }
        }
        function centerPopup() {
            var windowWidth = document.documentElement.clientWidth;
            var windowHeight = document.documentElement.clientHeight;
            jQuery("#StreamTestBackground").css({
                "height": windowHeight
            });
        }

        function sanitizeUrl(url) {
            var sanitizedUrl = url;

            for (var sanitizationCharactersIndex = 0; sanitizationCharactersIndex < sanitizationCharacters.length; sanitizationCharactersIndex++) {
                sanitizedUrl = sanitizedUrl.replace(sanitizationCharacters[sanitizationCharactersIndex], "");
            }

            return sanitizedUrl;
        }
        function findStreamUrls(regexes) {
            for (var regexIndex = 0; regexIndex < regexes.length; regexIndex++) {

                var matches = fullhtml.match(regexes[regexIndex]);

                if (matches != null) {
                    matches.forEach(function (url) {

                        var sanitizedUrl = sanitizeUrl(url);

                        if (sanitizedUrl.indexOf("http:") == -1 && sanitizedUrl.indexOf("https:") == -1 && sanitizedUrl.indexOf("rtmp:") == -1)
                            sanitizedUrl = "http:" + sanitizedUrl;

                        if (sanitizedUrl.match(/\//ig).length == 4) {
                            if (globalUrlArray.indexOf(sanitizedUrl) == -1)
                                globalUrlArray.push(sanitizedUrl);
                        }
                    });
                }
            }
        }
        function hideBadge() {
            jQuery('#streamtestBadge').hide();
        }

        var fullhtml = jQuery("html").html();

        var regexes = [];

        //regexes.push(/(rtmp|rtsp)(:\/\/[\w-]+)(\.[\w-]+)+([\w.,@?^=%&:\/~+#-]*[\w@?^=%&~+#-])?/g);
        regexes.push(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/g);
        regexes.push(/(http:|https:|)\/\/(player).(vimeo\.com)\/(video\/|embed\/|watch\?v=|v\/|user\/)?([A-Za-z0-9._%-]*)(\&\S+)?/g);

        findStreamUrls(regexes);

        var flashBaseUrlRegex = /&quot;baseUrl&quot;:&quot;+([^&]*)/g;
        var flashUrlRegex = /&quot;url&quot;:&quot;+([^&]*)/g;
        var flashBaseUrlMatches = fullhtml.match(flashBaseUrlRegex);
        var flashUrlMatches = fullhtml.match(flashUrlRegex);

        if (flashBaseUrlMatches != null && flashUrlMatches) {
            var url = flashBaseUrlMatches[0].replace("&quot;baseUrl&quot;:&quot;", "") + "/" + flashUrlMatches[0].replace("&quot;url&quot;:&quot;", "");

            var sanitizedUrl = url;
            if (sanitizedUrl[sanitizedUrl.length - 1] == "\"")
                sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 1);

            if (sanitizedUrl.substring(sanitizedUrl.length - "&quot".length) == "&quot")
                sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - "&quot".length);

            if (sanitizedUrl.match(/\//ig).length == 4) {
                if (globalUrlArray.indexOf(sanitizedUrl) == -1)
                    globalUrlArray.push(sanitizedUrl);
            }

        }

        var streamUrlListHtml = "";
        for (var i = 0; i < globalUrlArray.length; i++) {

            linkfound = globalUrlArray[i];
            streamUrlListHtml += "<a class='STLVhl' href=//www.streamtest.net/#test?streamUrl=" + linkfound + ">" + linkfound + " </a>";
        }

        if (jQuery('#StreamTestVideoList').length === 0)
            jQuery(document.body).append(getStreamTestVideoList());

        jQuery("#STVLBody").html(streamUrlListHtml);

        jQuery('a.STLVhl').each(function () {
            jQuery(this).attr('target', '_blank');
        });

        jQuery("#StreamTestClose").click(function () {
            disablePopup();
        });

        jQuery("#StreamTestBackground").click(function () {
            disablePopup();
        });

        jQuery(document).keypress(function (e) {
            if (e.keyCode == 27 && popupStatus == 1) {
                disablePopup();
            }
        });

        jQuery('#streamtestBadge').click(function (e) {
            centerPopup();
            loadPopup();
            e.preventDefault();
        });

        if (badgeMode === 2)
            hideBadge();
    });
}
function embedStreamtestBadge() {
    jQuery(document).ready(function () {

        jQuery("iframe").each(function (index, element) {
            var src = jQuery(element).attr('src');
            
            if (src) {
            
            	var leftMargin = parseInt(jQuery(element).width()) - 159;

            	if (src.indexOf("http:") == -1 && src.indexOf("https:") == -1 && src.indexOf("rtmp:") == -1)
                	src = "http:" + src;

            	if (src.indexOf("youtube") != -1 || src.indexOf("vimeo") != -1)
                	var button = jQuery(element).after("<a href=//www.streamtest.net/#test?streamUrl=" + src + " target='_blank'><button class='tabButton' style='margin: -6px 0 0 " + leftMargin + "px'>Test this Stream</button></a>");

		}
        });

        jQuery("object").each(function (index, element) {
            var type = jQuery(element).attr('type');
            var leftMargin = parseInt(jQuery(element).width()) - 159;

            if (type === "application/x-shockwave-flash") {

                var innerHtml = jQuery(element).html();

                var flashBaseUrlRegex = /&quot;baseUrl&quot;:&quot;+([^&]*)/g;
                var flashUrlRegex = /&quot;url&quot;:&quot;+([^&]*)/g;
                var flashBaseUrlMatches = innerHtml.match(flashBaseUrlRegex);
                var flashUrlMatches = innerHtml.match(flashUrlRegex);

                if (flashBaseUrlMatches && flashUrlMatches) {
                    var url = flashBaseUrlMatches[0].replace("&quot;baseUrl&quot;:&quot;", "") + "/" + flashUrlMatches[0].replace("&quot;url&quot;:&quot;", "");

                    var sanitizedUrl = url;
                    if (sanitizedUrl[sanitizedUrl.length - 1] == "\"")
                        sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - 1);

                    if (sanitizedUrl.substring(sanitizedUrl.length - "&quot".length) == "&quot")
                        sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length - "&quot".length);

                    jQuery(element).after("<a href=//www.streamtest.net/#test?streamUrl=" + sanitizedUrl + " target='_blank'><button class='tabButton' style='margin: -6px 0 0 " + leftMargin + "px'>Test Stream</button></a>")
                }
            }
        });
    });
}

function checkJquery() {
    if (window.jQuery) {
        hasjQueryLoaded = true;
        clearInterval(jQueryLoadCheckInterval);
        jqueryLoaded();
        if (badgeMode != 1)
            embedStreamtestBadge();
    }

    if (!hasjQueryLoaded && jQueryLoadCheckInterval == -1)
        jQueryLoadCheckInterval = window.setInterval(checkJquery, 100);
}
checkJquery();
