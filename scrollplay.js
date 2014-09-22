(function($){
    $.fn.scrollplay = function(options) {

        var that = this;

        function resizeVideo() {
            var $scrollplay = $(this);
            $scrollplay.data('is-playing', 0);
            $scrollplay.find('video').height($scrollplay.height());
            $scrollplay.find('video').width($scrollplay.width());
        }

        function inCenter($scrollplay) {
            var scroll_center = $(window).scrollTop() + ($(window).height() / 2);
            var elem_offset = $scrollplay.offset();
            return (scroll_center > elem_offset.top && scroll_center < (elem_offset.top + $scrollplay.height()));
        }

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

        this.each(resizeVideo);
        $(window).scroll(playCenteredVideo);
        $(window).resize(playCenteredVideo);

        return this;

    }
}(jQuery));