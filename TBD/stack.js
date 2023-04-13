/*
    Areas that will be edited are:
        nodeDataArray
        linkDataArray
        nodeTemplate
        linkTemplate
*/
function init() {
    const $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "diagramDiv");
    var nodeDataArray = [
        { key: "alpha", color: "lime" },
        { key: "beta", color: "cyan" }
    ];
    var linkDataArray = [
        { to: "beta", from: "alpha", color: "red"}
    ];
    prevInput = "beta";
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "white"},
                new go.Binding("fill", "color")
            ),
            $(go.TextBlock, "text", 
                new go.Binding("text", "key")
            )
        );
    myDiagram.linkTemplate =
        $(go.Link,
            $(go.Shape, { strokeWidth: 2},
                new go.Binding("stroke", "color")
            ),
            $(go.Shape, { toArrow: "Standard", stroke: null },
                new go.Binding("fill", "color")
            )

        );

    var pushButton = document.getElementById("Push_Button");
    pushButton.addEventListener("click", 
        function() {
            var inputVal = document.getElementById("myInput").value;
            if (inputVal === null) {
                alert("Invalid input");
                return;
            }
            addNode(myDiagram.model, inputVal, prevInput);
            prevInput = inputVal;
        });
    var popButton = document.getElementById("Pop_Button");
    popButton.addEventListener("click", removeNode());
    var topButton = document.getElementById("Top_Button");
    topButton.addEventListener("click", TODO);
    var isEmptyButton = document.getElementById("isEmpty_Button");
    isEmptyButton.addEventListener("click", TODO);
} // end init

function addNode(model, input, prevInput) {
    // Get a reference to the diagram model
     // var model = myDiagram.model;
  
    // Create a new node data object with a unique key and some default properties
    var newNodeData = { key: input.toString() };
    var newLinkData = { to: input.toString(), from: prevInput.toString() }
  
    // Add the new node data object to the model
    if (newNodeData in insertedNodeKeys) {
        
    } else {
        model.addNodeData(newNodeData);
        model.addLinkData(newLinkData);
    }
  }

  function removeNode(model) {
    model.removeNode();
  }

  function getTop() {

  }

  function isEmpty() {

  }