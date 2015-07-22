/*check UA
*********************************************/
(function(){
//var mode=$.cookie("show_mode");
var mode="pc";
var agent = navigator.userAgent;
var is_smp=0;

if(agent.search(/iPhone/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1){
    is_smp=1;
}

//例外ページ
/*
if(location.href.indexOf("/company/")>0 || location.href.indexOf("/recruit/")>0 || location.href.indexOf("/privacypolicy/")>0 || location.href.indexOf("/contact/")>0){
    is_smp=0;
}
*/

if(is_smp==1 && mode!="pc"){
    location.href=location.href.replace(location.hostname+"/", location.hostname+"/sp");
}
})();


$(function(){
	jQuery.extend( jQuery.easing,
	{
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
		
	});
});



/*console.log existence check
*********************************************/
if (typeof window.console === 'undefined') {
	window.console = new function() {
		this.log = function() {};
		this.error = function() {};
	};
}


/*hover a img
*********************************************/
$(function(){
$("a img").not('.not_hover').hover(function(){
    $(this).stop().fadeTo(100, 0.7);
},function(){
    $(this).stop().fadeTo(300, 1);
});
});


/*clickable
*********************************************/
$(function(){
    $(".clickable").children().each(function(i){
        var a=$(this).find('a');
        if(a.length>0 && a.attr('href')){
            $(this).click(function(e){
                e.preventDefault();
                location.href=a.attr('href');
            });
        }
    });
});


/* scroll TOP
*********************************************/
var timer_checkScrollTop;
function checkScrollTop(){
	clearTimeout(timer_checkScrollTop);
	var top = $(window).scrollTop();
	
	if(top > 400){
	    $("#gotop").addClass('show');
	}else{
	    $("#gotop").removeClass('show');
	}
}

$(function(){
	$(window).scroll(function(){
		timer_checkScrollTop=setTimeout(checkScrollTop,100);
	});
	
	$("#gotop").off("click").click(function(e){
		e.preventDefault();
		$("html,body").animate({scrollTop:0},800,"easeOutCubic");
	});
});


/* menu
*********************************************/
//PC MENU
function checkWindowSize(){
    if(($(window).width()>=640 && $(window).height()<600)){
        $("#side_menu").addClass("rock");
    }else{
	    $("#side_menu").removeClass("rock");
	}
}

$(function(){
    checkWindowSize();
	$(window).resize(function(){
		setTimeout(checkWindowSize,100);
	});
});

//SP MENU
$(function(){
	$("#btn_sp_menu").off("click").click(function(e){
		e.preventDefault();
		$("#sp_menu_ul ul").slideToggle();
	});
	
	$("#btn_sp_menu_access a, #btn_menu_access a").off('click').click(function(e){
		e.preventDefault();
		var access_top = $("#access_link").offset().top;
		
		if($("body").height() - access_top > $(window).height()){
		console.log(access_top);
		}else{
    		access_top = $("body").height()-$(window).height();
		}
		$("html,body").animate({scrollTop:access_top},800,"easeOutCubic");
		$("#sp_menu_ul ul").slideUp();
	});
});

/* google map
*********************************************/
// JavaScript Document
$(function(){

var styleOptions = [
  {
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "elementType": "geometry",
    "stylers": [
      { "gamma": 1 }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "gamma": 1 }
    ]
  }
];
//styleOptions = null;
var icon_url='/pharm_tks-u_hosp/images/map_arrow.png';
var image = new google.maps.MarkerImage(icon_url,new google.maps.Size(40, 40),new google.maps.Point(0,0),new google.maps.Point(20,40));
image.scaledSize = new google.maps.Size(40, 40);
var lopanType = new google.maps.StyledMapType(styleOptions);

var gmap = new google.maps.Map(document.getElementById("google_map"),{
        center: new google.maps.LatLng(34.076079, 134.517701),
        zoom: 15,
        mapTypeControl: false,
        //mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }); 
gmap.mapTypes.set('noText', lopanType);
gmap.setMapTypeId('noText');

new google.maps.Marker({
    position: new google.maps.LatLng(34.076079, 134.517701),
    map: gmap,
    title: '',
    draggable: false,
    icon: image
});
});


/* 外部サイトからの流入かどうか
************************************************/
$(function(){
	var RegexpHostname = new RegExp("https?://[^/]*/", "i");
	var From = document.referrer;
	var MyHost = document.location.href.match(RegexpHostname);
	var FromHost = From.match(RegexpHostname);
	var AdpageTop = "ad.html";
	if (!From || ''+MyHost === ''+FromHost){
	}else{
	}
});

/* 現在ページ
************************************************/
function currentPage(page){
	img=$(page);
    src = img.attr('src').replace( '_off.', '_on.' );
    img.attr('src',src);
}