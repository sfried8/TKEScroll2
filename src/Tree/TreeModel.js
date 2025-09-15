import { hierarchy, tree } from "d3";
import { TYPES } from "../model/Enums";
export default (function () {
  var treemap;
  var treeNodes;
  var root;
  var allnodes = [];
  var nodeWidth = 180;
  function init(people) {
    const createNode = function (id) {
      const brother = people[id];
      const node = {
        name: brother.displayNameWithBadge,
        children: []
      };
      (brother.littlesByTypes(TYPES.ALL)).forEach(l =>
        l.id !== '0'
          ? node.children.push(createNode(l.id))
          : null
      );
      return node;
    };
    var brotherData = createNode('0');
    root = hierarchy(brotherData, d => d.children);
    allnodes.push(...root.descendants());

    const nameLengths = allnodes.map(n => n.data.name.length);
    nameLengths.sort((a, b) => b - a);

    nodeWidth = 12 * nameLengths[0];

    treemap = tree()
      .separation((a, b) => (a.parent == b.parent ? 2 : 4))
      .nodeSize([10, 10]);
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
    if (source && source.children) {
      descendantsFromChildren(source).forEach(n => {
        n.x0 = source.x0;
        n.y0 = source.y0;
        n.expanding = true;
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

  /**
   * Returns list of all node's descendants, excluding node itself
   * @param {HierarchyNode} node
   */
  function descendantsFromChildren(node) {
    if (!node) {
      return [];
    }
    return node.descendants().filter(d => d !== node);
  }
  return {
    init,
    refreshTree,
    allnodes,
    expandAncestors,
    descendantsFromChildren
  };
})();
