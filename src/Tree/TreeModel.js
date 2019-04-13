import * as d3 from "d3";
export default (function() {
  var treemap;
  // .nodeSize([10, 70]);
  var treeNodes;
  var root;
  var allnodes = [];
  var nodeWidth = 180;
  function init(brothers) {
    const createNode = function(scroll) {
      const brother = brothers[scroll];
      const node = {
        name: brother.fname + " " + brother.lname,
        children: []
      };
      (brother.littles || []).forEach(l =>
        l != scroll && (scroll != 0 || brothers[l].littles)
          ? node.children.push(createNode(+l))
          : null
      );
      return node;
    };
    var brotherData = createNode(0);
    root = d3.hierarchy(brotherData, d => d.children);
    allnodes.push(...root.descendants());
    var longestName = [...allnodes].sort(
      (a, b) => b.data.name.length - a.data.name.length
    )[0];
    nodeWidth = 12 * longestName.data.name.length;
    treemap = d3
      .tree()
      .separation((a, b) => (a.parent == b.parent ? 2 : 4))
      .nodeSize([10, 10]);
    // root.x0 = height / 2;
    // root.y0 = 0;
    treeNodes = refreshTree();
    treeNodes.forEach(n => {
      n.x0 = 0;
      n.y0 = document.body.clientHeight - 50;
      n.x1 = n.x;
      n.y1 = n.y;
    });
    return treeNodes;
  }
  function refreshTree(source) {
    if (treeNodes) {
      treeNodes.forEach(n => {
        n.x0 = n.x;
        n.y0 = n.y;
      });
    }
    treeNodes = treemap(root).descendants();
    console.log(root);
    if (source) {
      console.log(source);
    }
    if (source && source.children) {
      source.descendants().forEach(n => {
        n.x0 = source.x0;
        n.y0 = source.y0;
      });
    }
    treeNodes.forEach(n => {
      n.y1 = n.y = n.x;
      n.x = n.x1 = n.depth * nodeWidth;
    });
    return treeNodes;
  }
  function expandAncestors(name) {
    allnodes
      .find(x => x.data.name === name)
      .ancestors()
      .forEach(d => {
        if (d._children) {
          d.children = d._children;
          d._children = null;
        }
      });
  }

  return { init, refreshTree, allnodes, expandAncestors };
})();
