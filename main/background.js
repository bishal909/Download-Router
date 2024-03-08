chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    
    chrome.storage.sync.get('rules', function(data) {
      var rules = data.rules || [];
      var extension = item.filename.substring(item.filename.lastIndexOf('.'));
      var rule = rules.find(r => r.extension === extension);
      if (rule) {
        var destinationDir = rule.location;
        suggest({filename: destinationDir + '/' + item.filename, conflictAction: 'overwrite'});
      } else {
        // No rule found, fall back to default download behavior
        suggest({filename: item.filename, conflictAction: 'uniquify'});
      }
    });
  });  


  chrome.downloads.onChanged.addListener(function(downloadDelta) {
    if (downloadDelta.state && downloadDelta.state.current === 'complete') {
      chrome.downloads.search({id: downloadDelta.id}, function(downloadItems) {
        if (downloadItems && downloadItems.length > 0) {
          var downloadItem = downloadItems[0];
          var downloadPath = downloadItem.filename;
          console.log('Downloaded file path:', downloadPath);
          // Handle the download path as needed
        }
      });
    }
  });
  