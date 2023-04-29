// /* //goJS code
//     Areas that will be edited are:
//         nodeDataArray
//         linkDataArray
//         nodeTemplate
//         linkTemplate
// */
// function init() {
//     const $ = go.GraphObject.make;
//     myDiagram = $(go.Diagram, "diagramDiv");
//     var nodeDataArray = [
//         { key: "alpha", color: "lime" },
//         { key: "beta", color: "cyan" }
//     ];
//     var linkDataArray = [
//         { to: "beta", from: "alpha", color: "red"}
//     ];
//     myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
//     myDiagram.nodeTemplate =
//         $(go.Node, "Auto",
//             $(go.Shape, "RoundedRectangle", { fill: "white"},
//                 new go.Binding("fill", "color")
//             ),
//         );
//     myDiagram.linkTemplate =
//         $(go.Link,
//             $(go.Shape, { strokeWidth: 2},
//                 new go.Binding("stroke", "color")
//             ),
//             $(go.Shape, { toArrow: "Standard", stroke: null },
//                 new go.Binding("fill", "color")
//             )

//         );

//     var pushButton = document.getElementById("Push_Button");
//     pushButton.addEventListener("click", 
//         function() {
//             var inputVal = document.getElementById("myInput").value;
//             if (inputVal === null) {
//                 alert("Invalid input");
//                 return;
//             }
//             addNode(myDiagram.model, inputVal, prevInput);
//             prevInput = inputVal;
//         });
//     var popButton = document.getElementById("Pop_Button");
//     popButton.addEventListener("click", removeNode());
//     var topButton = document.getElementById("Top_Button");
//     topButton.addEventListener("click", TODO);
//     var isEmptyButton = document.getElementById("isEmpty_Button");
//     isEmptyButton.addEventListener("click", TODO);
// } // end init

// function addNode(model, input) {
//     var newNode = { key: getNextKey(), text: input.toString() };
//     model.addNodeData(newNode);
//     if(model.length !== 1) {
//         var prevNode = model.nodeDataArray[model.nodeDataArray.length - 2];
//         var newLink = { to: newNode.key, from: prevNode.key }
//         model.addLinkData(newLink);
//     }
//   }

//   function removeNode(model) {
//     model.removeNode();
//   }

//   function getTop() {

//   }

//   function isEmpty() {

//   }


class Stack {
	constructor() {
		this.items = [];
	}

	push(item) {
		this.items.push(item);
	}

	pop() {
		return this.items.pop();
	}

	display(context, x, y, itemHeight) {
		context.fillStyle = "#000";
		context.font = "bold 16px Arial";
		context.textAlign = "center";
		for (let i = 0; i < this.items.length; i++) {
			context.fillText(this.items[i], x, y + (i * itemHeight));
		}
	}

    
}


  //Get values from interface
  let createButton = document.getElementById("createButton");
  let pushButton = document.getElementById("pushButton");
  let popButton = document.getElementById("popButton");
  let topButton = document.getElementById("topButton");
  let emptyButton = document.getElementById("emptyButton");
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
        displayErrorMessage("Cannot add empty values to the Stack");
        return;    
    }

    array = [value];
    arrayIndex = [(value, 0)];

    displayTree();
    displayMessage("New Stack Created!");
  })

  pushButton.addEventListener('click', (e) =>{
    let value = getInputAndClearMessages();

    if( array.length == 0 ){
        displayErrorMessage("You need to create a Stack before you can add elements");
        return;    
    }
    // if( array.indexOf(value) >= 0 ){
    //     displayErrorMessage("You cannot add duplicated elements into an binary tree");
    //     return;    
    // }
    
    array.push(value);
    arrayIndex.push((value, array.length - 1));
    
    displayStack();
    displayMessage("A new element has been inserted in the Stack ("+value+ ")");
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
function displayStack(){
    let bt = root_from_list(array);
    answer = "";
    setBT_String(bt);
    container.innerHTML = answer;
}