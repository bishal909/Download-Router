chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    // Define destination directories for different file extensions
    var destinationDirectories = {
      ".pdf": "pdf_folder",
      ".jpg": "image_folder"
      // Add more extensions and corresponding directories as needed
    };
  
    var extension = item.filename.substring(item.filename.lastIndexOf('.'));
    var destinationDir = destinationDirectories[extension];
    if (destinationDir) {
      suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
    }
});