Scrollplay
==========
A jQuery plugin to replace an image with an HTML5 video on a certain criteria. This criteria defaults to crossing the
vertical center of your browser window due to a scroll event.

Basic usage
=====
Add jQuery and scrollplay to the document
```html
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
</script><script src="javascripts/scrollplay.js"></script>
```

Add folowing HTML to the body of your document.
```html
<div class="scrollplay">
    <img src="some_image.jpg" alt="Some image"/>
    <video>
        <source src="some_video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```
Run folowing code somewhere
```javascript
$(document).ready(function(){
    $('.scrollplay').scrollplay();
});
```

Advanced usage
==============
You can define boolean function which will be used to determine when a video must be played, instead of the vertical center function.
```javascript
var cfg = {
    start_playing_video_when:function() {
        // ... DIV,scrollplay passes vertical center of browser window
    }
}
$(document).ready(function(){
    $('.scrollplay').scrollplay(cfg);
});
```

You can define a boolean function which will be used to determine if videos should be displayed at all. For example, maybe
you dont want to display movies on an mobile phone.
```javascript
var cfg = {
    displaying_videos_is_allowed_when:function() {
        // ... not on a phone or tablet
    }
}
$(document).ready(function(){
    $('.scrollplay').scrollplay(cfg);
});
```