// const data = require('./stats.json');

const [rootName = '', maxDepthStr = '2'] = process.argv.slice(2);
const maxDepth = parseInt(maxDepthStr, 10) || 0;

const parts = data.nodeParts;
// const metas = data.nodeMetas;

function rebuildTreeWithSize(oldNode, newNode) {
  if (oldNode.children?.length) {
    let size = 0;
    newNode.children = oldNode.children.map((oldChild) => {
      const newChild = { name: oldChild.name, path: (newNode.path ? newNode.path + '/' : '') + oldChild.name };
      size += rebuildTreeWithSize(oldChild, newChild);
      return newChild;
    });
    newNode.size = size;
  } else if (oldNode.uid) {
    const part = parts[oldNode.uid];
    newNode.size = part.renderedLength;
  } else {
    console.log(oldNode);
    throw new Error('invalid data');
  }
  return newNode.size;
}

const root = { name: '', path: '' };
rebuildTreeWithSize(data.tree, root);

function dfsFindNodeByName(node) {
  if (node.name === rootName)
    return node;
  return node.children?.map(dfsFindNodeByName).filter(Boolean)[0];
}

let subRoot = dfsFindNodeByName(root);

console.dir(subRoot);

const outputWidth = Math.round(process.stdout.columns * 0.8);
const totalSize = subRoot.size;

function dfsPrintNodeSize(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const prefix = '├';
  const left = indent + prefix + ' ' + node.path;

  const size = (node.size / 1024).toFixed(1) + 'kb';
  const precent = (node.size / totalSize * 100).toFixed(1) + '%';
  const right = size.padStart(10) + precent.padStart(8);

  const spaces = ' '.repeat(outputWidth - left.length - right.length);
  console.log(left, spaces, right);

  if (depth < maxDepth)
    node.children.sort((node1, node2) => node2.size - node1.size).map((node) => dfsPrintNodeSize(node, depth + 1));
}

dfsPrintNodeSize(subRoot);


