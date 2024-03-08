document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('optionsForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var extension = form.extension.value.trim();
      var location = form.location.value.trim();
      if (extension && location) {
        chrome.storage.sync.get('rules', function(data) {
          var rules = data.rules || [];
          rules.push({extension: extension, location: location});
          chrome.storage.sync.set({rules: rules}, function() {
            form.reset();
            alert('Rule added successfully.');
          });
        });
      } else {
        alert('Please provide both extension and location.');
      }
    });
  });
  