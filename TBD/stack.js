/*
    Areas that will be edited are:
        nodeDataArray
        linkDataArray
        nodeTemplate
        linkTemplate
*/
function init() {
    var $ = go.GraphObject.make;
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
} // end init