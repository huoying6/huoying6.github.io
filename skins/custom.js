// 辅助程序开始
// 时间：20180511
// 作者：某熊
//解决移动端300ms延迟点击
FastClick.attach(document.body);
//解决移动端按钮按下效果bug
document.body.addEventListener('touchstart', function () { }); 
//解决微信禁止上下滑动
// document.body.addEventListener('touchmove', function (e) {
//   e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// }, {passive: false});


	//分辨率适应及横屏竖屏处理
    var adjust = function(){
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		var fs = 100;
        $body = $('body');
        if( width > height ){
           //横屏情况
			if($(window).innerWidth() < 900){
				fs = $(window).innerWidth()*100/900;
			}else{
				fs = 900*100/900;
			}
            $body.width(width);
            $body.height(height);
            $body.css('transform' , 'none');
            $body.css('transform-origin' , '50% 50%');
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
	            //横屏下分辨率大于16:9（横向细长）的情况
	            //适配当下诸如iPhone X 19.488:9 以及其他Android 18:9/21:9的分辨率
	            if(width/height > 16/9){
	            	fs = height*100/562;
	            }
			}
        }
        else{
           //竖屏情况
			if(height < 900){
				fs = height*100/900;
			}else{
				fs = 900*100/900;
			}
            $body.width(height);
            $body.height(width);
            $body.css('position','relative');
            $body.css('top',  (height-width)/2 );
            $body.css('left',  0-(height-width)/2 );
            $body.css('transform' , 'rotate(90deg)');
            $body.css('transform-origin' , '50% 50%');
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
	            //竖屏下分辨率大于16:9（竖向细长）的情况
	            //适配当下诸如iPhone X 19.488:9 以及其他Android 18:9/21:9的分辨率
	            if(height/width > 16/9){
	            	fs = width*100/562;
	            }
			}
        }
		$('html').css('font-size',fs);
	};
	adjust();
	window.onresize = adjust;
	if ((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		window.attachEvent("onresize",adjust);
	}
	//音效开关
	// var mid = new Array();
	// mid[0]="audio/open2.mp3";
	// mid[1]="audio/smoke_2.mp3";
	// mid[2]="audio/menu_slct.mp3";
	// mid[3]="audio/menu_err.mp3";
	// mid[4]="audio/menu_cancel.mp3";
	// var audioid = 0;
	// new 一个audioSprite实例，把合成的mp3里面的每段音效起始、持续时间赋值，并初始化好其他的属性。
	var audioSprite = new Howl({
	    src: ['https://skins-1251007564.cos.ap-shanghai.myqcloud.com/audio/audiosprite.mp3'],
	    sprite: {
	        menu_cancel: [0, 1900],
	        menu_err: [2289, 1965],
	        menu_slct: [4254, 1642],
	        smoke_2: [5896, 1568]
	    },
	    preload: true,
	    volume: 1
	});
	// new 一个bgmSprite实例，背景音乐mp3里面的每段音效起始、持续时间赋值，并初始化好其他的属性。
	var bgmSprite = new Howl({
	    src: ['https://skins-1251007564.cos.ap-shanghai.myqcloud.com/audio/open2.mp3'],
	    sprite: {
	        open2: [0, 999999]
	    },
	    preload: true,
	    loop:true,
	    volume: 1
	});
	function playaudio(p){
		//var canshu = p;
		if($(".btn_audio").hasClass("on")){
			switch(p){
				case 4:
					audioSprite.play('menu_cancel');
					break;
				case 3:
					audioSprite.play('menu_err');
					break;
				case 2:
					audioSprite.play('menu_slct');
					break;
				case 1:
					audioSprite.play('smoke_2');
					break;
			}
			
		}
	}
	$(".btn_audio").on("click",function(){
		if ($(this).hasClass("on") ){
			$(this).removeClass("on");
			//$("#audios").empty();
		}else{
			$(this).addClass("on");
			playaudio(2);
		}
	});
	// 背景音乐开关
	// $("body").append("<audio id='bgm' preload='auto' loop='loop' src="+mid[0]+"></audio>");
	// var bgm = $("#bgm")[0];
	//bgmSprite.play('open2');
	$(".btn_bgm").on("click",function(){
		playaudio(1);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			bgmSprite.pause();
		}else{
			$(this).addClass("on");
			bgmSprite.play('open2');
		}
	});
	
	//每10抽必送S级碎片开关
	$(".btn_bisong").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			chongzhi();
		}else{
			$(this).addClass("on");
			chongzhi();
		}
	});
	
	//黑脸反馈开关
	$(".btn_sad").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			showsad();
		}else{
			$(this).addClass("on");
			showsad();
		}
	});
	
	//页面加载完毕执行，判断左侧统计橱窗中央是否显示当前高招忍者碎片
	if($(".btn_shoufu_s").hasClass("on")){
		$("#for_new_s").show();
	}else{
		$("#for_new_s").hide();
	}
	if($(".btn_shoufu_a").hasClass("on")){
		$("#for_new_a").show();
	}else{
		$("#for_new_a").hide();
	}

	//S首付奖励开关
	$(".btn_shoufu_s").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			ifshowshoufu_s();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_s").hide();
		}else{
			$(this).addClass("on");
			ifshowshoufu_s();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_s").show();
		}
	});

	//A首付奖励开关
	$(".btn_shoufu_a").on("click",function(){
		playaudio(2);
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			ifshowshoufu_a();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_a").hide();
		}else{
			$(this).addClass("on");
			ifshowshoufu_a();
			//联动判断是否显示当前高招忍者碎片数目
			$("#for_new_a").show();
		}
	});

	//页面加载完毕执行，判断幸运模式是否开启
	// if($(".btn_luckystar").hasClass("on")){
	// 	$(".luckystars_warp").show();
	// }else{
	// 	$(".luckystars_warp").hide();
	// }

	//隐藏机制开关
	$(".btn_yincangjizhi").on("click",function(){
		//playaudio(2);
		if($(this).hasClass("on")){
			playaudio(2);
			$(".yincangjizhi_text").hide();
			$(this).removeClass("on");
			chongzhi();
		}else{
			playaudio(2);
			$(".yincangjizhi_text").show();
			$(this).addClass("on");
			chongzhi();
		}
		toast("#toast","招募次数已重置！");
	});

	//幸运模式开关
	$(".btn_luckystar").on("click",function(){
		//playaudio(2);
		if($(this).hasClass("on")){
			playaudio(2);
			$(this).removeClass("on");
			doluckyevent();
			//chongzhi();
		}else if($(this).hasClass("disabled")){
			playaudio(3);
			toast("#toast","只有非酋才能开启");
		}else{
			playaudio(2);
			$(this).addClass("on");
			doluckyevent();
			//chongzhi();
		}
	});

	//统计数据收缩展开
	$(".tongjilist_btns .btn").on('click',function(){
		$(".tongjilist_btns").toggleClass("on");
		$(".tongjilist_wrap").toggleClass("on");
		playaudio(2);
	});
	//公告弹窗
	$(".btn_notice,.pop_notice .btn_close").on('click',function(){
		if($(".pop_notice").hasClass("on")){
			playaudio(3);
			$(".pop_notice").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_notice").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_notice").addClass("on");
			$(".pop_notice").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});

	//公众号弹窗
	$(".jump_gzh,.pop_gzh .btn_close").on('click',function(){
		if($(".pop_gzh").hasClass("on")){
			playaudio(3);
			$(".pop_gzh").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_gzh").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_gzh").addClass("on");
			$(".pop_gzh").removeClass("zoomOut");
		}
	});

	//新忍者弹窗
	$(".pop_newninja .btn_close").on('click',function(){
		if($(".pop_newninja").hasClass("on")){
			playaudio(3);
			$(".pop_newninja").addClass("zoomOut");
			setTimeout(function(){
				$(".pop_newninja").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_newninja").addClass("on");
			$(".pop_newninja").removeClass("zoomOut");
		}
	});
	
	//信息弹窗
	$(".btn_info,.pop_info .btn_close").on('click',function(){
		if($(".pop_info").hasClass("on")){
			playaudio(3);
			$(".pop_info").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_info").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_info").addClass("on");
			$(".pop_info").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});
	
	//设置弹窗
	$(".btn_setting,.pop_setting .btn_close").on('click',function(){
		if($(".pop_setting").hasClass("on")){
			playaudio(3);
			$(".pop_setting").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_setting").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_setting").addClass("on");
			$(".pop_setting").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});
	
	//a首付奖励弹窗
	$(".btn_baoxiang_a,.pop_baoxiang_a .btn_close").on('click',function(){
		if($(".pop_baoxiang_a").hasClass("on")){
			playaudio(3);
			$(".pop_baoxiang_a").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_baoxiang_a").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_baoxiang_a").addClass("on");
			$(".pop_baoxiang_a").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});

	//s首付奖励弹窗
	$(".btn_baoxiang,.pop_baoxiang .btn_close").on('click',function(){
		if($(".pop_baoxiang").hasClass("on")){
			playaudio(3);
			$(".pop_baoxiang").addClass("zoomOut");
			$(".pop_mask").fadeOut(100);
			setTimeout(function(){
				$(".pop_baoxiang").removeClass("on");
			},500);
		}else{
			playaudio(2);
			$(".pop_baoxiang").addClass("on");
			$(".pop_baoxiang").removeClass("zoomOut");
			$(".pop_mask").fadeIn(100);
		}
	});
	
	//指引提示，点击关闭
	$(".guide_wrap").on('click',function(){
		$(this).hide(500);
	});

	//加载等不及，点击强行关闭loading
	$(".cannotwait").on('click',function(){
		$("#LoadingBar").fadeOut(300);
		$(".loadingbarbox").fadeOut(300);
	});






// 主要程序开始
// 时间：20180511
// 作者：某熊
var now =new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var t = hours+":"+minutes+":"+seconds;
console.log("页面打开时间："+t);

//注意：要将raNum设置为全局变量，容易出错
var raNum;
//概率值 百分数
var gailv_s = 3.5;
var gailv_a = 11.5;
var gailv_b = 40;
var gailv_c = 100-gailv_s-gailv_a-gailv_b;
//幸运值 影响概率
var luckystar = 0;
//抽次数
var i = parseInt($("#cishu").html());
//各种碎片数量
var num_s = parseInt($("#num_s").html());
var num_s_new = parseInt($("#num_s_new").html());
var num_a = parseInt($("#num_a").html());
var num_a_new = parseInt($("#num_a_new").html());
var num_b = parseInt($("#num_b").html());
var num_c = parseInt($("#num_c").html());
var num_s_new_zengjia = 0;
var num_a_new_zengjia = 0;
//全局定义是否领取S首付奖励，初始状态为0
var isaddsuipian_s = 0;
//全局定义是否领取A首付奖励，初始状态为0
var isaddsuipian_a = 0;
//悲剧指数
var sad = 0;
//是否弹出过获得新忍者图
var istanchunewninja = 0;
//你真黑的次数计数
var count_nizhenhei = 0;
//是否弹出过你是真的黑toast
var toast_nizhenhei = 0;
//全局定义新s名称、新a名称，默认给值为 当前忍者配置中默认选中的
var name_s_new = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-name");
var name_a_new = $(".pop_setninja .tabbox_bd_item_a .item_wrap:eq(0)").attr("data-name");
//全局定义50抽必出一组s忍碎片、40抽必出一组新a忍隐形机制计数
var count_invisible_s = 0;
var count_invisible_a = 0;

//忍者配置操作
//tab切换
$(".tabbox .tabbox_hd .tabbox_hd_item").on("click",function(){
	playaudio(2);
	var i = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".tabbox .tabbox_bd .tabbox_bd_item").eq(i).addClass("active").siblings().removeClass("active");
});
//定义几个暂存配置数据的变量，包含新S忍者头像的x坐标、y坐标、忍者名称，新A忍者头像的x坐标、y坐标、忍者名称
var cache_s_x = $(".tabbox_bd_item_s .active").attr("data-x");
var cache_s_y = $(".tabbox_bd_item_s .active").attr("data-y");
var cache_s_name = $(".tabbox_bd_item_s .active").attr("data-name");
var cache_a_x = $(".tabbox_bd_item_a .active").attr("data-x");
var cache_a_y = $(".tabbox_bd_item_a .active").attr("data-y");
var cache_a_name = $(".tabbox_bd_item_a .active").attr("data-name");
console.log("当前高招S忍者为"+cache_s_x+"，"+cache_s_y+"，"+cache_s_name+";当前高招A忍者为"+cache_a_x+"，"+cache_a_y+"，"+cache_a_name);
//选中忍者时，把数据存入到暂存变量中
$(".pop_setninja .tabbox_bd_item_s .item_wrap").on("click",function(){
	playaudio(2);
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	cache_s_x = $(this).attr("data-x");
	cache_s_y = $(this).attr("data-y");
	cache_s_name = $(this).attr("data-name");
});
$(".pop_setninja .tabbox_bd_item_a .item_wrap").on("click",function(){
	playaudio(2);
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	cache_a_x = $(this).attr("data-x");
	cache_a_y = $(this).attr("data-y");
	cache_a_name = $(this).attr("data-name");
});
//忍者配置弹窗操作，除了控制弹窗的关闭外，还需要判断确认操作和放弃操作
$(".btn_setninja,.pop_setninja .btn_close").on('click',function(){
	if( $(".pop_setninja").hasClass("on") ){
		//放弃配置忍者，重置暂存数据，默认回到第一个（需要注意的是默认最新忍者排在第一个，按照时间倒序排列忍者）
		cache_s_x = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-x");
		cache_s_y = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-y");
		cache_s_name = $(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").attr("data-name");
		$(".pop_setninja .tabbox_bd_item_s .item_wrap:eq(0)").addClass("active").siblings().removeClass("active");
		cache_a_x = $(".pop_setninja .tabbox_bd_item_a .item_wrap:eq(0)").attr("data-x");
		cache_a_y = $(".pop_setninja .tabbox_bd_item_a .item_wrap:eq(0)").attr("data-y");
		cache_a_name = $(".pop_setninja .tabbox_bd_item_a .item_wrap:eq(0)").attr("data-name");
		$(".pop_setninja .tabbox_bd_item_a .item_wrap:eq(0)").addClass("active").siblings().removeClass("active");
		$(".tabbox .tabbox_hd .tabbox_hd_item:eq(0)").addClass("active").siblings().removeClass("active");
		$(".tabbox .tabbox_bd .tabbox_bd_item:eq(0)").addClass("active").siblings().removeClass("active");

		playaudio(3);
		$(".pop_setninja").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_setninja").removeClass("on");
		},500);
	}else{
		playaudio(2);
		$(".pop_setninja").addClass("on");
		$(".pop_setninja").removeClass("zoomOut");
	}
});
$(".pop_setninja .btn_done").on('click',function(){
		//配置忍者生效
		name_s_new = cache_s_name;
		name_a_new = cache_a_name;
		$("#ninjacss").text(".resultlist .item_s .img1,.icon.icon_s_new .img{ background-position: "+cache_s_x+" "+cache_s_y+";}.resultlist .item_a .img1,.icon.icon_a_new .img{  background-position: "+cache_a_x+" "+cache_a_y+"; }");
		$(".tabbox .tabbox_hd .tabbox_hd_item:eq(0)").addClass("active").siblings().removeClass("active");
		$(".tabbox .tabbox_bd .tabbox_bd_item:eq(0)").addClass("active").siblings().removeClass("active");
		chongzhi();
		toast("#toast","招募次数已重置！");

		//关闭弹窗
		playaudio(3);
		$(".pop_setninja").addClass("zoomOut");
		setTimeout(function(){
			$(".pop_setninja").removeClass("on");
		},500);
});

	
//单抽操作
$('#clik').on('click',function() {
	
	playaudio(2);
	$(".box .btns").hide();
	setTimeout(function(){$(".box .btns").fadeIn(100);},500);
	$(".resultlist").html("");
	$(".box").addClass("danchou");
	$(".box").removeClass("shilian");

	//判断抽次数个位是否为9
	if( $(".btn_bisong").hasClass("on") && parseInt(i%10) == 9 ){
		//必出S，让raNum在0~3.5范围内即可
		raNum = 1;
	}else{
		//判断隐形机制s计数是否到50；
		if($(".btn_yincangjizhi").hasClass("on") && count_invisible_s >= 50){
			//必出S，让raNum在0~3.5范围内即可
			raNum = 1;
		}else if($(".btn_yincangjizhi").hasClass("on") && count_invisible_a >= 40){
			//必出a，让raNum在3.5~11.5范围内即可
			raNum = 4;
		}else{
			//随机数生成
			raNum = Math.random()*100;
		}
	}
	i++;
	$("#cishu").html(i);
	$("#cishujinbi").html(i*168);
	//返回结果
	A();

});

//十连操作
$('#clik10').on('click',function() {
	
	playaudio(2);
	$(".box .btns,.btn_setting").hide();
	//setTimeout(function(){$(".btns,.btn_setting").fadeIn(100);},3700);
	$(".resultlist").html("");
	$(".box").addClass("shilian");
	$(".box").removeClass("danchou");
	num_s_new_zengjia = 0;
	num_a_new_zengjia = 0;
	//重复10次
	var repeat = 10;  // 限制执行次数为10次
	var timer = setInterval(function() {    
		if (repeat == 0) {
			clearInterval(timer);
			$(".box .btns,.btn_setting").fadeIn(100);
			//脸黑指数+1,触发需要同时满足以下条件：
			//1、招募次数大于等于1次
			//2、欧皇模式未开启
			//3、本次十连S碎片不大于1片并且新A碎片0片
			//4、悲剧指数达到10
			if(i>=1 && (num_s_new_zengjia <= 1 && num_a_new_zengjia < 1) && $(".btn_luckystar").hasClass("on") == false && sad >= 9 ){
				count_nizhenhei++;
				console.log("脸黑指数+1");
			}
			//解锁欧皇模式
			if(count_nizhenhei >= 3 && (num_s_new_zengjia <= 1 && num_a_new_zengjia < 1) && $(".btn_luckystar").hasClass("on") == false ){
				if(toast_nizhenhei == 0){
					toast("#toast","非酋你好...");
					toast_nizhenhei = 1;
				}
				$(".btn_luckystar").removeClass("disabled");
			}
			//重置脸黑指数
			if((num_s_new_zengjia > 4 || num_a_new_zengjia > 4) && $(".btn_luckystar").hasClass("on") == false){
				if(count_nizhenhei>0){
					count_nizhenhei = 0;
					console.log("脸黑指数重置");
				}
			}
			console.log("脸黑指数"+count_nizhenhei+"s增量"+num_s_new_zengjia+"a增量"+num_a_new_zengjia);
		} else {
			repeat--;
			//判断抽次数个位是否为9
			if( $(".btn_bisong").hasClass("on") && parseInt(i%10) == 9 ){
				//必出S，让raNum在0~3.5范围内即可
				raNum = 1;
			}else{
				//判断隐形机制s计数是否到50；
				if($(".btn_yincangjizhi").hasClass("on") && count_invisible_s >= 50){
					//必出S，让raNum在0~3.5范围内即可
					raNum = 1;
				}else if($(".btn_yincangjizhi").hasClass("on") && count_invisible_a >= 40){
					//必出a，让raNum在3.5~11.5范围内即可
					raNum = 4;
				}else{
					//随机数生成
					raNum = Math.random()*100;
				}
				
			}
			i++;
			$("#cishu").html(i);
			$("#cishujinbi").html(i*168);
			//返回结果
			A();
		}
	}, 320);

});

//重置操作
function chongzhi(){
	$(".box").removeClass("danchou shilian");
	$(".resultlist").html('<p style="font-size:.26rem;padding-top:.9rem;">自我安慰，请勿当真</p>');
	$('#tips_bisong').html('');
	$("#cishu").html("0");
	$("#cishujinbi").html("0");
	$("#num_s").html("0");
	$("#num_s_new").html("0");
	$("#num_a").html("0");
	$("#num_a_new").html("0");
	$("#num_b").html("0");
	$("#num_c").html("0");
	i = 0;
	num_s = 0;
	num_s_new = 0;
	num_a = 0;
	num_a_new = 0;
	num_b = 0;
	num_c = 0;
	//是否领取首付 重置
	isaddsuipian_s = 0;
	isaddsuipian_a = 0;
	//首付奖励宝箱变为关闭外观
	$(".baoxianglist .item").removeClass("open");
	//重置悲剧指数
	sad = 0;
	//重置幸运值
	luckystar = 0;
	//是否弹出过获得新忍者图 重置
	istanchunewninja = 0;
	//你真黑的次数
	var count_nizhenhei = 0;
	//是否弹出过你是真的黑toast
	var toast_nizhenhei = 0;
	//重新判断首付奖励按钮是否出现
	ifshowshoufu_s();
	ifshowshoufu_a();
	//重置隐形机制计数
	count_invisible_s = 0;
	count_invisible_a = 0;

}
$('#reset').on('click',function() {
	playaudio(4);
	chongzhi();
});


//输出碎片
function writelog(a,j,h,m){
	$(".resultlist").append("<div class='animated fadeIn item_wrap'><div class='item item_"+j+"'><div class='img img"+m+"'></div><div class='fg'><p class='num'>"+h+"</p></div><div class='yanwu'></div></div><p class='text'>"+a+"</p></div>");
	// console.log(m);
	playaudio(1);
}

//输出必送S级忍者碎片文字提醒
function writebisong(){
	var num_bisong = 9 - parseInt(i%10);
	//判断是否开启10次必出s碎片，若开启则输出文字提醒，不开启则清空文字
	if($(".btn_bisong").hasClass("on")){
		if( parseInt(i%10) == 9){
			$('#tips_bisong').html('本次招募必送S级忍者碎片');
		}else{
			$('#tips_bisong').html('再招募<span>'+num_bisong+'</span>次后，下次招募必送S级忍者碎片');
		}
	}else{
		$('#tips_bisong').html('');
	}
	
}

//恭喜提示
function gongxi(obj,t){
	$(obj).show("300");
	$(obj).animate({opacity:0},0);
	$(obj).queue(function () {
		$(this).html(t);
        $(this).dequeue();
	});
	$(obj).animate({opacity:1},300);
	$(obj).delay(3000).animate({opacity:0},500);
	$(obj).queue(function () {
		$(this).html("");
        $(this).dequeue();
	});
	$(obj).delay(100).hide("300");
}

//toast提示，obj对象，t提示的内容
function toast(obj,t){
	clearTimeout(timer);
	$(obj).html(t);
	$(obj).parent().stop(true,true);
	$(obj).parent().fadeIn(0);
	var timer = setTimeout(function(){
		$(obj).parent().fadeOut(300);
	},2000);
}

//悲剧指数反馈
function showsad(){
	if($(".btn_sad").hasClass("on")){
		$("html").attr("class","gray"+sad);
	}else{
		$("html").attr("class","gray0");
		//sad = 0;
	}
}

//幸运值反馈，影响概率值
function doluckyevent(){
	if($(".btn_luckystar").hasClass("on")){
		$(".lucky_mode_text").show();
		//$(".luckystars_warp").show();
		$(".luckystars").empty();
		if(luckystar <= 0){
			gailv_s = 3.5;
			gailv_a = 11.5;
			gailv_b = 40;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
		}else if(luckystar > 0 && luckystar <=2){
			gailv_s = 8.5;
			gailv_a = 16.5;
			gailv_b = 40;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
			for (var i = 0; i >= 0; i--) {
				$(".luckystars").append('<img src="images/luckystar.png" alt="幸运星">');
			}
		}else if(luckystar > 2 && luckystar <=4){
			gailv_s = 13.5;
			gailv_a = 21.5;
			gailv_b = 40;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
			for (var i = 1; i >= 0; i--) {
				$(".luckystars").append('<img src="images/luckystar.png" alt="幸运星">');
			}
		}else if(luckystar > 4 && luckystar <=6){
			gailv_s = 18.5;
			gailv_a = 26.5;
			gailv_b = 40;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
			for (var i = 2; i >= 0; i--) {
				$(".luckystars").append('<img src="images/luckystar.png" alt="幸运星">');
			}
		}else if(luckystar > 6 && luckystar <=8){
			gailv_s = 23.5;
			gailv_a = 31.5;
			gailv_b = 40;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
			for (var i = 3; i >= 0; i--) {
				$(".luckystars").append('<img src="images/luckystar.png" alt="幸运星">');
			}
		}else if(luckystar > 8){
			gailv_s = 40.5;
			gailv_a = 40.5;
			gailv_b = 1;
			gailv_c = 100-gailv_s-gailv_a-gailv_b;
			//$(".luckystars").html("MAX");
			for (var i = 4; i >= 0; i--) {
				$(".luckystars").append('<img src="images/luckystar.png" alt="幸运星">');
			}
		}
	}else{
		$(".lucky_mode_text").hide();
		//$(".luckystars_warp").hide();
		$(".luckystars").empty();
		gailv_s = 3.5;
		gailv_a = 11.5;
		gailv_b = 40;
		gailv_c = 100-gailv_s-gailv_a-gailv_b;
	}
	//$(".luckystars").html(luckystar);
}


//定义事件：是否出现S首付
function ifshowshoufu_s(){
	if(i>=100 && isaddsuipian_s == 0 && $(".btn_shoufu_s").hasClass("on")){
		$(".btn_baoxiang").show(100);
	}else{
		$(".btn_baoxiang").hide(100);
	}	
}
//领取S首付奖励
function addsuipian_s(n){
	//增加s碎片数量
	num_s = num_s + n;
	num_s_new = num_s_new +n;
	$("#num_s").html(num_s);
	$("#num_s_new").html(num_s_new);
	//是否领取s首付奖励状态变为1
	isaddsuipian_s = 1;
	//s首付弹窗消失
	setTimeout(function(){
		$(".pop_baoxiang").addClass("zoomOut");
		$(".pop_mask").fadeOut(100);
	},1000);
	setTimeout(function(){
		$(".pop_baoxiang").removeClass("on");
	},1500);
	//s首付奖励按钮消失
	$(".btn_baoxiang").hide(100);
	//恭喜文字提示
	gongxi("#congratulation","已领取首付奖励 <span>"+name_s_new+"碎片 × "+n+"</span>");
}
//V0-V4领取
$("#baoxiang01").on('click',function(){
	playaudio(3);
	if(isaddsuipian_s == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_s(25);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
});
//V5-V9领取
$("#baoxiang02").on('click',function(){
	playaudio(3);
	if(isaddsuipian_s == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_s(28);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
});
//V10-V14领取
$("#baoxiang03").on('click',function(){
	playaudio(3);
	if(isaddsuipian_s == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_s(33);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
});
//V15领取
$("#baoxiang04").on('click',function(){
	playaudio(3);
	if(isaddsuipian_s == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_s(38);	
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
});

//定义事件：是否出现A首付
function ifshowshoufu_a(){
	if(i>=50 && isaddsuipian_a == 0 && $(".btn_shoufu_a").hasClass("on")){
		$(".btn_baoxiang_a").show(100);
	}else{
		$(".btn_baoxiang_a").hide(100);
	}	
}
//领取A首付奖励
function addsuipian_a(n){
	//增加a碎片数量
	num_a = num_a + n;
	num_a_new = num_a_new + n;
	$("#num_a").html(num_a);
	$("#num_a_new").html(num_a_new);
	//是否领取A首付奖励状态变为1
	isaddsuipian_a = 1;
	//A首付弹窗消失
	setTimeout(function(){
		$(".pop_baoxiang_a").addClass("zoomOut");
		$(".pop_mask").fadeOut(100);
	},1000);
	setTimeout(function(){
		$(".pop_baoxiang_a").removeClass("on");
	},1500);
	//a首付奖励按钮消失
	$(".btn_baoxiang_a").hide(100);
	//恭喜文字提示
	gongxi("#congratulation","已领取首付奖励 <span>"+name_a_new+"碎片 × "+n+"</span>");
}
//V0-V4领取
$("#baoxiang_a01").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(10);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V5-V9领取
$("#baoxiang_a02").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(11);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V10-V14领取
$("#baoxiang_a03").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(13);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})
//V15领取
$("#baoxiang_a04").on('click',function(){
	playaudio(3);
	if(isaddsuipian_a == 0){
		//宝箱变为打开状态
		$(this).addClass("open");
		addsuipian_a(15);
	}else{
		toast("#toast","首付奖励只能领取一次！");
	}
})





//返回结果进入数据统计
function A(){
	
	console.log("随机数="+raNum+",次数="+i+",");
	if(0 < raNum && raNum <= gailv_s ){
			//S忍 先判断是否抽到第10次，若是第10次则必出1片
			if($(".btn_bisong").hasClass("on") && parseInt(i%10) == 0 ){
				// 判断为第十次，必出1片，让n不能等于1，并且不重置幸运值
				var n = 2;
			}else{
				// 判断为不是第十次，
				// 判断隐形机制是否达到50
				if($(".btn_yincangjizhi").hasClass("on") && count_invisible_s >= 50){
					var n = 1;
				}else{
					// 出现5片和1片的概率，目前设置为各50%
					var n = parseInt(Math.random()*(2-1+1)+1,10);
				}
				// 非必送抽到s，幸运值重置
				luckystar = -1;
				sad = -1;
			}
			if(n==1){
				num_this = 5;
				num_s = num_s+5;
				//抽到5片s，重置隐性机制计数
				count_invisible_s = -1;
			}else{
				num_this = 1;
				num_s++;
			}
			//m为定值，指定s忍者，不用随机数
			var m = 1;
			//console.log("n="+n+"(小于5为5片)");
			writelog("S碎片 × "+num_this,"s",num_this,m);
			$("#num_s").html(num_s);
			num_s_new = num_s_new + num_this;
			num_s_new_zengjia = num_s_new_zengjia + num_this;
			$("#num_s_new").html(num_s_new);
			gongxi("#congratulation","恭喜你获得 <span>"+name_s_new+"碎片 × "+num_this+"</span>");
			//return;
		}else if(gailv_s < raNum && raNum <= gailv_s+gailv_a){
			//判断隐性机制计数是否达到40
			if($(".btn_yincangjizhi").hasClass("on") && count_invisible_a >= 40){
				//必出4片
				var n=1;
				var m=1;
			}else{
				//A忍 出现4片和1片的概率
				var n = parseInt(Math.random()*(2-1+1)+1,10);
				//随机出现某个忍者 取值范围1-2，1为新a，2为副a，目前两a概率各50%
				var m = parseInt(Math.random()*(2-1+1)+1,10);
			}
			
			if(n==1){
				num_this = 4;
				num_a = num_a+4;
			}else{
				num_this = 1;
				num_a++;
			}
			writelog("A碎片 × "+num_this,"a",num_this,m);
			$("#num_a").html(num_a);
			//这里判断是否为新A，m值需要与css设定相对应，
			if(m == 1){
				//是新a，恭喜公告出现，并且额外计入新a计数器
				gongxi("#congratulation","恭喜你获得 <span>"+name_a_new+"碎片 × "+num_this+"</span>");
				num_a_new = num_a_new + num_this;
				$("#num_a_new").html(num_a_new);
				num_a_new_zengjia = num_a_new_zengjia + num_this;
				//幸运值重置
				luckystar = -1;
				sad = -1;
				if(n==1){
					//若是抽到一组新a，重置隐性机制计数
					count_invisible_a = -1;
				}
			}
			//return;
		}else if(gailv_s+gailv_a < raNum && raNum <= gailv_s+gailv_a+gailv_b){
			//B忍 出现2片和1片的概率
			var n = parseInt(Math.random()*(2-1+1)+1,10);
			if(n==1){
				num_this = 2;
				num_b = num_b+2;
			}else{
				num_this = 1;
				num_b++;
			}
			//随机出现某个忍者 1-6
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(6-1+1)+1,10);
			writelog("B碎片 × "+num_this,"b",num_this,m);
			$("#num_b").html(num_b);
			//return;
		}else if(gailv_s+gailv_a+gailv_b < raNum && raNum <= 100){
			//C忍 出现5片和1片的概率
			var n = parseInt(Math.random()*(2-1+1)+1,10);
			if(n==1){
				num_this = 5;
				num_c = num_c+5;
			}else{
				num_this = 1;
				num_c++;
			}
			//随机出现某个忍者 1-12
			//var m = parseInt(Math.random()*10);
			var m = parseInt(Math.random()*(12-1+1)+1,10);
			writelog("C碎片 × "+num_this,"c",num_this,m);
			$("#num_c").html(num_c);
			//return;
		}
	console.log("s="+num_s+",a="+num_a+",a_new="+num_a_new+",b="+num_b+",c="+num_c+",");

		//必送文字输出
		writebisong();
		
		//悲剧指数体现
		sad++;
		showsad();
		console.log("悲剧指数为"+sad);

		//幸运模式体现，如果抽不到s和新a，幸运值会增加1
		luckystar++;
		doluckyevent();
		console.log("幸运值为"+luckystar+"；s概率目前为"+gailv_s+"；a目前概率为"+gailv_a+"；b目前概率为"+gailv_b+"；c目前概率为"+gailv_c);
		
		//隐形机制体现，如果没抽到1组s、1组a，计数增加1
		count_invisible_a++;
		count_invisible_s++;
		console.log("隐形机制：a计数--"+count_invisible_a+"；s计数--"+count_invisible_s);

		//事件：A首付奖励是否出现
		ifshowshoufu_a();

		//事件：S首付奖励是否出现
		ifshowshoufu_s();

		//如果碎片达到100 出现弹窗
		// if(num_s_new>=100 && istanchunewninja == 0 ){
		// 		playaudio(2);
		// 		gongxi("#congratulation","恭喜你成功招募 <span>"+name_s_new+"</span>");
		// 		$(".pop_newninja").addClass("on");
		// 		$(".pop_newninja").removeClass("zoomOut");
		// 		//$(".pop_mask").fadeIn(100);
		// 		istanchunewninja = 1;
		// }
}
