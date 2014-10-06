(function($){
    $.fn.scrollplay = function(cfg) {

        /**
         * Checks if the scrollplay div overlaps the center of the browser window.If no function 'start_playing_video_when'
         * is defined in the cfg object then this function will be used.
         *
         * @param $scrollplay {jQuery} One of the scrollplay divs
         * @returns {boolean}
         */
        function inCenter($scrollplay) {
            var scroll_center = $(window).scrollTop() + ($(window).height() / 2);
            var elem_offset = $scrollplay.offset();
            return (scroll_center > elem_offset.top && scroll_center < (elem_offset.top + $scrollplay.height())) || false;
        }


        /**
         * Set the height of a scrollplay container and the width and height of the containing video and image, based on
         * the aspect ratio derived from the width and height in the cfg object.
         *
         * @param $scrollplay {jQuery} One of the scrollplay containers on the page
         */
        function setScrollplayDimensions($scrollplay) {
            $video = $scrollplay.find('video');
            $img = $scrollplay.find('img');
            var width = parseInt($scrollplay.width(), 10)
            var height = (width * aspect_ratio);
            $scrollplay.height(height);
            $img.height(height).width(width);
            $video.height(height).width(width);
        }

        /**
         * Play a video
         * @param $video {jQuery} The video object
         * @param $scrollplay {jQuery} One of the scrollplay divs
         */
        function play($video, $scrollplay) {
            $video.get(0).play();
            $scrollplay.data('is-playing', 1);
        }

        /**
         * Stop a video
         * @param $video {jQuery} The video object
         * @param $scrollplay {jQuery} One of the scrollplay divs
         */
        function stop($video, $scrollplay) {
            $video.get(0).load();
            $scrollplay.data('is-playing', 0);
        }

        /**
         * Find the video in a scrollplay container and play or stop it dependent of its current state. A state consists
         * of 5 boolean variables namely start_playing_video, is_playing, has_video, has_image,
         * displaying_videos_is_allowed. Together they form 2^5 = 32 different states.
         */
        function playCenteredVideo() {
            var displaying_videos_is_allowed = cfg.displaying_videos_is_allowed_when();
            that.each(function() {
                var $scrollplay = $(this);
                var is_playing = (parseInt($scrollplay.data('is-playing'), 10) == 1 || false);

                $video = $scrollplay.find('video');
                $img = $scrollplay.find('img');
                var has_video = ($video.length > 0 || false);
                var has_image = true; ($img.length > 0 || false);
                var start_playing_video = cfg.start_playing_video_when($scrollplay);

                // Little truth table. This could be nested somehow, but I don't think it would make it more clear.
                if(      start_playing_video &&  is_playing &&  has_video &&  has_image &&  displaying_videos_is_allowed) {/* all good */}
                else if( start_playing_video &&  is_playing &&  has_video &&  has_image && !displaying_videos_is_allowed) {stop($video, $scrollplay); $video.hide(); $img.show();}
                else if( start_playing_video &&  is_playing &&  has_video && !has_image &&  displaying_videos_is_allowed) {/* all good */}
                else if( start_playing_video &&  is_playing &&  has_video && !has_image && !displaying_videos_is_allowed) {stop($video, $scrollplay); $video.hide();}
                else if( start_playing_video &&  is_playing && !has_video &&  has_image &&  displaying_videos_is_allowed) {/* cant't be */}
                else if( start_playing_video &&  is_playing && !has_video &&  has_image && !displaying_videos_is_allowed) {/* cant't be */}
                else if( start_playing_video &&  is_playing && !has_video && !has_image &&  displaying_videos_is_allowed) {/* cant't be */}
                else if( start_playing_video &&  is_playing && !has_video && !has_image && !displaying_videos_is_allowed) {/* cant't be */}
                else if( start_playing_video && !is_playing &&  has_video &&  has_image &&  displaying_videos_is_allowed) {$img.hide(); $video.show(); play($video, $scrollplay);}
                else if( start_playing_video && !is_playing &&  has_video &&  has_image && !displaying_videos_is_allowed) {$img.show();}
                else if( start_playing_video && !is_playing &&  has_video && !has_image &&  displaying_videos_is_allowed) {$video.show(); play($video, $scrollplay);}
                else if( start_playing_video && !is_playing &&  has_video && !has_image && !displaying_videos_is_allowed) {$video.hide();}
                else if( start_playing_video && !is_playing && !has_video &&  has_image &&  displaying_videos_is_allowed) {$img.show();}
                else if( start_playing_video && !is_playing && !has_video &&  has_image && !displaying_videos_is_allowed) {$img.show();}
                else if( start_playing_video && !is_playing && !has_video && !has_image &&  displaying_videos_is_allowed) {/* nothing to hide or show due to empty .scrollplay div */}
                else if( start_playing_video && !is_playing && !has_video && !has_image && !displaying_videos_is_allowed) {/* nothing to hide or show due to empty .scrollplay div */}
                else if(!start_playing_video &&  is_playing &&  has_video &&  has_image &&  displaying_videos_is_allowed) {stop($video, $scrollplay); $video.hide(); $img.show();}
                else if(!start_playing_video &&  is_playing &&  has_video &&  has_image && !displaying_videos_is_allowed) {stop($video, $scrollplay); $video.hide(); $img.show();}
                else if(!start_playing_video &&  is_playing &&  has_video && !has_image &&  displaying_videos_is_allowed) {stop($video, $scrollplay); $video.show();}
                else if(!start_playing_video &&  is_playing &&  has_video && !has_image && !displaying_videos_is_allowed) {stop($video, $scrollplay); $video.hide();}
                else if(!start_playing_video &&  is_playing && !has_video &&  has_image &&  displaying_videos_is_allowed) {/* cant't be */}
                else if(!start_playing_video &&  is_playing && !has_video &&  has_image && !displaying_videos_is_allowed) {/* cant't be */}
                else if(!start_playing_video &&  is_playing && !has_video && !has_image &&  displaying_videos_is_allowed) {/* cant't be */}
                else if(!start_playing_video &&  is_playing && !has_video && !has_image && !displaying_videos_is_allowed) {/* cant't be */}
                else if(!start_playing_video && !is_playing &&  has_video &&  has_image &&  displaying_videos_is_allowed) {$video.hide(); $img.show();}
                else if(!start_playing_video && !is_playing &&  has_video &&  has_image && !displaying_videos_is_allowed) {$video.hide(); $img.show();}
                else if(!start_playing_video && !is_playing &&  has_video && !has_image &&  displaying_videos_is_allowed) {$video.show();}
                else if(!start_playing_video && !is_playing &&  has_video && !has_image && !displaying_videos_is_allowed) {$video.hide();}
                else if(!start_playing_video && !is_playing && !has_video &&  has_image &&  displaying_videos_is_allowed) {$img.show();}
                else if(!start_playing_video && !is_playing && !has_video &&  has_image && !displaying_videos_is_allowed) {$img.show();}
                else if(!start_playing_video && !is_playing && !has_video && !has_image &&  displaying_videos_is_allowed) {/* do nothing */}
                else if(!start_playing_video && !is_playing && !has_video && !has_image && !displaying_videos_is_allowed) {/* do nothing */}
                else {/* not possible */}

            });
        }

        /**
         * Attach functionality to scroll and resize event.
         */
        function setEventHandlers() {
            // On scroll or on resize consider to play or stop a video
            $(window).scroll(playCenteredVideo);
            $(window).resize(function() {
                playCenteredVideo();
                that.each(function() {
                    var $scrollplay = $(this);
                    setScrollplayDimensions($scrollplay);
                });
            });
        }

        /**
         * Do some constructor stuff
         */
        var that = this;
        cfg = cfg || {};
        cfg.displaying_videos_is_allowed_when = cfg.displaying_videos_is_allowed_when || function() {return true;};
        cfg.start_playing_video_when = cfg.start_playing_video_when || inCenter;
        var aspect_ratio = (cfg.height/cfg.width);

        this.each(function() {
            var $scrollplay = $(this);
            $scrollplay.data('is-playing', 0);
            $scrollplay.find('video').hide();
            setScrollplayDimensions($scrollplay);
        });
        setEventHandlers();
        playCenteredVideo();

        return this;

    }
}(jQuery));