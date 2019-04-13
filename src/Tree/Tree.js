import * as d3 from "d3";
import TreeModel from "./TreeModel";
var tree;
const FamilyTree = {
  tree: tree,
  render: function(brothers) {
    var treeNodes = [];
    var collapsing = [];
    var margin = { top: 0, right: 0, bottom: 0, left: 0 };
    var width = document.body.clientWidth;
    var height = document.body.clientHeight - 50;

    const dpi = window.devicePixelRatio;
    var canvas = d3
      .select("#tree-container")
      .append("canvas")
      .attr("width", dpi * (width + margin.right + margin.left))
      .attr("height", dpi * (height + margin.top + margin.bottom))
      .style("width", width + margin.right + margin.left + "px")
      .style("height", height + margin.top + margin.bottom + "px");
    var ctx = canvas.node().getContext("2d");
    ctx.scale(dpi, dpi);
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([1 / 4, 4])
      .on("zoom", zoomed)
      .interpolate(d3.interpolate);
    canvas.call(zoomBehavior);

    const clicked = rightclick => _ => {
      const currentZoomTransform = d3.zoomTransform(canvas.node());
      const clickDistance = 26 * currentZoomTransform.k;

      let node;
      let minDistance = Infinity;
      const [clickX, clickY] = currentZoomTransform.invert([
        d3.event.pageX,
        d3.event.pageY - 50
      ]);
      treeNodes.forEach(d => {
        const dy = d.y - clickY;
        const dx = d.x - clickX;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance && distance < clickDistance) {
          minDistance = distance;
          node = d;
        }
      });
      if (node) {
        if (rightclick) {
          d3.event.preventDefault();
        } else {
          centerNode(node);
          clickNode(node);
        }
      }
    };

    canvas.on("click", clicked(false));
    canvas.on("contextmenu", clicked(true));

    function zoomed() {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(d3.event.transform.x, d3.event.transform.y);
      ctx.scale(d3.event.transform.k, d3.event.transform.k);
      draw();
      ctx.restore();
    }

    const centerNode = node => {
      const point = () =>
        d3.zoomIdentity.translate(width / 2 - node.x1, height / 2 - node.y1);
      canvas
        .transition()
        .duration(duration)
        .call(zoomBehavior.transform, point());
    };
    FamilyTree.centerNode = centerNode;
    FamilyTree.findNode = brother => {
      if (!brother) {
        return;
      }
      const name = brother.fname + " " + brother.lname;
      TreeModel.expandAncestors(name);
      update();
      const node = treeNodes.find(x => x.data.name === name);
      if (node) {
        centerNode(node);
      }
    };
    FamilyTree.findByName = name => {
      return (
        treeNodes.find(x => x.data.name === name) ||
        collapsing.find(x => x.data.name === name)
      );
    };
    var duration = 1000;

    var treeNodes = TreeModel.init(brothers);

    const clickNode = function click(d) {
      if (d.children) {
        d.descendants().forEach(n => {
          if (n !== d) {
            n.removed = true;
          }
        });
        collapsing = d.descendants();
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    };
    window.nodes = treeNodes;
    window.animate = animate;
    animate();

    function update(source) {
      collapsing.forEach(n => {
        n.x0 = n.x;
        n.y0 = n.y;
      });
      treeNodes = TreeModel.refreshTree(source);
      collapsing.forEach(n => {
        n.x1 = source.x1;
        n.y1 = source.y1;
      });
      animate();
    }
    FamilyTree.update = update;
    const drawPath = d => {
      if (!d.parent || !d.parent.parent) {
        return;
      }
      const sX = d.x;
      const sY = d.y;

      const pX = d.parent.x;
      const pY = d.parent.y;
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "#aaaaaa";
      ctx.moveTo(sX, sY);
      ctx.bezierCurveTo((sX + pX) / 2, sY, (sX + pX) / 2, pY, pX, pY);
      ctx.stroke();
    };
    const drawNode = (d, alpha = 1) => {
      if (!d.parent) {
        return;
      }
      ctx.fillStyle = d._children
        ? "rgba(255, 137, 135, " + alpha + ")"
        : "rgba(255, 255, 255, " + alpha + ")";
      ctx.lineWidth = "2";
      ctx.strokeStyle = "rgba(173, 38, 36, " + alpha + ")";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(34, 34, 34, " + alpha + ")";
      ctx.textAlign = d.children || d._children ? "end" : "start";
      const xoffset = d.children || d._children ? -13 : 13;
      ctx.font = "12px Arial";
      ctx.fillText(`${d.data.name}`, d.x + xoffset, d.y);
    };
    function draw(animationProgress) {
      ctx.clearRect(0, 0, width, height);
      treeNodes.forEach(drawPath);
      collapsing.forEach(drawPath);

      treeNodes.forEach(d => drawNode(d));
      collapsing.forEach(d => drawNode(d, 1 - animationProgress));
    }

    var start = null;
    function drawStep(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      const t = Math.min(1, d3.easeCubic(progress / (duration + 100)));
      const interpolatePosition = d => {
        d.x = d.x0 * (1 - t) + d.x1 * t;
        d.y = d.y0 * (1 - t) + d.y1 * t;
      };
      treeNodes.forEach(interpolatePosition);
      collapsing.forEach(interpolatePosition);
      const currentZoomTransform = d3.zoomTransform(canvas.node());
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(currentZoomTransform.x, currentZoomTransform.y);
      ctx.scale(currentZoomTransform.k, currentZoomTransform.k);
      draw(t);
      ctx.restore();

      if (progress < duration + 100) {
        requestAnimationFrame(drawStep);
      } else {
        if (collapsing.length) {
          collapsing = [];
          requestAnimationFrame(drawStep);
        }
      }
    }
    var j = 0;
    function animate() {
      start = null;
      requestAnimationFrame(drawStep);
    }
  }
};
window.FamilyTree = FamilyTree;
export default FamilyTree;
