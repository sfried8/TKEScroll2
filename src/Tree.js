// Calculate total nodes, max label length
import * as d3 from "d3"
var tree;
const FamilyTree = {
  tree: tree,
  render: function (brothers, center) {

    const ease = d3.easeCubic;
    var node;
    var scale;
    var initialCenterNode;
    var x;
    var y;
    const createNode = function (scroll) {
      const brother = brothers[scroll];
      const node = {
        name: brother.fname + " " + brother.lname,
        children: []
      };
      (brother.littles || []).forEach(
        l =>
          l != scroll && (scroll != 0 || brothers[l].littles)
            ? node.children.push(createNode(+l))
            : null
      );
      if (scroll === center) {
        initialCenterNode = node;
      }
      return node;
    };
    var treeData = createNode(0);
    var totalNodes = 0;
    var margin = { top: 0, right: 0, bottom: 0, left: 0 }
    var width = document.body.clientWidth * 10;
    var height = document.body.clientHeight - 50;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var canvas = d3.select("#tree-container").append("canvas")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    // .call(d3.zoom().on("zoom", function () {
    //   canvas.attr("transform", d3.event.transform)
    // }))
    // .append("g")
    // .attr("transform", "translate("
    //   + margin.left + "," + margin.top + ")");
    var ctx = canvas.node().getContext('2d')
    var customBase = document.createElement('custom');
    var custom = d3.select(customBase);
    var customPathBase = document.createElement('custompath');
    var customPath = d3.select(customPathBase);
    var i = 0,
      duration = 1000,
      root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    // root.children.forEach(collapse);

    update(root);


    function update(source) {
      var nodeSelection = custom.selectAll('custom.node').each(d => { [d.x0, d.y0] = [d.x, d.y] })
      // Assigns the x and y position for the nodes
      var treeData = treemap(root);

      // Compute the new tree layout.
      var treeNodes = treeData.descendants();
      // var links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      treeNodes.forEach(function (d) {
        d.y = d.depth * 180;
        // d.x0 = d.x;
        // d.y0 = d.y;
        // d.x1 = d.x;
        // d.y1 = d.y;

      });

      // ****************** Nodes section ***************************

      // Update the nodes...

      nodeSelection.data(treeNodes, function (d) { return d.id || (d.id = ++i); });
      // nodes.forEach(function (d) {
      //   d.x0 = d.x;
      //   d.y0 = d.y;
      // });
      // Enter any new modes at the parent's previous position.
      var nodeEnter = nodeSelection.enter().append('custom')
        .attr('class', 'node')
      // .each(d => {
      //   d.y0 = source.y;
      //   d.x0 = source.x;
      // })


      // // UPDATE
      // var nodeUpdate = nodeEnter.merge(node).each(d => { d.x1 = d.x; d.y1 = d.y; })

      // // Transition to the proper position for the node
      // nodeUpdate

      //   .attr("x1", d => d.x)
      //   .attr("y1", d => d.y)



      // // Remove any exiting nodes
      // var nodeExit = node.exit().each(d => { d.x1 = source.x1; d.y1 = source.y1; })
      nodeSelection.exit().remove()



      // Toggle children on click.
      window.clickn = function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
      window.nodes = treeNodes
      window.togglenodes = () => {
        click(treeNodes[11])
        click(treeNodes[8])
      };

      draw();
    }
    var start = null;
    function innerDraw(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      const t = Math.min(1, ease(progress / (duration + 100)))
      ctx.clearRect(0, 0, width, height);

      var l = root.links();
      for (let link of l) {

        // const source = d3.select("#" + link.source.id)
        // const target = d3.select("#" + link.target.id)
        // const sX = source.attr("x")
        // const sY = source.attr("y")


        // const pX = target.attr("x")
        // const pY = target.attr("y")
        // ctx.beginPath();
        // ctx.lineWidth = "1"
        // ctx.strokeStyle = "#aaaaaa"
        // ctx.moveTo(sY, sX)
        // ctx.bezierCurveTo((sY + pY) / 2, sX, (sY + pY) / 2, pX, pY, pX)
        // ctx.stroke();

      }
      var elements = custom.selectAll('custom.node');
      // Grab all elements you bound data to in the databind() function.
      // elements.filter((d, i) => i === 7).each((d, i) => console.log(d.x, d.y))
      elements.each(function (d, i) { // For each virtual/custom element...
        // This is each individual element in the loop. 

        const node = d3.select(this)
        ctx.fillStyle = node.attr("fillStyle")
        ctx.lineWidth = "2"
        ctx.strokeStyle = d._children ? "#ff0000" : "#AD2624"
        ctx.beginPath();
        d.x = d.x0 * (1 - t) + d.x1 * t;
        d.y = d.y0 * (1 - t) + d.y1 * t;
        // const x = node.attr("x0") * (1 - t) + node.attr("x1") * t;
        // const y = node.attr("y0") * (1 - t) + node.attr("y1") * t;
        ctx.arc(d.y, d.x, 7, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#222222"
        ctx.fillText(d.data.name, d.y, d.x)

        //   const path = d3.select(this)

        // Here you retrieve the position of the node and apply it to the fillRect ctx function which will fill and paint the square.
      }); // Loop through each element.

      if (progress < duration + 100) {
        requestAnimationFrame(innerDraw)
      }
    }
    var j = 0;
    function draw() {

      start = null;
      requestAnimationFrame(innerDraw);


    }
    // FamilyTree.centerNode(initialCenterNode || root);
  }
};
export default FamilyTree;
