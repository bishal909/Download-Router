chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    chrome.storage.sync.get('rules', function(data) {
      var rules = data.rules || [];
      var extension = item.filename.substring(item.filename.lastIndexOf('.'));
      var rule = rules.find(r => r.extension === extension);
      if (rule) {
        var destinationDir = rule.location;
        suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
      }
    });
});  