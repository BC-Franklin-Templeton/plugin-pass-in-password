videojs.registerPlugin('passwordToView', function (pluginOptions) {
  var myPlayer = this;
  var passwordToMatch = pluginOptions.password;
  var modalOptions = {
    uncloseable: true,
  };

  // Create a div element to hold the modal content
  var modalContent = document.createElement('div');
  modalContent.setAttribute('style', 'display:flex;justify-content:center;align-items:center;');

  // Create content for the modal
  modalContent.innerHTML = `
    <div class="wrap">
      <h2>Enter password</h2><br>
      <input class="theFormInput" type="password" id="passwordInputID"><br>
      <input id="formButtonID" class="theForm" type="button" value="Log In">
    </div>
  `;

  // Create a specific ModalDialog and display it
  var myModal = myPlayer.addChild('ModalDialog', modalOptions);
  myModal.content(modalContent);
  myModal.open();

  // Add event listener to the button
  var formButton = modalContent.querySelector('#formButtonID');
  formButton.addEventListener('click', closeModal);

  // Add event listener if user presses Enter key after entering password
  var passwordInput = modalContent.querySelector('#passwordInputID');
  passwordInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      closeModal();
    }
  });

  // Check entered password against saved password and act accordingly
  function closeModal() {
    var userInputPassword = passwordInput.value;
    // If passwords match, close ModalDialog and play video
    if (userInputPassword === passwordToMatch) {
      myModal.close();
      myPlayer.play();
    } else {
      window.alert('Sorry, password is incorrect. Try again.');
    }
  }
});
