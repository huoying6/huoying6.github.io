//在页面未加载完毕之前显示的loading Html自定义内容
var msg = ["正在加载图像..."/*,"正在读取字体..."*/,"正在玩命加载...","正在加载音效...","正在加载资源..."];
//alert(msg[Math.floor(Math.random() * msg.length)]);
//var _LoadingHtml = '<div id="LoadingBar"><div class="div txt-c animated fadeIn"><div class="load-container load8"><div class="loader">Loading</div></div><p>啊……一天不抽手就痒了</p><span id="cantwaiting"></span></div></div>';
//呈现loading效果
//document.write(_LoadingHtml);
var changeloadingtext = setInterval(function(){
	$("#LoadingBar p").html(msg[Math.floor(Math.random() * msg.length)]);
},2000)
setTimeout(function(){
	if($("#LoadingBar").is(":visible")){
		$("#LoadingBar p").html("服务器几乎睡着了……");
	}	
},20000)

//判断是否是pc
$(function(){
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { 
		/*location.replace("http://www.huanyuweizhi.com/");*/  //此处填写跳转到的手机版网站页面
		//$(".btn_audio").remove();
	}else{ 
		//$('body').before('你现在用的是电脑访问的'); 
	} 
})


