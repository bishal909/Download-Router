function displayRules() {
    chrome.storage.sync.get('rules', function(data) {
      var rules = data.rules || [];
      var rulesList = document.getElementById('rulesList');
      rulesList.innerHTML = ''; // Clear previous content
  
      rules.forEach(function(rule, index) {
        var ruleDiv = document.createElement('div');
        ruleDiv.classList.add('rule');
  
        var ruleText = document.createTextNode('Extension: ' + rule.extension + ', Location: ' + rule.location);
        ruleDiv.appendChild(ruleText);
  
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
          deleteRule(index);
        });
        ruleDiv.appendChild(deleteButton);
  
        rulesList.appendChild(ruleDiv);
      });
    });
  }
  
  function deleteRule(index) {
    chrome.storage.sync.get('rules', function(data) {
      var rules = data.rules || [];
      rules.splice(index, 1);
      chrome.storage.sync.set({rules: rules}, function() {
        displayRules();
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    displayRules();
  });  