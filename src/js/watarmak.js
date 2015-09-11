var watermak = (function (){

    var init = function () {
        _setUpListners();

    };

    var  _setUpListners = function () {
        $('#r-t').on('click', right_t);
        $('#c-t').on('click', center_t);
        $('#l-t').on('click', left_t);
        $('#m-l').on('click', right_g);
        $('#m-c').on('click', center_g);
        $('#m-r').on('click', left_g);
        $('#b-l').on('click', right_b);
        $('#b-c').on('click', center_b);
        $('#b-r').on('click', left_b);

    }

    function right_t () {

        $('.watermak-img').each(function(){
            $(this).css({

                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){

            $(this).css({
                'position' : 'absolute',
                'top' : '0',
                'right' :'0',
                'left' : 'inherit',
                'bottom' : 'inherit',
                'transform' : 'inherit'
            });
        });
    }
    function center_t () {

        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })

        $('.watermak').each(function(){

            $(this).css({
                'position' : 'absolute',
                'top' : '0',
                'right' : 'inherit',
                'left' : '50%',
                'bottom' : 'inherit',
                'transform' : 'translate(-50%, 0)'
            });
        });
    }
    function left_t () {

        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })

        $('.watermak').each(function(){

            $(this).css({
                'position' : 'absolute',
                'top' : '0',
                'right' : 'inherit',
                'left' : '0',
                'bottom' : 'inherit',
                'transform' : 'inherit'
            });
        });
    }
    function right_g () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })

        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : '50%',
                'right' : '0',
                'left' : 'inherit',
                'bottom' : 'inherit',
                'transform' : 'translate(0,-50%)'

            });

        });
    }

    function center_g () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : '50%',
                'right' : 'inherit',
                'left' : '50%',
                'bottom' : 'inherit',
                'transform' : 'translate(-50%,-50%)',
            });
        });
    }
    function left_g () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : '50%',
                'right' : 'inherit',
                'left' : '0',
                'bottom' : 'inherit',
                'transform' : 'translate( 0,-50%)'
            });
        });
    }
    function right_b () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : 'inherit',
                'right' : '0',
                'left' : 'inherit',
                'bottom' : '0',
                'transform' : 'inherit'
            });
        });
    }
    function center_b () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : 'inherit',
                'right' : '50%',
                'left' : 'inherit',
                'bottom' : '0',
                'transform' : 'translate( 50%,0)'
            });
        });
    }
    function left_b () {
        $('.watermak-img').each(function(){
            $(this).css({
                'left' : '0',
                'top' : '0'
            })
        })
        $('.watermak').each(function(){
            $(this).css({
                'position' : 'absolute',
                'top' : 'inherit',
                'right' : 'inherit',
                'left' : '0',
                'bottom' : '0',
                'transform' : 'inherit'
            });
        });
    }

    return {
        init: init
    };

})();

watermak .init();