const Queue = require('../../queue/Queue');
class BinaryTreeNode {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }

  /**
   * Height of a node is considered as maximum depth. Maximum number of nodes from root to leaf node.
   * Height of root node is considered as 1.
   * Note: In some books, height is defined as longest path i.e. number of edges. In that case height
   * of root will be zero. Below code does not consider edges.
   *
   * @readonly
   * @memberof BinaryTreeNode
   */
  get height() {
    const lHeight = this.left !== null ? this.left.height : 0;
    const rHeight = this.right !== null ? this.right.height : 0;
    return Math.max(lHeight, rHeight) + 1; // +1 for height of current node.
  }

  /**
   * Returns the minium height of the node.
   *
   * @returns height in number.
   * @memberof BinaryTreeNode
   */
  minHeight() {
    if (this.isLeaf()) {
      return 1;
    }
    if (this.left === null) {
      return this.right.minHeight() + 1;
    }
    if (this.right === null) {
      return this.left.minHeight() + 1;
    }
    return Math.min(this.left.minHeight(), this.right.minHeight()) + 1;
  }

  /**
   * Returns true if node is leaf node.
   *
   * @returns boolean
   * @memberof BinaryTreeNode
   */
  isLeaf() {
    return this.left === null && this.right === null;
  }

  /**
   * Checks if tree node is balanced or not.
   *
   * @returns true if node is balanced.
   * @memberof BinaryTreeNode
   */
  isBalanced() {
    if (this.isLeaf()) {
      return true;
    }

    if (this.left === null) {
      return this.right.height <= 1;
    }

    if (this.right === null) {
      return this.left.height <= 1;
    }
    return Math.abs(this.left.height - this.right.height) <= 1;
  }

  /**
   * Converts the value to binary tree node.
   *
   * @static
   * @param {*} value
   * @returns BinaryTreeNode.
   * @memberof BinaryTreeNode
   */
  static toBinaryTreeNode(value) {
    return new BinaryTreeNode(value);
  }

  /**
   *
   * @param {BinaryTreeNode} node
   */
  setLeft(node) {
    // TODO: Add parents logic when we add parent reference.
    this.left = node;
    return this;
  }

  /**
   *
   * @param {BinaryTreeNode} node
   */
  setRight(node) {
    // TODO: Add parents logic when we add parent reference.
    this.right = node;
    return this;
  }

  /**
   * Returns true if node contains value.
   * @param {*} value
   */
  contains(value) {
    const queue = new Queue();
    queue.enqueue(this);
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (node.value === value) {
        return true;
      }
      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
    }
    return false;
  }

  /**
   * Traverse a tree in Level order that is BFS.
   * @return {Array}
   */
  traverseLevelOrder() {
    const array = [];
    const queue = new Queue();
    queue.enqueue(this);
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      array.push(node.value);
      if (node.left !== null) {
        queue.enqueue(node.left);
      }
      if (node.right !== null) {
        queue.enqueue(node.right);
      }
    }
    return array;
  }

  /**
   *
   *
   * @returns {Array}
   */
  traverseInOrder() {
    const values = [];
    if (this.left) {
      values.push(...this.left.traverseInOrder());
    }
    values.push(this.value);
    if (this.right) {
      values.push(...this.right.traverseInOrder());
    }
    return values;
  }

  /**
   *
   *
   * @returns {Array}
   */
  traversePreOrder() {
    const values = [];
    values.push(this.value);
    if (this.left) {
      values.push(...this.left.traversePreOrder());
    }
    if (this.right) {
      values.push(...this.right.traversePreOrder());
    }
    return values;
  }

  /**
   *
   *
   * @returns {Array}
   */
  traversePostOrder() {
    const values = [];
    if (this.left) {
      values.push(...this.left.traversePostOrder());
    }
    if (this.right) {
      values.push(...this.right.traversePostOrder());
    }
    values.push(this.value);
    return values;
  }
}

module.exports = BinaryTreeNode;
