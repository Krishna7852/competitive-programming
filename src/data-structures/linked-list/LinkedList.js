const LinkedListNode = require('./LinkedListNode');
const { compare } = require('../../utils');

class LinkedList {
  constructor(comparator = compare) {
    this.head = null;
    this.tail = null;
    this.comparator = compare;
  }

  /**
   *
   */
  get length() {
    let length = 0;
    let current = this.head;
    while (current !== null) {
      length += 1;
      current = current.next;
    }
    return length;
  }

  /**
   * Adds a value to the beginning/head of the list.
   * @param {*} value
   */
  prepend(value) {
    this.head = new LinkedListNode(value, this.head);
    if (this.tail === null) {
      this.tail = this.head;
    }
    return this;
  }

  /**
   * Adds a value to the end/tail of the list.
   * @param {*} value
   */
  append(value) {
    const node = new LinkedListNode(value);
    if (this.tail === null) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  /**
   * Remove the item from linked list.
   * @param {*} value
   */
  remove(value, comparator = this.comparator) {
    let current = this.head;
    let prev = null;
    while (current !== null) {
      if (comparator(current.value, value) === 0) {
        break;
      }
      prev = current;
      current = current.next;
    }

    //  if value not found.
    if (current === null) {
      return null;
    }

    // if value is head.
    if (current === this.head) {
      return this.removeHead();
    }

    if (current === this.tail) {
      this.tail = prev; // Moving tail to prev node.
      this.tail.next = null; // Removing reference of old tail node.
      return current;
    }

    prev.next = current.next; // Moving pointer to next node.
    current.next = null; // Delete pointer from current.
    return current;
  }

  /**
   * Move head to the next element to the head.
   */
  removeHead() {
    // Only single node or empty node.
    if (this.head === this.tail) {
      const node = this.head;
      this.tail = null;
      this.head = null;
      return node;
    }
    const head = this.head; // head node
    this.head = this.head.next; // shift head to next node
    head.next = null; // remove pointer to next
    return head;
  }

  /**
   * Move tail to the prev element to the tail.
   */
  removeTail() {
    // Only single node or empty node.
    if (this.head === this.tail) {
      const node = this.tail;
      this.tail = null;
      this.head = null;
      return node;
    }

    // More than one node.
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next;
    }
    const node = this.tail;
    this.tail = current;
    this.tail.next = null; // Removing reference.
    return node;
  }

  /**
   *
   * @param {*} value
   */
  find(value, comparator = this.comparator) {
    let current = this.head;
    while (current !== null) {
      if (comparator(current.value, value) === 0) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const array = [];
    let current = this.head;
    while (current !== null) {
      array.push(current);
      current = current.next;
    }
    return array;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  /**
   * Converts an array/paramters to linked list.
   * @param {any} array
   */
  static toLinkedList(...array) {
    return array.reduce((list, item) => {
      list.append(item);
      return list;
    }, new LinkedList());
  }
}

module.exports = LinkedList;
