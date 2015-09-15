var reset = (function (){

    var init = function () {
        _setUpListners();

    };

    var  _setUpListners = function () {
        $('#reset').on('click', reset);

    }

    var reset = function() {
        $('.watermak-img').each(function(){
            $(this).css({

                'left' : '0',
                'top' : '0',
                'opacity' : '1'
            })
        })
        $('.watermak').each(function(){

            $(this).css({
                'position' : 'absolute',
                'top' : '0',
                'right' :'inherit',
                'left' : '0',
                'bottom' : 'inherit',
                'transform' : 'inherit'
            });
        });
        $("#slider").slider({values:[1]});
        $('#l-t').click();


    }




    return {
        init: init
    };


})();

reset.init();