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

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  if (form && note) {
    var nameInput = form.querySelector('input[name="name"]');
    var emailInput = form.querySelector('input[name="email"]');
    var messageInput = form.querySelector('textarea[name="message"]');
    var botcheck = form.querySelector('input[name="botcheck"]');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      note.textContent = '';

      if (botcheck && botcheck.checked) {
        note.textContent = 'Unable to send message.';
        return;
      }

      if (!nameInput.value.trim()) {
        note.textContent = 'Please enter your name.';
        nameInput.focus();
        return;
      }

      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        note.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        note.textContent = 'Please enter a message of at least 10 characters.';
        messageInput.focus();
        return;
      }

      note.textContent = 'Sending...';

      var submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        var formData = new FormData(form);
        var response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        var result = await response.json();

        if (response.ok && result.success) {
          note.textContent = 'Thanks! Your message has been sent.';
          form.reset();
        } else {
          note.textContent = result.message || 'Something went wrong. Please try again.';
        }
      } catch (error) {
        note.textContent = 'Unable to send right now. Please try again later.';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
})();
