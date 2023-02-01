export class CommandHistory<T> {
  private content: T[];
  /**
   * The pointer is the index of the current item in the history.
   * It is used to get the next and previous item in the history.
   *
   * The pointer values can be:
   * - `-1`: the history is empty
   * - `0 - (history.length - 1)`: the pointer in the history
   */
  private pointer: number;

  get length() {
    return this.content.length;
  }

  constructor() {
    this.content = Array<T>();
    this.pointer = -1;
  }

  /**
   * Returns a boolean indicating if the history is empty
   */
  isEmpty() {
    return this.content.length === 0;
  }

  /**
   * Adds an item to the history and updates the pointer to its index
   */
  push(item: T) {
    this.content.push(item);
    this.pointer = this.content.length - 1;
  }

  /**
   * Removes the last item from the history and returns it. Sets the pointer to the new last item
   */
  pop() {
    const deletedItem = this.content.pop();
    this.pointer = this.content.length - 1;
    return deletedItem;
  }

  /**
   * Returns the next item in the history and updates the pointer to its index
   */
  getNext() {
    const newPointerIsInRange = this.pointer + 1 < this.content.length;

    if (newPointerIsInRange) {
      return this.content[++this.pointer];
    }
  }

  /**
   * Returns the previous item in the history and updates the pointer to its index
   */
  getPrev() {
    const isHistoryEmpty = this.isEmpty();
    if (isHistoryEmpty) return undefined;

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

  setPointer(index: number) {
    if (index < 0 || index >= this.content.length) {
      throw new Error("The specified index is out of range");
    }
    this.pointer = index;
  }

  getPointer() {
    return this.pointer;
  }

  clear() {
    this.content = Array<T>();
    this.pointer = -1;
  }
}
