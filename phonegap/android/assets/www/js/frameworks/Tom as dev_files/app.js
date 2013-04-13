/**
 * @fileOverview Meeting Application
 * @author Tomas Roggero, Ezequiel Lauria
 */

// TODO: whatever happens after 10th tier is completed
// TODO: whatever happens after 3hs has passed
// TODO: bug when updateLevel is called after it's already ('.completed')

// TODO: Overlay with 'Gracias' (PUNTO_ENCUE_AMIGO_2013_03_26_GRACIAS.jpg)

/*jshint browser:true, jquery:true, strict:true, bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true, immed:true, indent:4, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, quotmark:"single", undef:true, unused:true, trailing:true, maxparams:3 */
/*jshint global:rga*/
var Quilmes = Quilmes || {};

(function(global, document, $, App, undefined){

    "use strict";

    var SERVICE_PREFIX = '/api',
        SERVICE_THROTTLE = [15, 30, 60, 120, 300],
        ANIMATION_TIME = 300,

        $win = $(global),
        $doc = $(document),
        $body = $('body');

    var Helpers = App.Helpers = {
        getAvatarsMarkup: function(checkins) {
            return $.map(checkins, function(fbid) {
                return '<li>'
                + '<img src="http://graph.facebook.com/' + fbid + '/picture?width=200&amp;height=200" alt="" />'
                + '<div class="mask"></div></li>';
            }).join('');
        },
        animatedScrollTo: function(destinationY) {
            $('html,body').animate({
                scrollTop: destinationY
            }, {
                duration: ANIMATION_TIME,
                step: function(offset) {
                    FB.Canvas.scrollTo(0, offset + 30);
                }
            });
        },
        formatTime: function(miliseconds) {
            if (typeof miliseconds === 'string') {
                miliseconds = (+miliseconds) * 1000;
            }
            var seconds = Math.floor((miliseconds / 1000) % 60),
                minutes = Math.floor((miliseconds / (60 * 1000)) % 60),
                hours = Math.floor((miliseconds / (60 * 60 * 1000)) % 24);
            (seconds < 10) && (seconds = '0' + seconds);
            (minutes < 10) && (minutes = '0' + minutes);
            (hours < 10) && (hours = '0' + hours);
            return hours + ':' + minutes + ':' + seconds;
        },
        animateTime: function($el, num) {
            var round = Math.round;
            if (num === 0) {
                return $el.text('00:00:00');
            }
            $el.animate({
                open: 1
            }, {
                duration: ANIMATION_TIME * 10,
                easing: 'linear',
                step: function(now, fx) {
                    // 0 < now < 1
                    // ~~ === Math.floor but faster!
                    // We are animating, so the faster, the better
                    var h = round(~~(num / 3600) * now) % 60,
                        m = round(~~(num / 60) * now) % 60,
                        s = round(num * now) % 60;
                    (h < 10) && (h = '0' + h);
                    (m < 10) && (m = '0' + m);
                    (s < 10) && (s = '0' + s);
                    $el.text(h + ':' + m + ':' + s);
                }
            });
            setTimeout(function() {
                $el.animate({
                    open: 0
                }, 1);
            }, ANIMATION_TIME * 11);
        }
    };

    var Timer = function(meeting) {
        this.meeting = meeting;
        this.startTime = new Date(parseInt(meeting.created + '000'));
        this.start();
    };

    Timer.prototype.start = function() {
        this.repeater = setInterval($.proxy(this.update, this), 1000);
    };

    Timer.prototype.update = function() {
        var diff = RGA.Time.limit - (((+new Date()) + RGA.Time.serverDiff) - (+this.startTime));
        if (diff <= 0) {
            this.stop();
            return this.meeting.timeContainer.html('-00:00:00');
        }
        this.meeting.timeContainer.html('-' + Helpers.formatTime(diff));
    };

    Timer.prototype.stop = function() {
        clearInterval(this.repeater);
        this.repeater = null;
        this.meeting.refresh();
    };

    var Meeting = function($el, created) {
        this.id = $el.data('id');
        this.levels = $el.children('.level');
        this.throttle = 0;
        this.created = created;
        this.timeContainer = $el.parent().find('.meeting-remaining-time');
    };

    Meeting.prototype.fetch = function(params, callback) {
        $.getJSON(SERVICE_PREFIX + '/pointstatus?meetingId=' + params, callback);
    };

    Meeting.prototype.updateLevel = function(data, level, callback) {
        var self = this,

            $level = this.levels.filter('.level-' + level),
            $peopleContainer = $level.find('.grid ul'),
            $remainingUsersLi = $level.find('.remaining-users').parent(),

            requiredPeople = $level.data('people'),
            avatars = Helpers.getAvatarsMarkup(data.checkins),
            newPeople = avatars.match(/<li>/g) && avatars.match(/<li>/g).length,
            addedPeople = 0,

            $avatarLis = $(avatars),
            avatarThrottle = (newPeople === requiredPeople) ? 0.1 : SERVICE_THROTTLE[self.throttle] / newPeople;
            // TODO: avatarThrottle should be related with request throttle in case of filling already completed levels

        // If there are new checkins, append animatedly
        if (newPeople) {
            $level.addClass('ongoing');
            $avatarLis.each(function(i) {
                var $li = $(this).hide();
                setTimeout(function() {
                    $peopleContainer
                        // Append avatar
                        .append($li)
                        // Move counter to last
                        .append($remainingUsersLi);
                    $li.fadeIn(ANIMATION_TIME);
                    addedPeople = $peopleContainer.children('li').length - 1;

                    // Update counter
                    if (addedPeople < requiredPeople) {
                        $remainingUsersLi.find('.remaining-users').text('-' + (requiredPeople - addedPeople));
                    } else {
                        $remainingUsersLi.remove();
                    }
                }, Math.floor(1000 * i * avatarThrottle));
            });
        } else if (level === 1) {
            $level.addClass('ongoing').find('.remaining-users').text('-' + requiredPeople);
        }

        // Finished the tier
        if (data.time) {
            // Update quantity of remaining votes for first uncompleted tier
            setTimeout(function() {
                // FB.Canvas.setSize({
                //     height: $('body').height() + 200
                // });
                $level
                    .find('.level-accomplished')
                        .hide()
                        .slideDown(ANIMATION_TIME)
                        .end()
                    .addClass('completed');
                // Commented out because I wasn't sure of the animation
                // Helpers.animatedScrollTo($level.find('.level-accomplished').offset().top);

                var $tierBestTime = $level.find('.level-data .best-time'),
                    $tierMyTime = $level.find('.level-data .my-time');
                Helpers.animateTime($tierMyTime, data.time || 0);
                Helpers.animateTime($tierBestTime, data.bestTime || data.besttime || 0);

                (typeof callback === 'function') && callback($level, level);
            }, $avatarLis.length * 1000 * avatarThrottle);
        }
    };

    Meeting.prototype.load = function() {
        var self = this;
        self.fetch(this.id, function(data) {
            var i = 0,
                callback = function($previousLevelContainer, previousLevel) {
                    // Show uncompleted count
                    var $firstUncompletedLevel = self.levels.not('.completed').eq(0);
                    $firstUncompletedLevel.find('.remaining-users').text('-' + $firstUncompletedLevel.data('people'));
                    // Iterate to next level
                    self.updateLevel(data.tiers[i++], i, callback);
                };

            self.timer = new Timer(self);
            self.lastFetch = data.current_time;
            // Clarification: data.tiers[0] === level-1 :)
            self.updateLevel(data.tiers[i++], i, callback);

            // TODO: move this code somewhere else, and update it on latest info!
            // For capacity information
            var $twitterLink = $('.twitter-link a'),
                base = $twitterLink.attr('href'),
                copy = $twitterLink.data('copy'),
                max = 0,
                missing;
            $.each(data.tiers, function(i, tier) {
                if (tier.checkins.length) {
                    max = i;
                }
            });
            missing = $('.level-' + (max+1)).data('people') - data.tiers[max].checkins.length;
            $twitterLink.attr('href', base + encodeURIComponent(
                copy.replace('{}', missing).replace('{}', max + 1)
            ));
        });

        setTimeout($.proxy(self.refresh, self), SERVICE_THROTTLE[self.throttle] * 1000);
    };

    Meeting.prototype.refresh = function() {
        var self = this;
        // NOTE: Nice to have: as getting closer to finish the level, SERVICE_THROTTLE ~= 0
        self.fetch(self.id + '&since=' + self.lastFetch, function(data) {
            self.lastFetch = data.current_time;
            var total = $.map(data.tiers, function(tier) {
                if (tier.checkins.length) {
                    return 1;
                }
            });

            if (total.length) {
                // Update
                var i = 0,
                    callback = function($previousLevelContainer, previousLevel) {
                        // Show uncompleted count
                        var $firstUncompletedLevel = self.levels.not('.completed').eq(0);
                        $firstUncompletedLevel.find('.remaining-users').text('-' + $firstUncompletedLevel.data('people'));
                        // Iterate to next level
                        self.updateLevel(data.tiers[i++], i, callback);
                    };
                self.updateLevel(data.tiers[i++], i, callback);
                // FIXME: it might happen that next request (15 secs) comes before all animations are finished.
                setTimeout($.proxy(self.refresh, self), SERVICE_THROTTLE[self.throttle = 0] * 1000);
            } else {
                // No new updates
                setTimeout($.proxy(self.refresh, self), SERVICE_THROTTLE[++self.throttle % SERVICE_THROTTLE.length] * 1000);
            }
        });
    };

    App.Views = {
        meeting: function() {
            // Meeting logic
            var meeting = new Meeting($('.level-grids'), createdTimestamp);
            Helpers.animatedScrollTo(0);
            meeting.load();

            // Sharing links
            $body.on('click', '.facebook-link a', function(evt) {
                var $link = $(this),
                    description = $link.data('description').replace('{}', $('.meeting-remaining-time').text().substring(1));

                evt.preventDefault();

                FB.ui({
                    method: 'feed',
                    link: $link.attr('href'),
                    picture: $link.data('picture'),
                    name: $link.data('name'),
                    caption: $link.data('caption'),
                    description: description
                }, function(response) {
                    console.log(response);
                });
            });

            $body.on('click', '.copy-link', function(evt) {
                var $link = $(this);
                evt.preventDefault();
                $('#copy-link').show();
            });

            $body.on('click', '#copy-link input', function() {
                this.select();
            });

            // Callback for Flash copy done
            global.copyCallback = function() {
                $('#copy-link').hide();
            };

            // Header fixed
            var $meetingInfo = $('#main-content'),
                infoPosition = $meetingInfo.find('.meeting-info').offset().top;
            $win.on('scroll', function(evt) {
                if ($win.scrollTop() > infoPosition) {
                    $meetingInfo.addClass('fixed');
                } else {
                    $meetingInfo.removeClass('fixed');
                }
            });

            // Join button
            $body.on('click', 'a.join-button', function(evt) {
                var mid = $(this).data('id');
                evt.preventDefault();
                $(this).hide();
                $.post(SERVICE_PREFIX + '/checkin?meetingId=' + mid, function(data) {
                    // if (typeof data.error !== 'undefined') {
                        // TODO: what happens if it fails?
                    // } else {
                        $('.section-my-meeting-point .join-meeting .welcome').fadeOut(ANIMATION_TIME,function(){
                            $(".section-my-meeting-point .join-meeting .thanks").fadeIn(ANIMATION_TIME);
                        });
                    // }
                });
            });

            $body.on('click','.section-my-meeting-point .join-meeting .thanks > a.continue',function(){
                $(".section-my-meeting-point .join-meeting .thanks,.overlay").fadeOut(ANIMATION_TIME);
            })
        },

        index: function() {
            $body.on('click', '.fb-connect', function(evt) {
                evt.preventDefault();
                FB.login(function(response) {
                    if (response.status === 'connected') {
                        // Create meeting
                        $('#create-point-form').submit();
                    }
                }, {
                    scope: 'email, user_likes, publish_actions, publish_stream, user_photos, user_birthday'
                });
            });
        },

        invitation: function() {
            var $text = $('textarea'),
                placeholder = $text.val();
            $text
                .on('focus', function() {
                    if ($text.val() === placeholder) {
                        $text.val('');
                    }
                })
                .on('blur', function() {
                    if ($text.val() === '') {
                        $text.val(placeholder);
                    }
                });
        },

        winners: function() {
            var resizeGrid = function(){
                $(".grid").each(function(){
                    var height = $(this).height();
                    $(this).find(".not-won-level").css({
                        top: (height - $(this).find(".not-won-level").height()) / 2
                    });
                });
            };
            $body.on('click', '.nav', function(evt) {
                evt.preventDefault();
                $.get('/point/winners', {
                    dayTimestamp: $(this).data('day')
                }, function(data) {
                    var $container = $('.section-daily-winners'),
                        markup = $(data).find('.section-daily-winners').html();
                    $container.fadeOut(function() {
                        $container.html(markup).fadeIn(resizeGrid);
                    });
                });
            });
            resizeGrid();
        }
    };

    App.init = function() {
        FB.init({
            appId      : RGA.Settings.appId,
            channelUrl : RGA.Settings.channelUrl,
            status     : true,
            cookie     : true,
            xfbml      : true
        });

        // Before rendering the view

        // Render view if possible
        if (typeof CURRENT_VIEW !== 'undefined' && App.Views[CURRENT_VIEW]) {
            App.Views[CURRENT_VIEW]();
            // After view rendered
            // FB.Canvas.setSize();
        }

        if (CURRENT_VIEW !== 'meeting') {
            FB.Canvas.setSize();
        }

    };

    // On Document Ready
    $(App.init);

}(window, document, jQuery, Quilmes));
