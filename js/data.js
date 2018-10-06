var app = angular.module('httpApp',['ngSanitize']);
        app.controller('httpController', function ($scope, $http) {
			$scope.idN = -1;
			$scope.van = "";
            $http.get("data/tiengviet.xml",
                    {
                        transformResponse: function (cnv) {
                            var x2js = new X2JS();
                            var aftCnv = x2js.xml_str2json(cnv);
                            return aftCnv;
                        }
                    })
            .success(function (response) {				
                $scope.list = response.listdata.tv; 
				$scope.loadVan = function(string,text){
					string = string.replaceAll('<br/>','*');
					var startArr = [];
					var start = locdau(string).indexOf(locdau($scope.van));
					while (start != -1) {
					  startArr.push(start);
					  start = locdau(string).indexOf(locdau($scope.van),start + 1)
					}
					//var start = Number(locdau(string).indexOf(locdau($scope.van)));
					var longWord = Number($scope.van.length);
					var htm = "";
					if(startArr.length==0) htm = string
					else{
						for(var i=0;i<string.length;i++){
							var key=-1;
						for(var j=0;j<startArr.length;j++)
						{													
							if(i>=startArr[j]&&i<startArr[j]+longWord){
									key = i;
							}
						}
						if(key>-1)
						 	htm+='<span class="'+text+'">'+string[i]+'</span>';	
						else
							htm+=string[i];
						}
					}	
					return htm.replaceAll('*','<br/>');;
				}
				$scope.backstyle = function(){
					if($('#popup').css('display') == 'none')
						window.location.href='layout.html';
					else
						$('#popup').hide();	
				}
				$scope.alpha = function(string){
					return string.charAt(0).toUpperCase() + string.slice(1);	
				}
				$scope.showup = function(text){
					if($('#popup').css('display') == 'none'){						
						$scope.Read(text);
						randomImage();
						$("#popup").show();
					}
				}				
				$scope.buterfly = function(text){
					if($('#popup').css('display') != 'none'){
						randomImage();
						$scope.Read(text);
					}
						
				}
				$scope.Read = function(text){
						var text = encodeURIComponent(text);
            var url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi-VN&client=tw-ob&q="+text;
            $('audio').attr('src', url).get(0).play();;
						
				}
				$scope.loadBaitho = function(msg,key){
					var worlds="";
					var msg1 =  msg.split('(')[0];
					var msg2 =  msg.split('(')[1];
					if(key==0){//Read
						worlds = msg1.replaceAll("\n",".");
					}
					else {
						if(key==1){//show	
							worlds = msg.replaceAll("\n","<br/>");
						}
						else if(key==2){//show shoter
						var start = backEnter(locdau(msg1),locdau($scope.van));
							if(msg2!=undefined)
								worlds = (msg1.substring(start,start+40)+"...("+msg2).replaceAll("\n","<br/>");
							else
								worlds = (msg1.substring(start,start+50)+"...").replaceAll("\n","<br/>");
						}
					}
					
					return worlds;
					
				}				
				var idN = window.location.href.split('=')[1];
					angular.forEach($scope.list, function(value) {
						if(value.id === idN){
							$scope.data = value;
							$scope.van = value.van;
						}
					});		
            });
        });
		app.filter('startFrom', function() {
    	return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
function backEnter(string,text){
	var pos = string.indexOf(text);
	var firstWord = 0;
	for(var i = pos;i>0;i--){
		if(string[i]=="\n"){
			firstWord = string.indexOf(string[i],i);
			break;
		}
	}
	if(firstWord!=0) firstWord+= 1;
	return firstWord;
}	
function setCookie(c_name, value) {
    localStorage[c_name] = value;
}
function getCookie(c_name) {
    return localStorage[c_name];
}
function allLetter(inputtxt)
{
	var letters = /^[A-Za-z]+$/;
	if(inputtxt.match(letters))
    	return 1;
    else
    	return 0;
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
    str = str.replace(/à|á|ạ|ả|ã/g, "a");
	str = str.replace(/ầ|ấ|ậ|ẩ|ẫ/g, "â");
	str = str.replace(/ằ|ắ|ặ|ẳ|ẵ/g, "ă");
	
    str = str.replace(/è|é|ẹ|ẻ|ẽ/g, "e");
	str = str.replace(/ề|ế|ệ|ể|ễ/g, "ê");
	
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	
    str = str.replace(/ò|ó|ọ|ỏ|õ/g, "o");
	str = str.replace(/ồ|ố|ộ|ổ|ỗ/g, "ô");
	str = str.replace(/ờ|ớ|ợ|ở|ỡ/g, "ơ");
	
    str = str.replace(/ù|ú|ụ|ủ|ũ/g, "u");
	str = str.replace(/ừ|ứ|ự|ử|ữ/g, "ư");
	
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");	
    str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, " ");
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}
function makeNewPosition(){// Get viewport dimensions (remove the dimension of the div)
			var h = $(window).height() - 100;
			var w = $(window).width() - 100;
			
			var nh = Math.floor(Math.random() * h);
			var nw = Math.floor(Math.random() * w);
			
			return [nh,nw];
}
function randomImage(){
			var rdImg = Math.floor((Math.random() * 6) + 1);
			$("#popup").css("background","url(images/poem"+rdImg+".jpg) no-repeat");	
			$("#popup").css("background-size","100% 100%");
		}
function animateDiv(myclass){
			var newq = makeNewPosition();
			$(myclass).animate({ top: newq[0], left: newq[1] }, 10000,   function(){
			  animateDiv(myclass);        
			});
};