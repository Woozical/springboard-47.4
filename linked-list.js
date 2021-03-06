/** Node: node for a singly linked list. */

class Node {
  constructor(val, next=null) {
    this.val = val;
    this.next = next;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    if (!this.head){
      const n = new Node(val);
      this.head = n;
      this.tail = n;
    } else {
      let temp = this.tail;
      this.tail = new Node(val);
      temp.next = this.tail;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let temp = this.head;
    this.head = new Node(val, temp);
    if (!this.tail) this.tail = this.head;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    // throw error if empty list
    if (this.length < 1) throw new Error;
    
    // traverse list, keep track of previous
    let current = this.head;
    let prev = null;
    while (current.next !== null){
      prev = current;
      current = current.next;
    }
    // set the new tail to be node previous to current tail
    this.tail = prev;
    // remove new tail's reference to the node that was the old tail
    if (this.tail) this.tail.next = null;
    // clean-up if tail was also the head
    this.length--;
    if (this.length === 0) this.head = null;
    return current.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    // throw error if empty list
    if (this.length < 1) throw new Error;

    // store the old head
    const head = this.head;

    // set new head
    this.head = head.next;

    // clean-up if old head was also the tail
    this.length--;
    if (this.length === 0) this.tail = null;

    return head.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length) throw new RangeError
    let current = this.head;
    for (let i = 0; i < idx; i++){
      current = current.next;
    }
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length) throw new RangeError
    let current = this.head;
    for (let i = 0; i < idx; i++){
      current = current.next;
    }
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length) throw new RangeError(`Attempted insert at ${idx}. LinkedList is length ${this.length}`);
    let prev = null;
    let current = this.head;
    for (let i = 0; i < idx; i++){
      prev = current;
      current = current.next;
    }
    if (idx === 0){
      this.head = new Node(val, current);
      if (!this.tail) this.tail = this.head
    } else {
      prev.next = new Node(val, current);
      if (idx === this.length) this.tail = prev.next;
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length) throw new RangeError(`Attempted removal at ${idx}. LinkedList is length ${this.length}`);
    switch (idx){
      case 0:
        // remove from head
        return this.shift();
      case (this.length-1):
        // remove from tail
        return this.pop();
      default:
        // remove from middle
        let prev = null;
        let current = this.head;
        for (let i = 0; i < idx; i++){
          prev = current;
          current = current.next;
        }
        prev.next = current.next;
        this.length--;
        return current.val;
    }
    
  }

  /** average(): return an average of all values in the list */

  average() {
    let sum = 0;
    let current = this.head;
    for (let i = 0; i < this.length; i++){
      sum += current.val;
      current = current.next;
    }
    return this.length ? sum / this.length : 0;
  }
}

module.exports = LinkedList;
