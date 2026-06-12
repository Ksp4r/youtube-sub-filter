const mobile = window.location.host == "m.youtube.com";
const q_thumbnail = mobile? 'ytm-rich-item-renderer' : 'ytd-rich-item-renderer';
const q_bar = mobile? 'ytm-thumbnail-overlay-resume-playback-renderer div' : 'yt-thumbnail-overlay-progress-bar-view-model div div';
var videoIndex = 0;

function target(){
    if (mobile){
        return document.querySelector('.rich-grid-renderer-contents');
    } else return document.querySelector('#contents');
}

function test(index){
    let thumbnail = target().querySelectorAll(q_thumbnail)[index];
    let bar = thumbnail.querySelector(q_bar);
    if (bar){
        wid = +(bar.style.width.replace("%", ""));
        if (wid > 50){
            thumbnail.setAttribute('style', 'display:none !important;');
        }
        return wid
    }
    else return "No Bar Segment";
}

function callback (){
    let content = Array.from(target().querySelectorAll(q_thumbnail));
    for (videoIndex; videoIndex < content.length; videoIndex ++){
        test(videoIndex);
    }
}

function loop(){
    setTimeout(() =>{
        if (target()){
            const observer = new MutationObserver(callback);
            observer.observe(target(), {childList:true});
            callback();
        } else {
            console.log("ytf: looping...")
            loop();
        }
    }, 1000);
}

loop();
