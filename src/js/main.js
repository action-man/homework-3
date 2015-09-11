    $(document).ready(function() {
        (function(){
            var app = (function(){

        var init = function () {
            _setUpListners();


        };

        var  _setUpListners = function () {
            $('#browse').on('click', _fileload);
            $('#browse2').on('click', _fileload2);

        };
                

        var _fileload = function() {
            var uploader = new plupload.Uploader({
                browse_button: 'browse',
                url: 'upload.php',
                filters : {
                    max_file_size : '10mb',
                    mime_types: [
                        {title : "Image files", extensions : "jpg,gif,png"},

                    ]
                }
            });

            uploader.init();

            uploader.bind('FilesAdded', function(up, file) {

                var ppp = '';
                plupload.each(file, function(file) {
                    ppp +=  file.name;
                });
                document.getElementById('filelist').placeholder += ppp;

                uploader.bind('Error', function(up, err) {
                    document.getElementById('filelist').placeholder += "Error";
                });
            });
        };


       var _fileload2 = function() {
                    var uploader = new plupload.Uploader({
                        browse_button: 'browse2',
                        url: 'upload.php',
                        filters : {
                            max_file_size : '10mb',
                            mime_types: [
                                {title : "Image files", extensions : "jpg,gif,png"},
                            ]
                        }
                    });
           uploader.init();
           uploader.bind('FilesAdded', function(up, file) {
               var ppp = '';
                        plupload.each(file, function(file) {
                            ppp +=  file.name;
                        });
                        document.getElementById('filelist2').placeholder += ppp;
                        uploader.bind('Error', function(up, err) {
                            document.getElementById('filelist2').placeholder += "Error";
                        });

                    });
                };

                return {

   init: init

    };

 })();

  app.init();

 })();

    });

