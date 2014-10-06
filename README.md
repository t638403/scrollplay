#Scrollplay
A jQuery plugin for playing a video if scrolled into the center of the page. This plugin can be used with responsive 
grids.

## Basic usage
###1 Add scripts
```html
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="javascripts/scrollplay.min.js"></script>
```
###2 Add HTML
A replacement image for the stopped video and the video it self.
```html
<div class="scrollplay">
    <img src="some_image.jpg" alt="Some image"/>
    <video>
        <source src="some_video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```
Or [bootstrap](http://getbootstrap.com/) html
```html
<div class="row">
  <div class="col-md-6 col-md-offset-3 scrollplay">
      <img src="some_image.jpg" alt="Some image"/>
      <video>
          <source src="some_video.mp4" type="video/mp4">
          Your browser does not support the video tag.
      </video>
  </div>
</div>
```
###3 Initialize plugin
Determine the size of your image and video, for example 1024x720. The size of the image and the video should be equal. 
Initialize the plugin by running the folowing code.
```javascript
var cfg = {
    width:1024,
    height:720
}
$(document).ready(function(){
    $('.scrollplay').scrollplay(cfg);
});
```

Advanced usage
==============
You can define a boolean function which will be used to determine when a video must be played, instead of the default 
criterium. Maybe you want to play it when it enters the screen, and stop it when it leaves the screen.
```javascript
var cfg = {
    width:1024,
    height:720,
    start_playing_video_when:function() {
        // ... Self defined criterium
    }
}
$(document).ready(function(){
    $('.scrollplay').scrollplay(cfg);
});
```

You can define a boolean function which will be used to determine if videos should be displayed at all. For example, maybe
you dont want to play video on an a mobile phone.
```javascript
var cfg = {
    width:1024,
    height:720,
    displaying_videos_is_allowed_when:function() {
        // ... not on a phone or tablet
    }
}
$(document).ready(function(){
    $('.scrollplay').scrollplay(cfg);
});
```