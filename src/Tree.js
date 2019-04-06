// Calculate total nodes, max label length
import * as d3 from "d3"
var tree;
const FamilyTree = {
  tree: tree,
  render: function (brothers, center) {


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
    var width = document.body.clientWidth;
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

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    function update(source) {

      // Assigns the x and y position for the nodes
      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants();
      var links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) { d.y = d.depth * 180 });

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = custom.selectAll('custom.node')
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('custom')
        .attr('class', 'node')
        .attr("y", source.y0)
        .attr("x", source.x0);
      // })
      // .on('click', click);

      // // Add Circle for the nodes
      // nodeEnter.append('circle')
      //   .attr('class', 'node')
      //   .attr('r', 1e-6)
      //   .style("fill", function (d) {
      //     return d._children ? "lightsteelblue" : "#fff";
      //   });

      // // Add labels for the nodes
      // nodeEnter.append('text')
      //   .attr("dy", ".35em")
      //   .attr("x", function (d) {
      //     return d.children || d._children ? -13 : 13;
      //   })
      //   .attr("text-anchor", function (d) {
      //     return d.children || d._children ? "end" : "start";
      //   })
      //   .text(function (d) { return d.data.name; });

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node)

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("x", d => d.x)
        .attr("y", d => d.y)



      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("x", source.x)
        .attr("y", source.y)

        .remove();

      // On exit reduce the node circles size to 0
      // nodeExit.select('circle')
      //   .attr('r', 1e-6);

      // // On exit reduce the opacity of text labels
      // nodeExit.select('text')
      //   .style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = customPath.selectAll('custompath.link')
        .data(links, function (d) { return d.id; });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('custompath', "custom")
        .attr("class", "link")


      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr("x", d => d.x)
        .attr("y", d => d.y)

      // Remove any exiting links
      var linkExit = link.exit().transition()
        .duration(duration)
        .attr('x', source.x)
        .attr('y', source.y)
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {

        return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
      setTimeout(() => {
        click(root)
      }, 5000);
      draw();
    }
    function innerDraw(paths, elements) {
      ctx.clearRect(0, 0, width, height);

      var paths = customPath.selectAll("custompath.link");
      paths.each(function (d, i) {
        const path = d3.select(this)
        const sX = path.attr("x")
        const sY = path.attr("y")
        const parent = d3.select(d.parent)
        if (parent) {

          const pX = parent.attr("x")
          const pY = parent.attr("y")
          ctx.beginPath();
          ctx.lineWidth = "1"
          ctx.strokeStyle = "#aaaaaa"
          ctx.moveTo(sY, sX)
          ctx.bezierCurveTo((sY + pY) / 2, sX, (sY + pY) / 2, pX, pY, pX)
          ctx.stroke();
        }

      })
      var elements = custom.selectAll('custom.node');
      // Grab all elements you bound data to in the databind() function.
      // elements.filter((d, i) => i === 7).each((d, i) => console.log(d.x, d.y))
      elements.each(function (d, i) { // For each virtual/custom element...
        // This is each individual element in the loop. 
        const node = d3.select(this)
        ctx.lineWidth = "2"
        ctx.strokeStyle = d._children ? "#ff0000" : "#AD2624"
        ctx.fillStyle = "#eeeeee"
        ctx.beginPath();
        ctx.arc(node.attr("y"), node.attr("x"), 7, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#222222"
        ctx.fillText(d.data.name, node.attr("y"), node.attr("x"))
        // Here you retrieve the position of the node and apply it to the fillRect ctx function which will fill and paint the square.
      }); // Loop through each element.

    }
    var j = 0;
    function draw() {
      var t = d3.timer(function (elapsed) {
        j++;
        innerDraw();
        if (elapsed > duration) { t.stop(); };
      });

    }
    // FamilyTree.centerNode(initialCenterNode || root);
  }
};
export default FamilyTree;
