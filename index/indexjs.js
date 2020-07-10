window.onload =function(){
    imgLocation("container","box");
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};
    window.onscroll=function name(params) {
        if (checkFlag()) {
            var cparent=document.getElementById("container");
            for (var i = 0; i < imgData.data.length; i++) {
                var ccontent =document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg=document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img=document.createElement("img");
                img.src="src/"+imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag(params) {
    var cparent =document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight =ccontent[ccontent.length-1].offsetTop;
    var scrollTop =document.documentElement.scrollTop;
    var pageHeight=document.documentElement.clientHeight;
    if (lastContentHeight<scrollTop+pageHeight) {
        return true;
    }
}
function imgLocation(parent,content) {
    var cparent =document.getElementById(parent);
    var ccontent =getChildElement(cparent,content);
    var imgwidth =ccontent[0].offsetWidth;
    var num =Math.floor(document.documentElement.clientWidth/imgwidth);
    cparent.style.cssText="width:"+imgwidth*num+"px;margin: 0 auto";

    var BoxHeightArr =[];
    for (var i = 0; i < ccontent.length; i++) {
        if (i<num) {
            BoxHeightArr[i]=ccontent[i].offsetHeight;
        }
        else{
            var minHeight =Math.min.apply(null,BoxHeightArr);
            var minIndex =getminheightLocation(BoxHeightArr,minHeight);
            ccontent[i].style.position = "absolute";
            console.log(minIndex);
            ccontent[i].style.top =minHeight+"px";
            ccontent[i].style.left =ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }        
    }
}

function getminheightLocation(BoxHeightArr,minHeight) {
    for (var i in BoxHeightArr) {
        if (BoxHeightArr[i]==minHeight) {
            return i;   
        }
    }
}
function getChildElement(parent,content) {
    var contentArr =[];
    var allcontent =parent.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className==content) {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}