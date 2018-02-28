window.addEventListener("orientationchange", setRem);
window.addEventListener("resize", setRem);
setRem();
function setRem() {
  var html = document.querySelector("html");
  var width = html.getBoundingClientRect().width;
  html.style.fontSize = width / 16 + "px";
}

$("input").focus(function(){
    $(this).next().animate({width:'100%'},1000)
});
$("input").blur(function(){
    $(this).next().animate({left:'100%'},1000,function () {
        $(this).css({width:'0%',left:"0%"})
    })
});
$("input").change(function(){
  alert(123);
})
