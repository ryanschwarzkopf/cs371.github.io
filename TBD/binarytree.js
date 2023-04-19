class TreeNode {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  
    toString() {
      return String(this.val);
    }
  }
  
  function setBT_String(root, depth = 0) {
    if (!root) {
      return;
    }
  
    setBT_String(root.right, depth + 1);

    answer += " ".repeat(depth * 4) + String(root.val) + "\n";


    setBT_String(root.left, depth + 1);
  }

    
  function root_from_list(lst) {
    function helper(i) {
      if (i >= lst.length || !lst[i]) {
        return null;
      }
      return new TreeNode(lst[i], helper(2 * i + 1), helper(2 * i + 2));
    }
    return helper(0);
  }
//================================================================






  
  //Get values from interface
  let createButton = document.getElementById("createButton");
  let insertButton = document.getElementById("insertButton");
  let searchButton = document.getElementById("searchButton");
  let removeButton = document.getElementById("removeButton");
  let errorMessage = document.getElementById("errorMessage");
  let message = document.getElementById("message");
  let container = document.getElementById("result");
  let input = document.getElementById("input");















  function validateInput(value) {
    return Number(value)
  }

  let answer = "";
  let array = [];
  let arrayIndex = [];

  createButton.addEventListener('click', (e) =>{
    let value = getInputAndClearMessages();
    if (value == null || value == "") {
        displayErrorMessage("Cannot add empty values to a binary tree");
        return;    
    }

    array = [value];
    arrayIndex = [(value, 0)];

    displayTree();
    displayMessage("New binary tree created!");
  })

  insertButton.addEventListener('click', (e) =>{
    let value = getInputAndClearMessages();

    if( array.length == 0 ){
        displayErrorMessage("You need to create a binary tree before you can add elements");
        return;    
    }
    if( array.indexOf(value) >= 0 ){
        displayErrorMessage("You cannot add duplicated elements into an binary tree");
        return;    
    }
    
    array.push(value);
    arrayIndex.push((value, array.length - 1));
    
    displayTree();
    displayMessage("A new node has been inserted in the binary tree ("+value+ ")");
  })
  searchButton.addEventListener('click', (e) =>{
    let valueToSearch = getInputAndClearMessages(); 

    
    let index = array.indexOf(valueToSearch);
    if( array.length == 0 ){
        displayErrorMessage("You need to create a binary tree before you can search an element");
        return;    
    }
    if( index == -1 ){
        displayErrorMessage("The given value " + valueToSearch +" is not in the tree");
        return;    
    }
    
    displayTree();
    displayMessage("The index for " + valueToSearch + " is: "+ index);
  })

  removeButton.addEventListener('click', (e) =>{
    let value =getInputAndClearMessages();


    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }else{
        displayErrorMessage("The cannot delete elements that do not exist in the binary tree");
        return;  
    }
    
    displayTree();
    displayMessage("A node has been removed from the binary tree ("+value+ ")");
  })

  
function displayMessage(text){
    message.innerHTML = text;
}
function displayErrorMessage(error){
    errorMessage.innerHTML = error;
}
function getInputAndClearMessages(){
    errorMessage.innerHTML = "";
    message.innerHTML = "";
    return validateInput(input.value) 
}
function displayTree(){
    let bt = root_from_list(array);
    answer = "";
    setBT_String(bt);
    container.innerHTML = answer;
}
  

  