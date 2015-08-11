.STVL_logo {
     background: none repeat scroll 0% 0% transparent;
     display: block;
     float: left;
     height: 35px;
     margin: 10px 15px 0px 6px;
     width: auto;
}

.STVLcls {
    
}

#STVLHeader {
     background: url("https://streamtest.github.io/badges/top_bg.png") repeat-x scroll left top transparent;
     padding: 10px;
    border-radius: 2px;
}
#STVLBody a {
    background: none repeat scroll 0 0 #333333;
    border-radius: 2px;
    display: block;
    font-size: 16px;
    font-weight: 400;
    margin: 0 0 1px;
    padding: 13px;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#presetStreamUrlsMsg {
    text-align: center;
    width: 100%;
    display: none;
}

<<<<<<< HEAD
#STVLBody a:link, #STVLBody a:visited {
    color: #FFFFFF !important;
}
=======
include("https://streamtest.github.io/badges/streamtestbadge.css", "css");

function jqueryLoaded() {
    clearInterval(jQueryLoadCheckInterval);
    jQuery(document).ready(function () {
        var popupStatus = 0;

        function loadPopup() {
            if (popupStatus === 0) {

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

        function hideBadge() {
            jQuery('#streamtestBadge').hide();
        }

        var fullhtml = jQuery("html").html();

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

        }

        if (jQuery('#StreamTestVideoList').length === 0) {
            jQuery(document.body).append(getStreamTestVideoList());
			}

        jQuery("#StreamTestClose").click(function () {
            disablePopup();
        });

        jQuery("#StreamTestBackground").click(function () {
            disablePopup();
        });
>>>>>>> origin/gh-pages

#STVLBody a:active {
     color: #6FA5FD;
}

#StreamTestBackground {
     background: rgba(0,0,0,0.7);
     border: 1px solid #CECECE;
     display: none;
     height: 100%;
     left: 0px;
     position: fixed;
     top: 0px;
     width: 100%;
     z-index: 9999;
}

#StreamTestVideoList {
     background: linear-gradient(#FFFFFF, #E5E5E5 100%) repeat scroll 0px 0px transparent;
     border-radius: 5px;
     display: none;
     font-family: sans-serif;
     font-size: 13px;
     height: 384px;
     position: fixed;
     width: 408px;
     z-index: 10000;
     top: 50%;
     left: 50%;
     margin: -192px 0 0 -204px;
     box-shadow: 0 0 15px 1px #111111;
}

#StreamTestVideoList span {
     color: #6FA5FD;
     font-size: 12px;
     font-weight: 400;
     text-align: left;
}

#STVLhd {
     height: 40px;
}

#StreamTestClose {
     background-color: #CA1B1F;
     border-radius: 2px;
     color: #FFFFFF;
     cursor: pointer;
     display: block;
     font-family: Lucida Console;
     margin: 0px 0px 0px 5px;
     padding: 0px 4px 1px;
     position: absolute;
     right: 6px;
     top: 6px;
     vertical-align: text-top;
}

#STVLBody {
    height: 66%;
    margin: 5px 10px;
    overflow: auto;
    padding: 5px 10px;
}

#STVLBody a:hover[href*=".pls"]:after {
    color: #CCC;
    content: "\00ab  SHOUTCAST Stream";
    font-size: 0.7em;
    background: #222;
    padding: 15px 13px 16px 14px;
    margin: -13px -12px -14px 0;
    vertical-align: middle;
    letter-spacing: 1px; 
    position: absolute; 
    float: right;
    white-space: nowrap;
    right: 29px;
    border-radius: 0 3px 3px 0;
}

#STVLBody a:hover[href*=".mov"]:after, #STVLBody a:hover[href*=".mp4"]:after, #STVLBody a:hover[href*=".flv"]:after {
    color: #CCC;
    content: "\00ab  On-Demand Stream";
    font-size: 0.7em;
    background: #222;
    padding: 15px 13px 16px 14px;
    margin: -13px -12px -14px 0;
    vertical-align: middle;
    letter-spacing: 1px; 
    position: absolute; 
    float: right;
    white-space: nowrap;
    right: 29px;
    border-radius: 0 3px 3px 0;
}

<<<<<<< HEAD
#STVLBody a:hover[href*=".m3u8"]:after {
    color: #CCC;
    content: "\00ab  HLS Stream";
    font-size: 0.7em;
    background: #222;
    padding: 15px 13px 16px 14px;
    margin: -13px -12px -14px 0;
    vertical-align: middle;
    letter-spacing: 1px; 
    position: absolute; 
    float: right;
    white-space: nowrap;
    right: 29px;
    border-radius: 0 3px 3px 0;
}
=======
        jQuery("object").each(function (index, element) {
            var type = jQuery(element).attr('type');
            var responsive = jQuery(element).parent().css("padding-bottom").replace(/[^-\d\.]/g, '');
			var responsiveHeight = Math.round(jQuery(element).parent().css("height").replace(/[^-\d\.]/g, ''));
			var parentWidth= jQuery(element).parent().width();
			var percentPadding = Math.round((responsive/parentWidth) * 100);
			var videoPosition = jQuery(element).css("position");
			
			var leftOffset = jQuery(element).offset().left;
			
			var elementWidth = jQuery(element).width();
			
			var elementHeight = jQuery(element).height();
			
			var documentWidth = jQuery(document).width();
			
			if(jQuery(element).attr('wmode')) {
                
		        } else {
		        	jQuery(element).attr('wmode', 'opaque');
		        }
>>>>>>> origin/gh-pages

#STVLBody a:hover[href*="rtmp"]:after {
    color: #CCC;
    content: "\00ab  RTMP Stream";
    font-size: 0.7em;
    background: #222;
    padding: 15px 13px 16px 14px;
    margin: -13px -12px -14px 0;
    vertical-align: middle;
    letter-spacing: 1px; 
    position: absolute; 
    float: right;
    white-space: nowrap;
    right: 29px;
    border-radius: 0 3px 3px 0;
}



#STVLFooter {
    background: url("https://streamtest.github.io/badges/top_bg.png") repeat-x scroll left top rgba(0, 0, 0, 0);
    border-radius: 0 0 4px 4px;
    bottom: 0;
    color: #CCCCCC;
    font-size: 11px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    text-align: center;
    width: 100%;
	text-shadow: 0 0 7px #000000;
}

.streamtestButtonLink {
	text-decoration: none !important;
	position: absolute !important;
	overflow: hidden;
	display: block;
	margin: 0 auto;
	z-index: 999;
}


.streamButton {
	background: url(https://streamtest.github.io/badges/streamtestgaugebold.png) no-repeat left center;
	background-color: rgba(245, 245, 245, 0.5);
	font-size: 12px;
	font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
	text-transform: uppercase;
	font-style: italic;
	line-height: 1.9;
	color: #333;
	background-size: 30px auto, auto;
	background-position: 10px, 0;
	height: 20px;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	padding: 16px 5px;
	white-space: nowrap;
	text-align: left;
	text-indent: 42px;
    overflow: hidden; 
	float: right;
    width: 3px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	transition: width 0.5s ease;
	-webkit-transition: width 0.5s ease;
	-moz-transition: width 0.5s ease;
	-ms-transition: width 0.5s ease;
}

.streamButton:hover {
    width: 160px;
	background-color: rgba(245, 245, 245, 1);
}

.streamButton:before {
	content: url(https://streamtest.github.io/badges/badgeicon.png);
	font-size: 30px;
	position: absolute;
	top:2px;
	color: #fff;
	left: -37px;
	opacity: 0.7;
	transition: opacity 0.4s ease;
	-webkit-transition: opacity 0.4s ease;
	-moz-transition: opacity 0.4s ease;
	-ms-transition: opacity 0.4s ease;
}

.streamButton:hover:before {
    opacity: 0;
}
