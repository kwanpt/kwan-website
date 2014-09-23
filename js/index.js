$(document).ready(function() {
    var cookieSet = getCookie("set");
    if (cookieSet == "") {
        var rand = Math.ceil(Math.random() * 2);
        switch (rand) {
            case 1:
                {
                    cookieSet = "Fun"
                    break;
                }
            case 2:
                {
                    cookieSet = "Happy"
                    break;
                }
        }
        setCookie("set", cookieSet);
    }
    var currentSet = cookieSet;
    if (currentSet == "Fun") {
        $("#background1").css("background-image", "url(images/bg1.jpg)");
    } else if (currentSet == "Seductive") {
        $("#background1").css("background-image", "url(images/bg1.jpg)");
    } else if (currentSet == "Happy") {
        $("#background1").css("background-image", "url(images/bg1.jpg)");
    } else {
        $("#background1").css("background-image", "url(images/bg1.jpg)");
    }

    preparePages();
    var videoStart = null;
    $(".fancybox").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'padding': '0',
        'hideOnOverlayClick': 'true'
    });
    var scrolling = false;
    var previousTimestamp = 0;
    var wheelDelta = 0;

    function wheelHandle(event) {
        event.preventDefault();
        if (scrolling || (event.timeStamp - previousTimestamp < 50)) {
            previousTimestamp = event.timeStamp;
            return false;
        }
        var point = getPointFromEvent(event);
        var x = point[0] - 10;
        var y = point[1] - 10;
        wheelDelta += getDeltaFromEvent(event);
        if (wheelDelta > 20) {
            scrolling = true;
            previousTimestamp = event.timeStamp;
            previousPage();
            setTimeout(function() {
                $('#blocker').css({
                    left: x,
                    top: y
                });
            });
        } else if (wheelDelta < -20) {
            scrolling = true;
            previousTimestamp = event.timeStamp;
            nextPage();
            setTimeout(function() {
                $('#blocker').css({
                    left: x,
                    top: y
                });
            });
        }
        if (scrolling) {
            event.stopPropagation();
            wheelDelta = 0;
            setTimeout(function() {
                scrolling = false;
                $('#blocker').css({
                    left: -20,
                    top: -20
                });
            }, 500);
        }
    }
    var originalTouch;

    function touchStartHandle(event) {
        originalTouch = getPointFromEvent(event);
    }

    function touchMoveHandle(event) {
        if (scrolling || (event.timeStamp - previousTimestamp < 50)) {
            previousTimestamp = event.timeStamp;
            console.log("Scrolling. Ignore");
            return;
        }
        var point = getPointFromEvent(event);
        if (point[1] - originalTouch[1] < -20) {
            scrolling = true;
            previousTimestamp = event.timeStamp;
            nextPage();
        } else if (point[1] - originalTouch[1] > 20) {
            scrolling = true;
            previousTimestamp = event.timeStamp;
            previousPage();
        }
        console.log("Scrolling started.");
        setTimeout(function() {
            console.log("Scrolling ended.");
            scrolling = false;
            $('#blocker').css({
                left: 0,
                top: 0
            });
        }, 500);
    }
    var currentPage = 1;
    var totalPages = 4;
    var didMovePage = false;
    var duration = 500;
    var bounceInterval = setInterval(function() {
        if (!didMovePage) {
            var originalMarginBottom = $('.footer').outerHeight();
            if (originalMarginBottom) {
                originalMarginBottom = parseInt(originalMarginBottom);
                $('#bouncy').animate({
                    'margin-bottom': originalMarginBottom + 20
                }, duration, "easeOutQuad");
                setTimeout(function() {
                    $('#bouncy').animate({
                        'margin-bottom': originalMarginBottom
                    }, duration, "easeInQuad");
                }, duration + 100);
            }
        } else {
            clearInterval(bounceInterval);
        }
    }, 2 * duration + 200);

    function preparePages() {
        $('#background1').css({
            opacity: 1
        });
        $('#background2').css({
            opacity: 0
        });
        $('#background3').css({
            opacity: 0
        });
        $('#background4').css({
            opacity: 0
        });
        $('#navtitle1').css({
            opacity: 1
        });
        $('#navtitle2').css({
            opacity: 0
        });
        $('#navtitle3').css({
            opacity: 0
        });
        $('#navtitle4').css({
            opacity: 0
        });
        $('#content1').css({
            opacity: 1
        });
        $('#content1').show();
        $('#content2').css({
            opacity: 0
        });
        $('#content2').hide();
        $('#content3').css({
            opacity: 0
        });
        $('#content3').hide();
        $('#content4').css({
            opacity: 0
        });
        $('#content4').hide();
        $('.navitem1').addClass('selected');
        $('#sensor,.sidenav,.header,.footer,.content').bind('DOMMouseScroll mousewheel wheel', function(event) {
            wheelHandle(event);
        });
        $('#sensor,.sidenav,.header,.footer,.content').bind('touchstart', function(event) {
            touchStartHandle(event);
        });
        $('#sensor,.sidenav,.header,.footer,.content').bind('touchmove', function(event) {
            touchMoveHandle(event);
        });
        $('#blocker').bind('DOMMouseScroll mousewheel wheel', function(event) {
            event.preventDefault();
        });
        $('.prev').click(function(event) {
            previousPage();
            event.preventDefault();
        });
        $('.next').click(function(event) {
            nextPage();
            event.preventDefault();
        });
        $('.navitem1').click(function(event) {
            goToPage(1);
            event.preventDefault();
        });
        $('.navitem2').click(function(event) {
            goToPage(2);
            event.preventDefault();
        });
        $('.navitem3').click(function(event) {
            goToPage(3);
            event.preventDefault();
        });
        $('.navitem4').click(function(event) {
            goToPage(4);
            event.preventDefault();
        });
        $('.navitem5').click(function(event) {
            goToPage(5);
            event.preventDefault();
        });
    }

    function goToPage(page) {
        if (currentPage == page) {
            return;
        }
        if (page == 5) {
            $('#overlay').animate({
                'opacity': 0
            }, 450, function() {
                $(this).hide();
            });
        } else {
            $('#overlay').show();
            $('#overlay').animate({
                'opacity': 1
            }, 450);
        }
        if (page == totalPages) {
            $("#bouncy").css({
                display: "none"
            });
        } else {
            $("#bouncy").css({
                display: "initial"
            });
        }
        didMovePage = true;
        $('#background' + currentPage).animate({
            opacity: 0
        }, 700);
        $('#background' + page).animate({
            opacity: 1
        }, 700);
        $('#navtitle' + currentPage).animate({
            opacity: 0
        });
        $('#navtitle' + page).animate({
            opacity: 1
        }, 700);
        $('.navitem' + currentPage).removeClass('selected');
        $('.navitem' + page).addClass('selected');
        $('#content' + currentPage).animate({
            'opacity': 0,
            'margin-top': -8
        }, 450, function() {
            $(this).hide();
        });
        setTimeout(function() {
            $('#content' + page).show();
            $('#content' + page).css({
                opacity: 0,
                'margin-top': 8
            });
            $('#content' + page).animate({
                opacity: 1,
                'margin-top': 0
            }, 450);
        }, 450);
        currentPage = page;
    }

    function nextPage() {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }

    function getDeltaFromEvent(event) {
        var originalEvent = event.originalEvent;
        var delta = 0;
        if (originalEvent) {
            delta = originalEvent.wheelDelta;
            if (!delta) {
                delta = (-1 * originalEvent.deltaY);
            }
        }
        return delta;
    }

    function getPointFromEvent(event) {
        var x = event.pageX;
        if (!x) {
            if (event.originalEvent) {
                var original = event.originalEvent;
                if (original.touches) {
                    var touch = original.touches[0];
                    if (touch) {
                        x = touch.pageX;
                    } else {
                        x = 0;
                    }
                } else {
                    if (original.pageX) {
                        x = original.pageX;
                    } else {
                        x = 0;
                    }
                }
            } else {
                x = 0;
            }
        }
        var y = event.pageY;
        if (!y) {
            if (event.originalEvent) {
                var original = event.originalEvent;
                if (original.touches) {
                    var touch = original.touches[0];
                    if (touch) {
                        y = touch.pageY;
                    } else {
                        y = 0;
                    }
                } else {
                    if (original.pageY) {
                        y = original.pageY;
                    } else {
                        y = 0;
                    }
                }
            } else {
                y = 0;
            }
        }
        return [x, y];
    }

    function setCookie(name, value) {
        var d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + value + "; " + expires;
    }

    function getCookie(name) {
        var name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function deleteCookie(name) {
        setCookie(name, "");
    }
});
