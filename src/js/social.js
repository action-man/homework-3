var social = (function (){

    var init = function () {
        _setUpListners();

    };

    var  _setUpListners = function () {


        $('#facebook').on('click', fb);
        $('#twitter').on('click', tw);
        $('#vk').on('click', vk)
    }


    var vk = function (e) {
        e.preventDefault();
        var url = 'http://vk.com/share.php?';
        url += 'url=' + encodeURIComponent(); //адрес страницы
        url += '&title=' + encodeURIComponent(); // заголовок
        url += '&description=' + encodeURIComponent();// Текст сообщения
        url += '&image=' + encodeURIComponent(); //сгенерированное изображение
        url += '&noparse=true';
        popup(url);
    };

    var fb = function (e) {
        e.preventDefault();
        var url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent();
        url += '&p[summary]=' + encodeURIComponent();
        url += '&p[url]=' + encodeURIComponent();
        url += '&p[images][0]=' + encodeURIComponent();
        popup(url);
    };

    var tw = function (e) {
        e.preventDefault();
        var url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent();
        url += '&url=' + encodeURIComponent();
        url += '&counturl=' + encodeURIComponent();
        popup(url);
    };

    var popup = function (url) {

        window.open(url, '', 'location=0,toolbar=0,status=0,width=500,height=500');

    };


    return {
        init: init
    };


})();

social.init();