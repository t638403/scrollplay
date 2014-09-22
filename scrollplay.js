(function($){
    $.fn.scrollplay = function(options) {

        var that = this;

        /**
         * Resize the video tot the dimensions of the containing div.
         */
        function resizeVideo() {
            var $scrollplay = $(this);
            $scrollplay.data('is-playing', 0);
            $scrollplay.find('video').height($scrollplay.height());
            $scrollplay.find('video').width($scrollplay.width());
        }

        /**
         * Checks if the scrollplay div overlaps the center of the browser window.
         *
         * @param $scrollplay {jQuery} One of the scrollplay divs
         * @returns {boolean}
         */
        function inCenter($scrollplay) {
            var scroll_center = $(window).scrollTop() + ($(window).height() / 2);
            var elem_offset = $scrollplay.offset();
            return (scroll_center > elem_offset.top && scroll_center < (elem_offset.top + $scrollplay.height()));
        }

        /**
         * Find the video and play or stop
         */
        function playCenteredVideo() {
            that.each(function() {
                var $scrollplay = $(this);
                var is_playing = (parseInt($scrollplay.data('is-playing'), 10) == 1) || false;

                if(inCenter($scrollplay) && !is_playing) {
                    $scrollplay.find('video').get(0).play();
                    $scrollplay.data('is-playing', 1);
                }

                if (!inCenter($scrollplay) && is_playing) {
                    $scrollplay.find('video').get(0).load();
                    $scrollplay.data('is-playing', 0);
                }
            });
        }

        // Initially resize the video's
        this.each(resizeVideo);

        // On scroll or on resize consider to play or stop a video
        $(window).scroll(playCenteredVideo);
        $(window).resize(playCenteredVideo);

        return this;

    }
}(jQuery));