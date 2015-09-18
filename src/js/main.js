$(document).ready(function() {

  var App = {


    config: {
      maxFileSize : '10mb',
      allowedExt  : 'jpg,jpeg,gif,png',
      position    : 'left-top',
      spinnerStep : 1,
      opacity     : .4,
      opacityStep : .02
    },


    // инициализация приложения
    init: function() {
      var me = this;


      // кэш элементов
      me.$form            = $('#param-form');
      me.$uploadPercent   = $('#upload-percent');
      me.$watermarkWrap   = $('#watermark-file-wrap');
      me.$sectionPosition = $('#section-position');
      me.$sectionOpacity  = $('#section-opacity');
      me.$sectionButtons  = $('#section-buttons');
      me.$image           = $('#main-image');
      me.$watermark       = $('#watermark-image');
      me.$imageFile       = $('#main-image-file');
      me.$watermarkFile   = $('#watermark-file');
      me.$imageHidden     = $('[name="main-image-file"]');
      me.$watermarkHidden = $('[name="watermark-file"]');
      me.$spinnerX        = $('#spinnerX');
      me.$spinnerY        = $('#spinnerY');
      me.$position        = $('#position :radio');
      me.$opacitySlider   = $('#slider');
      me.$opacityHidden   = $('[name="opacity"]');
      me.$reset           = $('#reset');


      // запуск плагинов
      me.initUploaders();
      me.initSpinners();
      me.initOpacitySlider();
      me.initWatermarkDrag();


      // подцепляем события
      me.attachEvents();
    },

    attachEvents: function() {
      var me = this;

      me.imageUploader
      .bind('FilesAdded', function(uploader, files) {
        me.onImageAdded(uploader, files);
      });

      me.imageUploader.bind('FileUploaded', function(uploader, file, response) {
        var data = JSON.parse(response.response);

        if (data && data.status == 'error') {
          alert(data.message);
        }

        if (data && data.status == 'success') {

          var image = $('<img />').attr({
            'src': 'php/' + data.url,
            'width': data.width,
            'height': data.height,
            'id': 'main-image',
            'class': 'main-image'
          });

          me.$image.html(image);

          // сохраняем данные об основном изображении
          me.image = data;
          me.$imageHidden.val(data.url);

          me.$watermarkWrap.removeClass('is-disable');
          me.$uploadPercent.hide();
        }

      });

      me.imageUploader.bind('UploadProgress', function(uploader, file) {
        me.$uploadPercent.show().text(file.percent + '%');
      });


      me.watermarkUploader.bind('FilesAdded', function(uploader, files) {
        me.onWatermarkAdded(uploader, files);
      });

      me.watermarkUploader.bind('FileUploaded', function(uploader, file, response) {
        var data = JSON.parse(response.response);

        if (data && data.status == 'error') {
          alert(data.message);
        }

        if (data && data.status == 'success') {

          var watermark = $('<img />').attr({
            'src': 'php/' + data.url,
            'width': data.width,
            'height': data.height,
            'id': 'watermak-id',
            'class': 'watermak-img'
          });

          me.$watermark.html(watermark);

          // сохраняем данные о водяном знаке
          me.watermark = data;
          me.$watermarkHidden.val(data.url);

          me.calculatePresetPositions(me.image, me.watermark);
          me.setInitialState();

          me.$uploadPercent.hide();
        }

      });


      me.watermarkUploader.bind('UploadProgress', function(uploader, file) {
        me.$uploadPercent.show().text(file.percent + '%');
      });


      // поменялась позиция радиокнопкой
      me.$position.on('change', function(e) {
        me.onPositionChange($(this).data('pos'));
      });


      // поменялась позиция по оси Х
      me.$spinnerX.spinner('option', 'stop', function(e, ui) {
        me.onPositionSpin({
          left: this.value,
          top: me.$spinnerY.spinner('value')
        });
      });


      // поменялась позиция по оси Y
      me.$spinnerY.spinner('option', 'stop', function(e, ui) {
        me.onPositionSpin({
          left: me.$spinnerX.spinner('value'),
          top: this.value
        });
      });


      // поменялась прозрачность
      me.$opacitySlider.slider('option', 'slide', function(e, ui) {
        me.setWatermarkOpacity(ui.value);
      });


      // перетаскивание водяного знака
      me.$watermark.draggable('option', 'drag', function(e, ui) {
        me.onWatermarkDrag(ui.position);
      });


      // сброс
      me.$reset.on('click', function() {
        me.onReset();
      });

    },

    onImageAdded: function(uploader, files) {
      var me = this;

      files.forEach(function(file) {
        me.$imageFile.find('.file-upload__text').text(file.name);
      });

      uploader.start();
    },

    onWatermarkAdded: function(uploader, files) {
      var me = this;

      files.forEach(function(file) {
        me.$watermarkFile.find('.file-upload__text').text(file.name);
      });

      uploader.start();
    },

    onPositionChange: function(position) {
      var me = this;

      me.setWatermarkPosition(position);
    },

    onPositionSpin: function(coords) {
      var me = this;

      me.setWatermarkPosition(coords);
    },

    onOpacityChange: function(value) {
      var me = this;

      me.setWatermarkOpacity(value);
    },

    onWatermarkDrag: function(coords) {
      var me = this;

      me.setWatermarkPosition(coords);
    },

    onReset: function() {
      var me = this,
          cfg = me.config;

      me.setWatermarkOpacity(cfg.opacity);
      
      me.setWatermarkPosition(cfg.position);
    },


    // устаналивает начальное состояние приложения
    setInitialState: function() {
      var me = this,
          cfg = me.config;

      me.setWatermarkPosition(cfg.position);

      me.$spinnerX.spinner('option', 'max', me.image.width - me.watermark.width);
      me.$spinnerY.spinner('option', 'max', me.image.height - me.watermark.height);

      me.setWatermarkOpacity(cfg.opacity);

      me.$sectionPosition.removeClass('is-disable');
      me.$sectionOpacity.removeClass('is-disable');
      me.$sectionButtons.removeClass('is-disable');
    },


    // рассчитывает координаты заранее определённых позиций
    calculatePresetPositions: function(image, watermark) {
      var me = this;

      me.presetPositions = {
        'left-top': { 
          left: 0,
          top: 0 
        },
        'left-center': {
          left: 0,
          top: image.height / 2 - watermark.height / 2
        },
        'left-bottom': {
          left: 0,
          top: image.height - watermark.height
        },
        'top-center': { 
          left: image.width / 2 - watermark.width / 2,
          top: 0
        },
        'center-center': {
          left: image.width / 2 - watermark.width / 2,
          top: image.height / 2 - watermark.height / 2
        },
        'bottom-center': {
          left: image.width / 2 - watermark.width / 2,
          top: image.height - watermark.height
        },
        'right-top': {
          left: image.width - watermark.width,
          top: 0
        },
        'right-center': {
          left: image.width - watermark.width,
          top: image.height / 2 - watermark.height / 2
        },
        'right-bottom': {
          left: image.width - watermark.width,
          top: image.height - watermark.height
        }
      }

    },


    // получает координаты позиции
    getPositionCoords: function(position) {
      var me = this;

      return me.presetPositions[position];
    },

    // инициализация загрузчиков изображений
    initUploaders: function() {
      var me = this,
          cfg = me.config;


      // загрузчик основного изображения
      me.imageUploader = new plupload.Uploader({
        runtimes: 'html5,html4',
        browse_button: me.$imageFile[0],
        url: 'php/upload.php',
        file_data_name: 'picture',
        filters: {
          max_file_size: cfg.maxFileSize,
          mime_types: [{
            extensions: cfg.allowedExt
          }]
        }
      });


      // загрузчик водяного знака
      me.watermarkUploader = new plupload.Uploader({
        runtimes: 'html5,html4',
        browse_button: me.$watermarkFile[0],
        url: 'php/upload.php',
        file_data_name: 'watermark',
        filters: {
          max_file_size: cfg.maxFileSize,
          mime_types: [{
            extensions: cfg.allowedExt
          }]
        }
      });


      me.imageUploader.init();
      me.watermarkUploader.init();
    },

    initSpinners: function() {
      var me = this,
          cfg = me.config;


      // ось X
      me.$spinnerX.spinner({
        step: cfg.spinnerStep,
        min: 0
      });


      // ось Y
      me.$spinnerY.spinner({
        step: cfg.spinnerStep,
        min: 0
      });

    },

    initOpacitySlider: function() {
      var me = this,
          cfg = me.config;

      me.$opacitySlider.slider({
        min: 0.02,
        max: 1,
        step: cfg.opacityStep,
        value: cfg.opacity
      });

    },

    initWatermarkDrag: function() {
      var me = this;

      me.$watermark.draggable({
        containment: me.$image
      });
    },


    // устанавливает новые координаты водяного знака
    setWatermarkPosition: function(position) {
      var me = this,
          coords;


      // если передан объект с координатами
      if ($.isPlainObject(position)) {

        coords = {
          left: position.left,
          top: position.top
        }

        me.$position.prop('checked', false);


      // если передана строка с определённой позицией
      } else {
        coords = me.getPositionCoords(position);
        me.$position.filter('[data-pos="' + position + '"]').prop('checked', true);
      }


      me.$watermark.css({
        left: coords.left + 'px',
        top: coords.top + 'px'
      });

      me.$spinnerX.val(coords.left);
      me.$spinnerY.val(coords.top);
    },


    // устанавливает прозрачность водяного знака
    setWatermarkOpacity: function(value) {
      var me = this;

      me.$opacitySlider.slider('value', value);
      me.$opacityHidden.val(value);
      me.$watermark.css('opacity', value);
    }

  }


  App.init();

});