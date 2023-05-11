function init() {
    const $ = go.GraphObject.make;
    myDiagram = $(go.Diagram, "diagramDiv");

    myDiagram.isReadOnly = true;

    myDiagram.grid =
    $(go.Panel, "Grid",
    {
        name: "GRID",
        visible: false,
        gridCellSize: new go.Size(10, 10),
        gridOrigin: new go.Point(0, 0)
    },
        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }),
        $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 5 }),
        $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 1.0, interval: 10 }),
        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }),
        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 5 }),
        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 1.0, interval: 10 })
    );

    myDiagram.grid.visible = true;  // so that this example shows the standard grid
    myDiagram.div.style.background = "white";

    var nodeDataArray = [];
    var linkDataArray = [];
    keyValue = 0;
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    
    myDiagram.nodeTemplate =
        new go.Node("Auto")
        .bind(new go.Binding("location", "loc"))
        .add(new go.Shape("RoundedRectangle", { margin: 5, fill: "white" }))
        .add(new go.TextBlock({ margin: 5 }).bind(new go.Binding("text", "say")));

    myDiagram.linkTemplate =
        new go.Link()
          .add(new go.Shape()
              .bind(new go.Binding("strokeWidth", "", function() { return 1; }))
              .bind(new go.Binding("stroke", "color")))
          .add(new go.Shape()
              .bind(new go.Binding("toArrow", "", function() { return "Standard"; }))
              .bind(new go.Binding("fill", "color"))
              .bind(new go.Binding("stroke", "", function() { return null; })));
      
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
    removeButton.addEventListener("click", function() {
        var inputVal = document.getElementById("myInput").value;
        if (inputVal === null) {
            alert("Invalid input");
            return;
        }
        removeNode(myDiagram, inputVal);
    });
    
    
    var searchButton = document.getElementById("Search_Button");
    searchButton.addEventListener("click", function() {
        var inputVal = document.getElementById("myInput").value;
        if (inputVal === null) {
            alert("Invalid input");
            return;
        }
        searchNode(myDiagram, inputVal, linkDataArray);
    });
} // end init

function addNode(model, input) {
    if(input == "") return; // don't make any empty nodes
    var newNode = { key: keyValue.toString(), say: input.toString(), loc: new go.Point(Math.random() * document.body.offsetWidth - 300, Math.random() * document.documentElement.scrollHeight - 300 ) };
    keyValue += 1;
    model.addNodeData(newNode);
    if(model.nodeDataArray[model.nodeDataArray.length - 2] !== undefined) { // if length is one, don't add a link
        var prevNode = model.nodeDataArray[model.nodeDataArray.length - 2];
        var newLink = { to: newNode.key, from: prevNode.key }
        model.addLinkData(newLink);
    }
}

function removeNode(myDiagram, value) {
    if(myDiagram.model.nodeDataArray.length === 0) return;
    if(searchNode(model, value) === -1) return;
    myDiagram.model.removeNodeData(model.findNodeForKey(searchNode(model, value)));
}

async function searchNode(myDiagram, input) {
    let i = 0;
    // Iterate through the link data array
    myDiagram.links.each(async function(link) {
        myDiagram.model.setDataProperty(link.data, "strokeWidth", 2);
        // Update the model to show the new stroke width
        delay(1000);
        myDiagram.model.setDataProperty(link.data, "strokeWidth", 0);
        if(myDiagram.model.nodeDataArray[i].data.say === input.toString()) return i;
        i++;
    });
    return -1;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }