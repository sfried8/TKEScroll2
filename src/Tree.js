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
    window.treeNodes = [];
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

    canvas.call(d3.zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed));

    function zoomed() {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(d3.event.transform.x, d3.event.transform.y);
      ctx.scale(d3.event.transform.k, d3.event.transform.k);
      draw()
      ctx.restore();
    }
    // .call(d3.zoom().on("zoom", function () {
    //   canvas.attr("transform", d3.event.transform)
    // }))
    // .append("g")
    // .attr("transform", "translate("
    //   + margin.left + "," + margin.top + ")");
    var ctx = canvas.node().getContext('2d')

    var i = 0,
      duration = 1000,
      root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function (d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    var treeData = treemap(root);
    treeNodes = treeData.descendants();
    treeNodes.forEach(function (d) {
      d.x0 = height / 2;
      d.y0 = 0;
      d.x1 = d.x;
      d.y1 = d.y = d.depth * 90;

    });
    window.clickn = function click(d) {
      if (d.children) {
        d.children.forEach(flagForRemoval)
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
    window.nodes = treeNodes
    // Collapse after the second level
    // root.children.forEach(collapse);

    // update(root);
    animate();

    function flagForRemoval(n) {
      n.removed = true;
      if (n.children) {
        n.children.forEach(flagForRemoval)
      }
    }

    function update(source) {
      // Assigns the x and y position for the nodes
      treeNodes.forEach(function (d) {
        d.y1 = d.y = d.depth * 90;
      })
      //   if (!d.x0) {
      //     d.x0 = source.x;
      //     d.y0 = source.y0 || source.y;
      //   } else {
      //     d.x0 = d.x || d.x0; d.y0 = d.y || d.y0;
      //   }
      //   //   // d.x0 = d.x;
      //   //   // d.y0 = d.y;
      //   //   // d.x1 = d.x;
      //   //   // d.y1 = d.y;

      // });
      treeNodes.forEach(d => { d.x0 = d.removed ? source.x : d.x; d.y0 = d.removed ? source.y : d.y; d.removed = false; })
      // Compute the new tree layout.
      treeNodes = treemap(root).descendants();
      // var links = treeData.descendants().slice(1);

      treeNodes.forEach(function (d) {
        d.y1 = d.y = d.depth * 90;
        // if (!d.x0) {
        //   d.x0 = source.x;
        //   d.y0 = source.y;
        // }
        //   // d.x0 = d.x;
        //   // d.y0 = d.y;
        //   // d.x1 = d.x;
        //   // d.y1 = d.y;

      });
      treeNodes.forEach(d => { d.x1 = d.x; })
      // Normalize for fixed-depth.





      // Toggle children on click.



      animate();
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);

      treeNodes.forEach(d => {
        if (!d.parent) {
          return
        }
        const sX = d.x
        const sY = d.y

        const pX = d.parent.x
        const pY = d.parent.y
        ctx.beginPath();
        ctx.lineWidth = "1"
        ctx.strokeStyle = "#aaaaaa"
        ctx.moveTo(sY, sX)
        ctx.bezierCurveTo((sY + pY) / 2, sX, (sY + pY) / 2, pX, pY, pX)
        ctx.stroke();
      })
      // var elements = custom.selectAll('custom.node');
      // Grab all elements you bound data to in the databind() function.
      // elements.filter((d, i) => i === 7).each((d, i) => console.log(d.x, d.y))
      treeNodes.forEach(function (d, i) { // For each virtual/custom element...
        // This is each individual element in the loop. 
        // const node = d3.select(this)
        ctx.fillStyle = "#eee"
        ctx.lineWidth = "2"
        ctx.strokeStyle = d._children ? "#ff0000" : "#AD2624"
        ctx.beginPath();
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
    }
    var start = null;
    function drawStep(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      const t = Math.min(1, ease(progress / (duration + 100)))
      treeNodes.forEach(function (d, i) {
        d.x = d.x0 * (1 - t) + d.x1 * t;
        d.y = d.y0 * (1 - t) + d.y1 * t;
      })
      draw()

      if (progress < duration + 100) {
        requestAnimationFrame(drawStep)
      }
    }
    var j = 0;
    function animate() {

      start = null;
      requestAnimationFrame(drawStep);


    }
    // FamilyTree.centerNode(initialCenterNode || root);
  }
};
export default FamilyTree;
