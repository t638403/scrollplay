(function($){
    $.fn.scrollplay = function(cfg) {

        /**
         * Checks if the scrollplay div overlaps the center of the browser window.
         *
         * @param $scrollplay {jQuery} One of the scrollplay divs
         * @returns {boolean}
         */
        function inCenter($scrollplay) {
            var scroll_center = $(window).scrollTop() + ($(window).height() / 2);
            var elem_offset = $scrollplay.offset();
            return (scroll_center > elem_offset.top && scroll_center < (elem_offset.top + $scrollplay.height())) || false;
        }

        var that = this;
        cfg = cfg || {};
        cfg.displaying_videos_is_allowed = cfg.displaying_videos_is_allowed || function() {return true;};
        cfg.start_playing_video_when = cfg.start_playing_video_when || inCenter;


        /**
         * Resize the image and video tot the dimensions of the containing div.
         */
        function initialize() {
            var $scrollplay = $(this);
            $scrollplay.data('is-playing', 0);
            $scrollplay.find('video').height($scrollplay.height()).width($scrollplay.width());
            $scrollplay.find('img').height($scrollplay.height()).width($scrollplay.width());
        }

        /**
         * Play a video
         * @param $video {jQuery} The video object
         * @param $scrollplay {jQuery} One of the scrollplay divs
         */
        function play($video, $scrollplay) {
            $img.hide();
            $video.show();
            $video.get(0).play();
            $scrollplay.data('is-playing', 1);
        }

        /**
         * Stop a video
         * @param $video {jQuery} The video object
         * @param $scrollplay {jQuery} One of the scrollplay divs
         */
        function stop($video, $scrollplay) {
            $video.hide();
            $video.get(0).load();
            $scrollplay.data('is-playing', 0);
        }

        /**
         * Find the video and play or stop
         */
        function playCenteredVideo() {
            var displaying_videos_is_allowed = cfg.displaying_videos_is_allowed();
            that.each(function() {
                var $scrollplay = $(this);
                var is_playing = (parseInt($scrollplay.data('is-playing'), 10) == 1 || false);

                $video = $scrollplay.find('video');
                $img = $scrollplay.find('img');
                var has_video = ($video.length > 0 || false);
                var has_image = ($img.length > 0 || false);
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

        // Initialize each .scrollplay div
        this.each(initialize);
        playCenteredVideo();

        // On scroll or on resize consider to play or stop a video
        $(window).scroll(playCenteredVideo);
        $(window).resize(playCenteredVideo);

        return this;

    }
}(jQuery));