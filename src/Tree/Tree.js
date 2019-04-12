// Calculate total nodes, max label length
import * as d3 from "d3"
import TreeModel from "./TreeModel"
var tree;
const FamilyTree = {
  tree: tree,
  render: function (brothers, center) {

    const ease = d3.easeCubic;

    var lastClick;
    window.treeNodes = [];



    var margin = { top: 0, right: 0, bottom: 0, left: 0 }
    var width = document.body.clientWidth;
    var height = document.body.clientHeight - 50;

    const dpi = window.devicePixelRatio;
    var canvas = d3.select("#tree-container").append("canvas")
      .attr("width", dpi * (width + margin.right + margin.left))
      .attr("height", dpi * (height + margin.top + margin.bottom)).style("width", (width + margin.right + margin.left) + "px").style("height", (height + margin.top + margin.bottom) + "px")
    var ctx = canvas.node().getContext('2d')
    ctx.scale(dpi, dpi)
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
      const [clickX, clickY] = currentZoomTransform.invert([d3.event.pageX, d3.event.pageY - 50])
      treeNodes.forEach((d) => {

        const dy = d.y - clickY;
        const dx = d.x - clickX;

        const distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance < minDistance && distance < clickDistance) {
          minDistance = distance;
          node = d;
        }
      });
      if (node) {
        const point = () => d3.zoomIdentity.translate(width / 2 - node.x1, height / 2 - node.y1)
        canvas.transition().duration(duration).call(zoomBehavior.transform, point)
        clickNode(node)
      }
      // drawStep(1000)
    }


    var duration = 1000


    var treeNodes = TreeModel.init(brothers);

    const clickNode = function click(d) {
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

      treeNodes = TreeModel.refreshTree(source);

      animate();
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);

      treeNodes.forEach(d => {
        if (!d.parent || !d.parent.parent) {
          return
        }
        const sX = d.x
        const sY = d.y

        const pX = d.parent.x
        const pY = d.parent.y
        ctx.beginPath();
        ctx.lineWidth = "1"
        ctx.strokeStyle = "#aaaaaa"
        ctx.moveTo(sX, sY)
        ctx.bezierCurveTo((sX + pX) / 2, sY, (sX + pX) / 2, pY, pX, pY)
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
        ctx.arc(d.x, d.y, 7, 0, 2 * Math.PI)
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#222222"
        ctx.textAlign = d.children || d._children ? "end" : "start";
        const xoffset = d.children || d._children ? -13 : 13;
        ctx.fillText(d.data.name, d.x + xoffset, d.y)

        // Here you retrieve the position of the node and apply it to the fillRect ctx function which will fill and paint the square.
      }); // Loop through each element.
      if (lastClick) {
        ctx.fillStyle = "#00ff00"
        ctx.beginPath()
        ctx.arc(lastClick.x, lastClick.y, 5, 0, 2 * Math.PI)
        ctx.fill();
      }
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
