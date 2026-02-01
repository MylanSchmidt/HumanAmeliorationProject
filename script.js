/* Placeholder-only JS. Safe defaults. */
(function(){
  // year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // Optional: Esc triggers quick exit
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      window.location.replace('https://www.google.com');
    }
  });

  // Fake form submit message (since this is a placeholder page)
  window.HAPLanding = {
    fakeSubmit: function(evt){
      if (evt && evt.preventDefault) evt.preventDefault();
      var note = document.getElementById('formNote');
      if (note) {
        note.textContent = 'Thanks — this is a placeholder page. Please email or call us for now.';
      }
      return false;
    }
  };
})();
