function init() {
    const $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "diagramDiv");
    var nodeDataArray = [];
    var linkDataArray = [];
    keyValue = 0;
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

    var insertButton = document.getElementById("Insert_Button");
    insertButton.addEventListener("click", 
        function() {
            var inputVal = document.getElementById("myInput").value;
            if (inputVal === null) {
                alert("Invalid input");
                return;
            }
            addNode(myDiagram.model, inputVal);
        });
    var removeButton = document.getElementById("Remove_Button");
    removeButton.addEventListener("click", removeNode(myDiagram.model));
    var searchButton = document.getElementById("Search_Button");
    searchButton.addEventListener("click", function() {
        var inputVal = document.getElementById("myInput").value;
        if (inputVal === null) {
            alert("Invalid input");
            return;
        }
        searchNode(myDiagram, inputVal);
    });
} // end init

function addNode(model, input) {
    if(input == "") return; // don't make any empty nodes
    var newNode = { key: keyValue.toString(), say: input.toString(), loc: "50 50"};
    keyValue += 1;
    model.addNodeData(newNode);
    if(model.length !== 1) {
        var prevNode = model.nodeDataArray[model.nodeDataArray.length - 2];
        var newLink = { to: newNode.key, from: prevNode.key }
        model.addLinkData(newLink);
  }
}

function removeNode(model) {
    if(model.nodeDataArray.length === 0) return;
    model.removeNodeData(model.findNodeForKey());
}

function searchNode(diagram, input) {
    var node = diagram.findNodeForData({ say: input.toString() });
    if(node === null) {console.log(diagram.model.nodeDataArray);}
    if(node !== null) {
        alert("found");
        diagram.model.setDataProperty(node.data, "color", "red");    
    }
}