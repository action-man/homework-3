var slider = (function (){

    var init = function () {
        _slider();
        // то что должно произойти сразу
    };


    var _slider = function() {
        $("#slider").slider({values:[1],
            min:0.1,
            max:1,

            step:0.1,
            slide: function (event, ui) {
                $(".watermak-img").css('opacity',ui.values );
            }
        });
    };

    return {
        init: init
    };


})();

slider.init();