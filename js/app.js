function loadImg(){
	var img = "";
	for(var i=0;i<17;i++){
		img += '<img src="picture/imgshow'+i+'.jpg" class="icons"/>';	
	}	
	$(img).appendTo($("#container"));
}
function setCookie(c_name, value) {
    localStorage[c_name] = value;
}
function getCookie(c_name) {
    return localStorage[c_name];
}
String.prototype.replaceAll = function (
strTarget, // The substring you want to replace
strSubString // The string you want to replace in.
) {
    var strText = this;
    var intIndexOfMatch = strText.indexOf(strTarget);

    // Keep looping while an instance of the target string
    // still exists in the string.
    while (intIndexOfMatch != -1) {
        // Relace out the current instance.
        strText = strText.replace(strTarget, strSubString)

        // Get the index of any next matching substring.
        intIndexOfMatch = strText.indexOf(strTarget);
    }

    // Return the updated string with ALL the target strings
    // replaced out with the new substring.
    return (strText);
}
function locdau(str) {
    //code by Minit - www.canthoit.info - 13-05-2009
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, " ");
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}
function RandomArray(arr,len){
	var rdarr = [];
	for(var i = 0; i < len; i ++){
		var index = Math.floor((Math.random() * arr.length) + 1)-1;
		rdarr.push(arr[index]);
		arr.splice(index, 1);
	}
	return rdarr;	
}
function crossNumber(n1,n2){
	var arr=[];
	var arr0 = ["00","01","02","03","04","05","06","07","10","11","12","13","14","15","16","17","20","21","22","23"];
	var arr1 = ["24","25","26","27","30","31","32","33","34","35","36","37","40","41","42","43","44","45","46","47"];
	for(var i=0;i<arr0.length;i++){
		for(var j=0;j<arr1.length;j++){
			if(i==j){
				arr.push(arr0[i]+arr1[j]);
				arr.push(arr1[j]+arr0[i]);	
			}
		}
	}
	if(arr.includes(n1+n2)==true)	
		return true
	else	
		return false;
}
function goURL(chanel){
	if(chanel=='plus'){//câu hỏi tiếp theo trong 1 chủ đề
		var url = window.location.href;
		if(url.includes('page')){
			var urlPart = window.location.href.split('page=')
			urlPart[1]++;
			window.location.href=urlPart[0]+"page="+Number(urlPart[1]);
		}else{
			var newurl = url.replace(".html","content.html")
			window.location.href=newurl+"?page=0";	
		}
		
	}
	if(chanel=='next'){//qua phần thi khác trong 1 chủ đề
		var url = window.location.href;
		var urlPart = url.split('?page')[0];
		if(url.includes('hanhquan')){//từ hành quân sang vượt thành			
			window.location.href=urlPart.replace('hanhquancontent','vuotthanh');	
		}
		if(url.includes('vuotthanh')){			
			window.location.href=urlPart.replace('vuotthanhcontent','canquet');	
		}
		if(url.includes('canquet')){
			setCookie("p_vong",Number(getCookie("p_vong"))+10);		
			window.location.href=urlPart.replace('canquetcontent','doatthanh');	
		}		
		//var ck = getIdObject('id')+'_'+getIdObject('object');
		//setCookie("point_"+ck,getCookie("p_vong"));
	}
	if(chanel=='reset'){
		var url = window.location.href;
		var id = url.split('id=')[1].substring(0,1);
		var object = url.split('object=')[1].substring(0,1);
		window.location.href="hanhquan.html?id="+id+"?object="+object;	
		var temp = id+"_"+object;
		setCookie("Pass_"+temp,0);
	}
		
		
}

