import * as d3 from "d3"
export default (function () {
    var treemap = d3.tree().separation((a, b) => a.parent == b.parent ? 2 : 4).nodeSize([10, 10]);
    var treeNodes;
    var root;
    function init(brothers) {
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
            return node;
        };
        var brotherData = createNode(0);
        root = d3.hierarchy(brotherData, d => d.children);
        // root.x0 = height / 2;
        // root.y0 = 0;
        treeNodes = refreshTree()
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
                n.x0 = n.removed ? source.x : n.x;
                n.y0 = n.removed ? source.y : n.y;
                n.removed = false;
            })
        }
        treeNodes = treemap(root).descendants();
        treeNodes.forEach(n => {
            n.y1 = n.y = n.x;
            n.x = n.depth * 180;
        })
        return treeNodes;

    }
    function flagForRemoval(n) {
        n.removed = true;
        if (n.children) {
            n.children.forEach(flagForRemoval)
        }
    }
    return { init, flagForRemoval, refreshTree }
})();
