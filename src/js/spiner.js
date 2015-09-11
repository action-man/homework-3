var spiner = (function (){

    var init = function () {
        _spinner();
        _spinner1();

    };

    var _spinner = function() {
        $( "#spinnerX" ).spinner({
            step: 1,
            change: position,
            stop: position
        });
        function position(){
            xn = this.value;
            document.getElementById('watermakwrapid').style.position = 'absolute';
            document.getElementById('watermakwrapid').style.left = xn +'px';
        }
    }
    var _spinner1 = function() {
        $( "#spinnerY" ).spinner({
            step: 1,
            change: position,
            stop: position
        });
        function position(){
            xn = this.value;
            document.getElementById('watermakwrapid').style.position = 'absolute';
            document.getElementById('watermakwrapid').style.top = xn +'px';
        }
    }

    return {
        init: init
    };


})();

spiner.init();