scrollplay
==========

A jQuery plugin for playing and stopping HTML5 video's when they cross the vertical center of the browser window during a scroll/resize action.

I did not add a video file, so you have to come up with one your self to try this plugin.

usage
=====
Add a `div` containing a `video` tag to the `body` of your document

```html
<div class="scrollplay">
    <video>
        <source src="some_video.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

Add `scrollplay.js` to your HTML page using a `script` tag and execute following code

```javascript
$(document).ready(function(){
    $('.scrollplay').scrollplay();
});
```