const fs = require('fs');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const path = require('path');

exports.upload = function(req, res) {
    var photos = [],
        form = new formidable.IncomingForm();

    // Upload directory for the images
    form.uploadDir = path.join(__dirname, 'tmp_uploads');

    // Invoked when a file has finished uploading.
    form.on('file', function(name, file) {

        var buffer = null,
            type = null,
            filename = '';

        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
        console.log(file.size);
        // Check the file type, must be either png,jpg or jpeg
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            if (file.size < 200000 || file.size > 1000000) {
                form.on('error', function(err) {
                    console.log('Problem size');
                });
            } else {
                // Assign new file name
                filename = Date.now() + '-' + file.name;

                // Move the file with the new file name
                fs.rename(file.path, path.join(__dirname, '../../dist/assets/images/student/' + filename));

                // Add to the list of photos
                photos.push({
                    status: true,
                    filename: filename,
                    type: type.ext,
                    publicPath: '../../dist/assets/images/student/' + filename
                });
            }
        } else {
            form.on('error', function(err) {
                console.log('Error occurred during processing - ' + err);
            });
        }
    });

    // Invoked when all the fields have been processed.
    form.on('end', function() {
        console.log('All the request fields have been processed.');
    });

    // Parse the incoming form fields.
    form.parse(req, function(err, fields, files) {
        res.status(200).json(photos);
    });
};
