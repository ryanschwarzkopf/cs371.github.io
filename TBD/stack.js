
//Get values from interface
setTimeout(function () {
  //your code to be executed after 1 second

  //get all the buttons
  let pushButton = document.getElementById("Push_Button");
  let popButton = document.getElementById("Pop_Button");
  let topButton = document.getElementById("Top_Button");
  let emptyButton = document.getElementById("isEmpty_Button");

  //to set all the messages (already done, kinda)
  let errorMessage = document.getElementById("errorMessage");
  let message = document.getElementById("message");
  let input = document.getElementById("input");

  //global variables
  let stack = [];

  //PUSH METHOD ==============================================================
  //add event listener, to detect the button click
  pushButton.addEventListener("click", (e) => {
    //cleaning everything
    getInputAndClearMessages();
    console.log("asdfasdfsadfasdfasdfasd");
    clearAnswer();
    console.log("asdfasdfsadfasdfasdfasd");

    //Displaying answer
    let value = getInput();
    console.log("asdfasdfsadfasdfasdfasd");
    stack.push(value);
    displayStack();

    //notify the user about the update
    displayMessage(
      "A new element has been inserted in the Stack (" + value + ")"
    );
  });

  //POP METHOD ==============================================================
  popButton.addEventListener("click", (e) => {
    //cleaning everything
    getInputAndClearMessages();
    clearAnswer();

    //Displaying answer
    let value = getInput();
    //adding value to the actual stack
    stack.pop();
    displayStack();

    //notify the user about the update
    displayMessage("Popped the top");

    if(stack.length == 0)
    {
      displayMessage("Nothing to be popped off the top!");
    }
  });
  //TOP METHOD ==============================================================
  topButton.addEventListener("click", (e) => {
    //cleaning everything
    getInputAndClearMessages();

    //Displaying answer
    let value = getInput();

    let top = stack[stack.length - 1];

    //adding value to the actual stack
    //stack.top(value);
    highlightElement();

    //notify the user about the update
    displayMessage("Top most element on stack is " + value);

    if(stack.length == 0)
    {
      displayMessage("Nothing to be popped off the top!");
    }
  });
  //EMPTY METHOD ==============================================================
  emptyButton.addEventListener("click", (e) => {
    //cleaning everything
    getInputAndClearMessages();

    if(stack.length == 0)
    {
      displayMessage("Stack is empty!");
    }
    else
    {
      displayMessage("Stack is not empty!");

    }
  });
  function displayMessage(text) {
    message.innerHTML = text;
  }
  function displayErrorMessage(error) {
    errorMessage.innerHTML = error;
  }
  // This function takes, validates and returns the input from the interface
  //casted already as an integer
  function getInputAndClearMessages() {
    errorMessage.innerHTML = "";
    message.innerHTML = "";
  }

  function clearAnswer() {
    let answerContainer = document.getElementById("answerContainer");
    answerContainer.innerHTML = ""; //clear
  }

  function getInput() {
    let input = document.getElementById("myInput").value;
    return validateInput(Number(input));
  }
  function validateInput(value) {
    return Number(value);
  }

  //function to update stack content and display it
  function displayStack() {
    //adding value to the actual stack
    let answerContainer = document.getElementById("answerContainer");
    //populating HTML node with our answer
    for (let index = 0; index < stack.length; index++) {
      let stacKElement = document.createElement("div");
      stacKElement.setAttribute("class", "stackElement");
      stacKElement.setAttribute("id", "stackElement" + index);
      stacKElement.innerHTML = stack[index]; //add
      answerContainer.appendChild(stacKElement);
    }
  }

  function highlightElement(){
    console.log("stackElement" + (stack.length - 1).toString())
    let top = document.getElementById("stackElement" + (stack.length - 1).toString());
    console.log(top)
    top.style.backgroundColor = "#e2a8de";
  }

}, 1000);
