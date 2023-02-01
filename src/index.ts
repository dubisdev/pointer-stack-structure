export class PointerStack<T> {
  private content: T[];
  /**
   * The pointer is the index of the current item in the stack.
   * It is used to get the next and previous item in the stack.
   *
   * The pointer values can be:
   * - `-1`: the stack is empty
   * - `0 - (stack.size - 1)`: the pointer in the stack
   */
  private pointer: number;

  constructor() {
    this.content = Array<T>();
    this.pointer = -1;
  }

  /**
   * Return the number of items in the stack
   */
  get size() {
    return this.content.length;
  }

  /**
   * Returns a boolean indicating if the stack is empty
   */
  isEmpty() {
    return this.content.length === 0;
  }

  /**
   * Adds an item to the stack and updates the pointer to its index
   */
  push(item: T) {
    this.content.push(item);
    this.pointer = this.content.length - 1;
  }

  /**
   * Removes the most recent item from the stack and returns it. Sets the pointer to the new more recent item
   */
  pop() {
    const deletedItem = this.content.pop();
    this.pointer = this.content.length - 1;
    return deletedItem;
  }

  /**
   * Returns the next item in the stack and updates the pointer to its index
   */
  getNext() {
    const newPointerIsInRange = this.pointer + 1 < this.content.length;

    if (newPointerIsInRange) {
      return this.content[++this.pointer];
    }
  }

  /**
   * Returns the previous item in the stack and updates the pointer to its index
   */
  getPrev() {
    const isStackEmpty = this.isEmpty();
    if (isStackEmpty) return undefined;

    const newPointer = this.pointer - 1;

    const newPointerIsInRange =
      newPointer >= 0 && newPointer < this.content.length;

    if (newPointerIsInRange) {
      return this.content[--this.pointer];
    }
  }

  /**
   * Returns the item at the pointer position
   */
  getCurrent() {
    return this.content[this.pointer];
  }

  /**
   * Sets the pointer to the specified index
   */
  setPointer(index: number) {
    if (index < 0 || index >= this.content.length) {
      throw new Error("The specified index is out of range");
    }
    this.pointer = index;
  }

  /**
   * Returns the pointer position
   */
  getPointer() {
    return this.pointer;
  }

  /**
   * Returns the most recent added item
   */
  peek() {
    return this.content[this.content.length - 1];
  }

  /**
   * Clears the stack
   */
  clear() {
    this.content = Array<T>();
    this.pointer = -1;
  }
}
