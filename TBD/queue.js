function init() {
    const $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "diagramDiv");
    var nodeDataArray = [];
    var linkDataArray = [];
    keyValue = 0;
    topKey = 0;
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "white"},
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                new go.Binding("text", "say"))
        );
    myDiagram.linkTemplate =
        $(go.Link,
            $(go.Shape, { strokeWidth: 2},
                new go.Binding("stroke", "color")),
            $(go.Shape, { toArrow: "Standard", stroke: null },
                new go.Binding("fill", "color"))
        );

    var enqueueButton = document.getElementById("Enqueue_Button");
    enqueueButton.addEventListener("click", 
        function() {
            var inputVal = document.getElementById("myInput").value;
            if (inputVal === null) {
                alert("Invalid input");
                return;
            }
            addNode(myDiagram.model, inputVal);
        });
    var dequeueButton = document.getElementById("Dequeue_Button");
    dequeueButton.addEventListener("click", removeNode(myDiagram.model));
    var peekButton = document.getElementById("Peek_Button");
    peekButton.addEventListener("click", TODO);
    var isNullButton = document.getElementById("isNull_Button");
    isNullButton.addEventListener("click", isNull(myDiagram.model));
} // end init

function addNode(model, input) {
    var newNode = { key: keyValue.toString(), say: input.toString() };
    keyValue += 1;
    model.addNodeData(newNode);
    if(model.length !== 1) {
        var prevNode = model.nodeDataArray[model.nodeDataArray.length - 2];
        var newLink = { to: newNode.key, from: prevNode.key }
        model.addLinkData(newLink);
  }
}

function removeNode(model) {
    if(nodeDataArray.length === 0) return;
    model.removeNodeData(model.findNodeForKey(lowestKey));
    lowestKey += 1;
}

function peek() {

}

function isNull(model) {
    alert();
    if(model.length === 0) {
        document.getElementById("isNull_Button").innerHTML = "True";
    } else {
        document.getElementById("isNull_Button").innerHTML = "False";
    }
    window.setTimeout(rewrite, 5000);
}

function rewrite() {
    document.getElementById("isNull_Button").innerHTML = "isNull";
}