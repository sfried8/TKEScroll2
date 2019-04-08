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
    var lastClick;
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
    const zoomBehavior = d3.zoom()
      .scaleExtent([1 / 4, 4])
      .on("zoom", zoomed);
    canvas.call(zoomBehavior)
    canvas.on("click", clicked)

    function zoomed() {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(d3.event.transform.x, d3.event.transform.y);
      ctx.scale(d3.event.transform.k, d3.event.transform.k);
      draw()
      ctx.restore();
    }

    function clicked() {
      const currentZoomTransform = d3.zoomTransform(canvas.node())
      const clickDistance = 14 * currentZoomTransform.k

      let node;
      let minDistance = Infinity;
      // let [cy,cx] = currentZoomTransform.apply([d3.event.pageY-50, d3.event.pageX]);
      // lastClick = {x:cx,y:cy};
      treeNodes.forEach((d) => {
        const dy0 = d.x$ - d3.event.pageY + 50
        const dx0 = d.y$ - d3.event.pageX;
        
        const [dx, dy] = currentZoomTransform.apply([dx0, dy0]);
        const distance = Math.sqrt((dx * dx) + (dy * dy));

        // if (distance < d.r) {
        // if (distance < minDistance) {
        if (distance < minDistance && distance < clickDistance) {
          // drawCircles(d);
          minDistance = distance;
          node = d;
        }
      });

      if (node) {
        const point = () => d3.zoomIdentity.translate(width / 2, height / 2).scale(1).translate(-node.y1, -node.x1)
        canvas.transition().duration(duration).call(zoomBehavior.transform, point)
        // zoomBehavior.translateTo(canvas, nx, ny)
        // console.log("translating to ", ny, nx, "from", node.y1, node.x1)
        clickn(node)
      }
      // drawStep(1000)
    }
    var ctx = canvas.node().getContext('2d')

    var duration = 1000,
      root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().separation((a, b) => a.parent == b.parent ? 2 : 4).nodeSize([10, 10]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, d => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    var treeData = treemap(root);
    treeNodes = treeData.descendants();
    treeNodes.forEach(function (d) {
      d.x0 = height / 2;
      d.y0 = 0;
      d.x$ = d.x;
      d.y$ = d.y;
      d.x1 = d.x$;
      d.y1 = d.y$ = d.depth * 180;

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
        d.y1 = d.y$ = d.depth * 180;
      })

      treeNodes.forEach(d => { d.x0 = d.removed ? source.x$ : d.x$; d.y0 = d.removed ? source.y$ : d.y$; d.removed = false; })
      // Compute the new tree layout.
      treeNodes = treemap(root).descendants();

      treeNodes.forEach(function (d) {
        d.x$ = d.x;
        d.y$ = d.y;
        d.y1 = d.y$ = d.depth * 180;
      });
      treeNodes.forEach(d => { d.x1 = d.x$; })

      animate();
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);

      treeNodes.forEach(d => {
        if (!d.parent || !d.parent.parent) {
          return
        }
        const sX = d.x$
        const sY = d.y$

        const pX = d.parent.x$
        const pY = d.parent.y$
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
        if (!d.parent) {
          return
        }
        ctx.fillStyle = "#fff"
        ctx.lineWidth = "2"
        ctx.strokeStyle = d._children ? "#ff0000" : "#AD2624"
        ctx.beginPath();
        // const x = node.attr("x0") * (1 - t) + node.attr("x1") * t;
        // const y = node.attr("y0") * (1 - t) + node.attr("y1") * t;
        ctx.arc(d.y$, d.x$, 7, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#222222"
        ctx.textAlign = d.children || d._children ? "end" : "start";
        const yoffset = d.children || d._children ? -13 : 13;
        ctx.fillText(`${d.data.name} (${d.x$.toFixed(2)},${d.y$.toFixed(2)})`, d.y$ + yoffset, d.x$)

        //   const path = d3.select(this)

        // Here you retrieve the position of the node and apply it to the fillRect ctx function which will fill and paint the square.
      }); // Loop through each element.
      if (lastClick) {
        ctx.fillStyle = "#00ff00"
        ctx.beginPath()
        ctx.arc(lastClick.x,lastClick.y,5,0,2*Math.PI)
        ctx.fill();
      }
    }
    var start = null;
    function drawStep(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      const t = Math.min(1, ease(progress / (duration + 100)))
      treeNodes.forEach(function (d, i) {
        d.x$ = d.x0 * (1 - t) + d.x1 * t;
        d.y$ = d.y0 * (1 - t) + d.y1 * t;
      })
      const currentZoomTransform = d3.zoomTransform(canvas.node());
      // console.log(currentZoomTransform)
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(currentZoomTransform.x, currentZoomTransform.y);
      ctx.scale(currentZoomTransform.k, currentZoomTransform.k);
      draw()
      ctx.restore();

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
