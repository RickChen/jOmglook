(function ($) {
    $.fn.jOmglook = function (option, settings) {
        if (typeof option === 'object') {
            settings = option;
        } else if (typeof option === 'string') {
            var data = this.data('_jOmglook');

            if (data) {
                if ($.fn.jOmglook.defaultSettings[option] !== undefined) {
                    if (settings !== undefined) {
                        //if you need to make any specific changes to the DOM make them here
                        data.settings[option] = settings;
                        return true;
                    } else return data.settings[option];
                } else return false;
            } else return false;
        }

        settings = $.extend({}, $.fn.jOmglook.defaultSettings, settings || {});

        return this.each(function () {
            var $elem = $(this);

            var $settings = jQuery.extend(true, {}, settings);

            var omglook = new Omglook($settings);

            omglook.generate();
            omglook.appendLinks($elem);
            omglook.cleanStyles();

            // run some code here
            // try to keep as much of the main code in the prototype methods as possible
            // focus on just setting up the plugin and calling proper methods from here

            $elem.data('_jOmglook', omglook);
        });
    }

    $.fn.jOmglook.defaultSettings = {
        container: $('body'),
        url: document.URL,
        spacing: "6px"

    };

    function Omglook(settings) {
        this.omglook = null;
        this.settings = settings;

        return this;
    }

    Omglook.prototype = {
        generate: function () {
            var $this = this;
            if ($this.omglook) return $this.omglook;
            return $this.omglook;
        },

        appendLinks: function (elem) {
            //code
            var $this = this;
            if (elem) {
                $this.fbShare(elem);
                $this.pinShare(elem);
                $this.googShare(elem);
                $this.twitShare(elem);
            }
        },

        fbShare: function (elem) {
            var fb = $('<div class="_jOmglook_link _jOmglook_facebook"><iframe src="https://www.facebook.com/plugins/like.php?href=' + this.settings.url + '" scrolling="no" frameborder="0"></iframe></div>');
            elem.append(fb);
            this.settings.container.append('');
        },

        pinShare: function (elem) {
            var pin = $('<a href="http://pinterest.com/pin/create/button/" class="pin-it-button _jOmglook_link" count-layout="horizontal"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>');
            elem.append(pin);
        },

        twitShare: function (elem) {
            var twit = $('<div class="_jOmglook_link"><a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-dnt="true" data-count="none">Tweet</a></div>');
            elem.append(twit);
            this.settings.container.append('<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>');
        },

        googShare: function (elem) {
            var goog = $('<div class="_jOmglook_link"><g:plusone size="medium" annotation="none"></g:plusone></div>');
            elem.append(goog);
            this.settings.container.append('<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>');
        },

        cleanStyles: function () {
            /*specific css fixes so we can tialor each button to play nicely*/

            var globalStyles = {
                'margin': 0,
                'padding': 0,
                'width': 'auto',
                'line-height': '1em',
                'float': 'left',
                'margin-right': this.settings.spacing || ""
            }
            $('._jOmglook_link').css(globalStyles);

            var facebookStyle = {
                'width': '52px',
                'height': '24px',
                'overflow': 'hidden'
            }
            $('._jOmglook_facebook').css(facebookStyle);
        }
    }
})(jQuery);
