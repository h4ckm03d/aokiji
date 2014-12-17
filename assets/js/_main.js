/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
        var window_width = $(window).width();

        // convert rgb to hex value string
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        $('.dynamic-color .col').each(function () {
            $(this).children().each(function () {
                var color = $(this).css('background-color');
                var classes = $(this).attr('class');
                $(this).html(rgb2hex(color) + " " + classes);
                if (classes.indexOf("darken") >= 0) {
                    $(this).css('color', 'rgba(255,255,255,.9');
                }
            });
        });


        // Floating-Fixed table of contents
        $('.table-of-contents').each(function() {
            var origin = $(this);
            $(window).scroll(function() {
                var tabs_height = 0;
                if ($('.tabs-wrapper').length) {
                    tabs_height = $('.tabs-wrapper').height();
                }
                if (origin.is(":visible")) {

                    if(origin.attr('data-origpos') === undefined) {
                        origin.attr('data-origpos', origin.position().top - tabs_height);
                    }
                    if(origin.attr('data-origmargin') === undefined) {
                        origin.attr('data-origmargin', '1.5rem');
                    }
                    if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
                        origin.addClass('fixed');
                        origin.css('top', tabs_height);
                        origin.css('marginTop', '1.5rem');
                    }
                    if($(window).scrollTop() < origin.attr('data-origpos')) {
                        origin.removeClass('fixed');
                        origin.css('marginTop', origin.attr('data-origmargin'));
                    }

                }
            });
        });

        // BuySellAds Detection
        var $bsa = $(".buysellads");
        var $timesToCheck = 3;
        function checkForChanges()
        {
            if ($bsa.find('.bsa_it').height() > 0)
            {
                $('.table-of-contents').css('marginTop', 285);
                // Floating-Fixed table of contents
                $('.table-of-contents').each(function() {
                    var origin = $(this);
                    var tabs_height = 0;
                    if ($('.tabs-wrapper').length) {
                        tabs_height = $('.tabs-wrapper').height();
                    }
                    $(window).scroll(function() {

                        if (origin.is(":visible")) {
                            origin.attr('data-origpos', origin.position().top - tabs_height + 285);
                            origin.attr('data-origmargin', 285);
                        }
                    });
                });
            }
            else {
                $timesToCheck -= 1;
                if ($timesToCheck >= 0) {
                    setTimeout(checkForChanges, 500);
                }
            }

        }
        checkForChanges();



        // Tabs Fixed
        $(window).scroll(function() {
            var origin = $('.tabs-wrapper');
            var origin_row = origin.find('.row');
            if (origin.is(":visible")) {
                if(origin.attr('data-origpos') === undefined) {
                    origin.attr('data-origpos', origin.position().top);
                }
                if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
                    origin_row.addClass('fixed');
                }
                if($(window).scrollTop() < origin.attr('data-origpos')) {
                    origin_row.removeClass('fixed');
                }
            }
        });

        // Github Latest Commit
        if ($('.github-commit').length) { // Checks if widget div exists (Index only)
            $.ajax({
                url: "https://api.github.com/repos/dogfalo/materialize/commits/master",
                dataType: "json",
                success: function (data) {
                    var sha = data.sha;
                    var date = jQuery.timeago(data.commit.author.date);
                    if (window_width < 600) {
                        sha = sha.substring(0,7);
                    }
                    $('.github-commit').find('.date').html(date);
                    $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);

                    // console.log(returndata, returndata.commit.author.date, returndata.sha);
                }
            });
        }

        // Toggle Flow Text
        var toggleFlowTextButton = $('#flow-toggle');
        toggleFlowTextButton.click( function(){
            $('#flow-text-demo').children('p').each(function(){
                $(this).toggleClass('flow-text');
            });
        });

//    Toggle Containers on page
        var toggleContainersButton = $('#container-toggle-button');
        toggleContainersButton.click(function(){
            $('body .browser-window .container, .had-container').each(function(){
                $(this).toggleClass('had-container');
                $(this).toggleClass('container');
            });
        });


        // Plugin initialization
        $('.dropdown-button').dropdown({hover: false});
        if (window_width > 600) {
            $('ul.tabs').tabs();
        }
        else {
            $('ul.tabs').hide();
        }
        $('.tab-demo').show().tabs();
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({"delay": 300});
        $('.collapsible-accordion').collapsible();
        $('.collapsible-expandable').collapsible({"accordion": false});
        $('.materialboxed').materialbox();
        $('.scrollspy').scrollSpy();
        $('.button-collapse').sideNav();
        $('.datepicker').pickadate({ formatSubmit: 'yyyy/mm/dd' });
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
