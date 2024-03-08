chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    var extension = item.filename.substring(item.filename.lastIndexOf('.'));
    var destinationDir = '';
  
    // Define destination directories for different file extensions
    switch (extension) {
      case '.pdf':
        destinationDir = 'PDFs';
        break;
      case '.jpg':
      case '.png':
        destinationDir = 'Images';
        break;
      default:
        destinationDir = 'Other';
        break;
    }
  
    // Create the destination directory if it doesn't exist
    chrome.downloads.download({
      url: 'filesystem:' + chrome.runtime.id + '/temporary', // Dummy URL for directory creation
      filename: destinationDir + '/', // Append trailing slash to indicate a directory
      conflictAction: 'overwrite',
      saveAs: false
    }, function(downloadId) {
      // Suggest the new filename with the created directory
      suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
    });
  });  