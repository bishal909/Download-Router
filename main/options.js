document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('optionsForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log(form);
      var extension = form.extension.value.trim();
      var location = form.location.value.trim();
      console.log(extension);
      console.log(location);
      if (extension && location) {
        console.log('beforesync' + chrome.storage);
        chrome.storage.sync.get('rules', function(data) {
          var rules = data.rules || [];
          rules.push({extension: extension, location: location});
          console.log('rules pushed',rules);
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
  