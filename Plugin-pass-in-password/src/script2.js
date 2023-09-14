videojs.registerPlugin('passwordToView', function(pluginOptions) {
  var myPlayer = this,
    passwordToMatch = '',
    myModal,
    modalOptions = {},
    formButton,
    passwordInput,
    playButton, // New play button element
    // Create div which will hold content for ModalDialog
    newElement = document.createElement('div'),
    // Get a ModalDialog object
    ModalDialog = videojs.getComponent('ModalDialog');
  myPlayer.preload(false);
  myPlayer.muted(true);

  // +++ Display ModalDialog +++
  // Read password from options
  passwordToMatch = pluginOptions.password;

  // Create a div in which to place HTML content
  newElement.setAttribute("style", "display:flex;justify-content:center;align-items:center;");

  // Create content for ModalDialog
  newElement.innerHTML = '<div class="wrap"><h2>Enter password</h2><br><input class="theFormInput" type="password" id="passwordInputID"><br><input id="formButtonID" class="theForm" type="submit" value="Log In"></div>';

  // Be sure the user cannot close ModalDialog, set content
  modalOptions.uncloseable = true;
  modalOptions.content = newElement;

  // Create a specific ModalDialog and display it
  myModal = new ModalDialog(myPlayer, modalOptions);
  myPlayer.addChild(myModal);
  myModal.open();

  // +++ Add event listeners to check password +++
  // Add an event listener to the button
  formButton = newElement.querySelector('#formButtonID');
  myPlayer.on(formButton, 'click', checkPassword);

  // Add an event listener if the user presses Enter key after entering the password
  passwordInput = newElement.querySelector('#passwordInputID');
  myPlayer.on(passwordInput, 'keydown', function(event) {
    if (event.keyCode === 13) {
      checkPassword();
    }
  });

  // +++ Check entered password against saved password and act accordingly +++
  function checkPassword() {
    var userInputPassword = document.getElementById('passwordInputID').value;
    // If passwords match, close ModalDialog, display the play button, and play the video
    if (userInputPassword == passwordToMatch) {
      myModal.close();
      showPlayButton();
      myPlayer.play();
    } else {
      window.alert('Sorry, password is incorrect. Try again.');
    }
  }

  // Function to show the play button
  function showPlayButton() {
    playButton = document.createElement('button');
    playButton.textContent = 'Play Video';
    playButton.addEventListener('click', function() {
      myPlayer.play();
      myModal.close();
    });
    newElement.appendChild(playButton);
  }
});
