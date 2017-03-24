$.dialog = function(opts){
	//弹窗入场动画
	var name = tz_animateIn();
	var $dialog = $("<div class='dialog "+name+"'>"+
		"<div class='title'>"+
			"<h3>"+opts.title+"</h3>"+
			"<a href='javascript:;' class='close'>X</a>"+
		"</div>"+
		"<div class='content'>"+
			"<div class='message'>"+
				"<span class='icon'></span>"+
				"<span class='text'>"+opts.content+"</span>"+
			"</div>"+
			"<div class='btn'>"+
				"<input type='button' value='Yes' class='sure'></input>"+
				"<input type='button' value='No' class='cancel'></input>"+
			"</div>"+
		"</div>"+
		"</div>");

	$("body").append($dialog).append("<div class='gray'></div>");

	//动态居中定位
	AutoCenter($dialog);
	//浏览器窗口再发生改变时自动居中
	$(window).resize(function(){
		AutoCenter($dialog);
	});

	//弹窗事件拖拽
	initEVent($dialog,opts);
}

function AutoCenter($dialog){
	var w = $dialog.width();
	var h = $dialog.height();
	var l = $(window).width() - w;
	var t = $(window).height() - h;
	$dialog.css({left:l/2,top:t/2});
}


//窗口任意拖拽
function initEVent($dialog,opts){
	
	$dialog.find(".title").mousedown(function(){
		var ev = ev || window.event;
		var dialogBox = $(this).parent();
		var _left = ev.clientX - dialogBox.offset().left;
		var _top = ev.clientY - dialogBox.offset().top;
		//调试 console.log(_left,_top);
		var move = true;
		$(document).mousemove(function(ev){
			if(move){
				var ev = ev || window.event;
				var l = ev.clientX - _left;
				var t = ev.clientY - _top;
				dialogBox.css({left:l,top:t});
			}
			
		}).mouseup(function(){
				move=false;		//移开鼠标时，终止窗口移动
		});
	});
	//关闭按钮
	$dialog.find(".close").click(function(){
		
		var name = tz_animateOut();
		$dialog.removeClass("animated").addClass(name);
		$(".gray").remove();

		$dialog.fadeOut(500,function(){
			$(this).remove;
		});
	});

	//确定按钮
	$dialog.find(".sure").click(function(){
		/*$dialog.remove();
		$(".gray").remove();*/
		var name = tz_animateOut();
		$dialog.removeClass("animated").addClass(name);
		$(".gray").remove();
		
		$dialog.fadeOut(500,function(){
			$(this).remove;
		});
		if (opts.callback){
			opts.callback(true);
		}
	});

	//取消按钮
	$dialog.find(".cancel").click(function(){
		/*$dialog.remove();
		$(".gray").remove();*/
		var name = tz_animateOut();
		$dialog.removeClass("animated").addClass(name);
		$(".gray").remove();
		
		$dialog.fadeOut(500,function(){
			$(this).remove;
		});
		if (opts.callback){
			opts.callback(false);
		}
	});	
} 

//随机CSS3动画效果

function tz_animateIn(){
	var animateIn = [] //存储css3动画库相应的动画类
	animateIn.push("animated bounce");
	animateIn.push("animated tada");
	animateIn.push("animated wobble");
	animateIn.push("animated flip");
	animateIn.push("animated flipInX");
	animateIn.push("animated bounceIn");
	animateIn.push("animated bounceInUp");
	animateIn.push("animated bounceInLeft");
	animateIn.push("animated bounceInRight");
	animateIn.push("animated bounceIndown");
	animateIn.push("animated spaceInRight");
	animateIn.push("animated swing");
	animateIn.push("animated flipInY");
	animateIn.push("animated rotateIn");
	animateIn.push("animated hinge");
	var n = Math.floor(Math.random()*animateIn.length);
	return animateIn[n];
} 

//动画消失
function tz_animateOut(){
	var animateOut = [];
	animateOut.push("animated fadeOut");
	animateOut.push("animated fadeOutUp");
	animateOut.push("animated fadeOutDown");
	animateOut.push("animated fadeOutLeft");
	animateOut.push("animated fadeOutRight");
	animateOut.push("animated fadeOutUpBig");
	animateOut.push("animated fadeOutRightBig");
	animateOut.push("animated rotateOut");
	animateOut.push("animated rollOut");
	var n = Math.floor(Math.random()*animateOut.length);
	return animateOut[n];
}