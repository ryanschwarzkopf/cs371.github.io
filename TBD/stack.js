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
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "white"},
                new go.Binding("fill", "color")
            ),
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

function addNode(model, input) {
    var newNode = { key: getNextKey(), text: input.toString() };
    model.addNodeData(newNode);
    if(model.length !== 1) {
        var prevNode = model.nodeDataArray[model.nodeDataArray.length - 2];
        var newLink = { to: newNode.key, from: prevNode.key }
        model.addLinkData(newLink);
    }
  }

  function removeNode(model) {
    model.removeNode();
  }

  function getTop() {

  }

  function isEmpty() {

  }