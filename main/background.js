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
  
    // Check if the destination directory exists, create it if it doesn't
    chrome.downloads.search({filenameRegex: '^' + destinationDir + '$'}, function(existingItems) {
      if (existingItems.length === 0) {
        chrome.downloads.download({
          filename: destinationDir, // Directory name
          conflictAction: 'overwrite',
          saveAs: false
        }, function(downloadId) {
          if (downloadId !== undefined) {
            suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
          }
        });
      } else {
        suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
      }
    });
  
    // Return true to indicate that suggestCallback will be called asynchronously
    return true;
  });  