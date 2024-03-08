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
  
    // Obtain the extension directory and create the destination subdirectory
    chrome.runtime.getPackageDirectoryEntry(function(directoryEntry) {
      directoryEntry.getDirectory(destinationDir, {create: true}, function() {
        // Once the directory is created (or if it already exists), suggest the new filename with the directory path
        suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
      }, function(error) {
        console.error('Error creating directory:', error);
      });
    });
  
    // Return true to indicate that suggestCallback will be called asynchronously
    return true;
  });  