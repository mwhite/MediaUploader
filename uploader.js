    var MultimediaUploader = function(opts) {
      var self = {},
          _private = {};
      'use strict';

      self.init = function (filetype) {
        var mediaTypes = {
          'image': {
            'text': 'image',
            'icon': 'fa fa-photo'
          }, 
          'audio': {
            'text': 'audio',
            'icon': 'fa fa-volume-up'
          },
          'video': {
            'text': 'video',
            'icon': 'fa fa-video-camera'
          },
          'video-inline': {
            'text': 'video-inline',
            'icon': 'fa fa-play'
          },
          'expanded-audio': {
            'text': 'expanded-audio',
            'icon': 'fa fa-volume-up'
          },
        };
        var mediaType = mediaTypes[filetype];

        $(function() {
          createModalHeader(mediaType['text']);
        });
        $(document).on('click', opts.selectFileSelector, function() {
          _private.createSelectFileSection(mediaType['text']);
        });
        $(document).on('change', opts.fileFieldSelector, function(event) {
          _private.createSelectionRow(mediaType['text']);
          _private.collectFileData(event);
        });
        $(document).on('click', opts.fullSizeImage, function(image) {
          _private.showFullSize(image);
        });
      };

      // public functions
      var createModalHeader = function(filetype) {
        var selectHeader = $('#js-create-header');
        var selectHeaderTemplate = _.template(selectHeader.text());
        $(selectHeader).html(selectHeaderTemplate({
          filetype: filetype,
        }));
      }

      // private functions
      // create select file section
      _private.createSelectFileSection = function(filetype) {
        var selectFileRow = $('#js-select-file-section');
        var fileRow = $('#select-file-section');
        var selectFileTemplate = _.template(selectFileRow.text());
        $(fileRow).html(selectFileTemplate({
          filetype: filetype,
        }));
      }  
  
      // create selection row
      _private.createSelectionRow = function(filetype) {
        var selectionRow = $('#js-selected-media-section');
        var mediaRow = $('#selected-media-section');
        var selectionTemplate = _.template(selectionRow.text());
        $(mediaRow)
          .addClass("spacing")
          .html(selectionTemplate({
            filetype: filetype,
          }));
      }

      // get data from file selector
      _private.collectFileData = function(event) {
        var image = {};
        var reader = new FileReader();
        reader.onload = function() {
          image = $('#js-output-file')[0];
          image.src = reader.result;
        }
        var file = event.target.files[0];
        reader.readAsDataURL(file);
        
        var attributes = {
          'name': file.name,
          'size': file.size,
        };
        _private.createSelectFileElements(attributes);
      }

      _private.showFullSize = function(event) {
        var image = event.target.files[0];
        if (image) {
          console.log(image);
          window.open('http://www.dogster.com/wp-content/uploads/2016/07/shutterstock_90574015-600x368.jpg');
        } else {
          alert('no image');
        }
      }

      // show data, progress bar, and ready text
      _private.createSelectFileElements = function(attributes) {
        var fileName = attributes["name"];
        var fileSize = attributes["size"];
        var dataRow = $('#js-media-data-section');
        var mediaData = $('#media-data-section');
        var dataTemplate = _.template(dataRow.text());
        $(mediaData).html(dataTemplate({
          fileName: fileName,
          fileSize: fileSize,
         }));
      }

      return self;
    }

    $(function () {
      var mediaUploader = new MultimediaUploader({
        selectHeaderSelector: "#js-create-header",
        selectFileSelector: "#js-select-file",
        selectionSectionSelector: "#js-file-upload-label",
        submitFileSelector: "#submit-file",
        fileFieldSelector: "#js-file-upload",
        fullSizeImage: "#js-full-image",
        fileDataSelector: "#js-file-data",
        progressBarSelector: "#js-file-progress",
        readyTextSelector: "#js-file-ready-text",
      });
      mediaUploader.init('image');
    })