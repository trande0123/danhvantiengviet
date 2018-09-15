var LevelModule = (function () {
    var levelBox, controls;

    // A private counter variable
    myPrivateVar = 0;

    var generateCompleteStar = function(i){
        var iconArray = [
            {
                icon:"⬤",
                class:""
            },
            {
                icon:"⬤",
                class:""
            },
            {
                icon:"⬤",
                class:""
            }];
        
        if(i%2==0){
            iconArray[0].icon = iconArray[1].icon = "★";
            iconArray[0].class = iconArray[1].class = "big complete";
        }
        if(i%4==0){
            iconArray[1].icon = iconArray[2].icon = "⬤";
            iconArray[1].class = iconArray[2].class = "";
        }
        if(i%5==0){
            iconArray[0].icon = iconArray[1].icon = iconArray[2].icon = "★";
            iconArray[0].class = iconArray[1].class = iconArray[2].class = "big complete";
        }
        var template = `<div class="stars">
            <div class="star ${iconArray[0].class}">${iconArray[0].icon}</div>
            <div class="star ${iconArray[1].class}">${iconArray[1].icon}</div>
            <div class="star ${iconArray[2].class}">${iconArray[2].icon}</div>
        </div>`;
        return template;
    };

    var showTooltip = function(elem){
        console.log(elem);
    };

    // A private function which logs any arguments
    var initLevelItems = function () {
        var gridItems = levelBox.querySelectorAll('.border-box');
        for (let index = 0; index < gridItems.length; index++) {
            const element = gridItems[index];
            var template = `<div class="level-item">${index+1}</div>
            ${generateCompleteStar(index)}
            `;
            element.innerHTML = template;
        }
    };

    var setElements = function () {
        levelBox = document.getElementsByClassName('level-box')[0];
        controls = document.querySelectorAll(".level-control-item");
    };

    var initElements = function () {
        initLevelItems();

        for (let index in controls) {
            controls[index].addEventListener("click", function(){showTooltip(this);}, false);;
        }
    };

    return {
        // A public variable
        myPublicVar: "foo",

        init: function () {
            setElements();
            initElements();
        },

        // A public function utilizing privates
        myPublicFunction: function (bar) {

            // Increment our private counter
            myPrivateVar++;
        }
    };

})();

document.addEventListener('DOMContentLoaded', function () {
    LevelModule.init();
}, false);