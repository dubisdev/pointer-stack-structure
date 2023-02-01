export class CommandHistory<T> {
  private content: T[];
  /**
   * The pointer is the index of the current item in the history.
   * It is used to get the next and previous item in the history.
   * The pointer values can be only indexes of the content array (>= -1 && < content.length)
   */
  private pointer: number;

  constructor() {
    this.content = new Array<T>();
    this.pointer = -1;
  }

  isEmpty() {
    return this.content.length === 0;
  }

  /**
   * Adds an item to the history and sets the pointer to it
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

  getNext() {
    const newPointerIsInRange = this.pointer + 1 < this.content.length;

    if (newPointerIsInRange) {
      return this.content[++this.pointer];
    }
  }

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

  getCurrent() {
    return this.content[this.pointer];
  }

  setPointer(index: number) {
    if (index < -1 || index >= this.content.length) {
      throw new Error("The specified index is out of range");
    }
    this.pointer = index;
  }

  getPointer() {
    return this.pointer;
  }
}
