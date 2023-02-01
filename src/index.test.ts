import { describe, it, expect } from "vitest";
import { CommandHistory } from "./index";

describe("isEmpty method", () => {
  it("should be empty when created", () => {
    const history = new CommandHistory();
    expect(history.isEmpty()).toBe(true);
  });

  it("should not be empty when an item is added", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.isEmpty()).toBe(false);
  });

  it("should be empty when the last item is removed", () => {
    const history = new CommandHistory();
    history.push("test");
    history.pop();
    expect(history.isEmpty()).toBe(true);
  });
});

describe("push method", () => {
  it("should add an item ath the end of the history", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.isEmpty()).toBe(false);
  });

  it("should set the pointer to the last item added", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.getPointer()).toBe(0);
  });

  it("should set the pointer to the last item added when there are multiple items", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    expect(history.getPointer()).toBe(1);
  });

  it("should set the pointer to the last item even if it was previously in other position", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.push("test3");
    history.setPointer(1);
    history.push("test4");
    expect(history.getPointer()).toBe(3);
  });
});

describe("clear method", () => {
  it("should clear the history", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.clear();
    expect(history.isEmpty()).toBe(true);
  });

  it("should set the pointer to -1", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.clear();
    expect(history.getPointer()).toBe(-1);
  });
});

describe("getPointer method", () => {
  it("should return -1 when the history is empty", () => {
    const history = new CommandHistory();
    expect(history.getPointer()).toBe(-1);
  });

  it("should return 0 when the history has 1 element", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.getPointer()).toBe(0);
  });

  it("should return 1 when the history has 2 elements and nothing more happened", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    expect(history.getPointer()).toBe(1);
  });

  it("should return -1 when history has been cleared", () => {
    const history = new CommandHistory();
    history.push("test");
    history.pop();
    expect(history.getPointer()).toBe(-1);
  });
});

describe("setPointer method", () => {
  it("should throw an error when the index is out of range", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(() => history.setPointer(1)).toThrowError();
  });

  it("should set the pointer to the specified index (I)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.setPointer(0);
    expect(history.getPointer()).toBe(0);
  });

  it("should set the pointer to the specified index (II)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.push("test3");
    history.setPointer(1);
    expect(history.getPointer()).toBe(1);
  });
});

describe("getCurrent method", () => {
  it("should return undefined when the history is empty", () => {
    const history = new CommandHistory();
    expect(history.getCurrent()).toBe(undefined);
  });

  it("should return the last item when the pointer is at the end", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.getCurrent()).toBe("test");
  });

  it("should return the item at the pointer position", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.setPointer(0);
    expect(history.getCurrent()).toBe("test");
  });

  it("should return the item at the pointer position (II)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.push("test3");
    history.setPointer(1);
    expect(history.getCurrent()).toBe("test2");
  });
});

describe("getNext method", () => {
  it("should return undefined when the history is empty", () => {
    const history = new CommandHistory();
    expect(history.getNext()).toBe(undefined);
  });

  it("should return the item at the next pointer position", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.setPointer(0);
    expect(history.getNext()).toBe("test2");
  });
});

describe("getPrev method", () => {
  it("should return undefined when the history is empty (I)", () => {
    const history = new CommandHistory();
    expect(history.getPrev()).toBe(undefined);
  });

  it("should return undefined when the history is empty (II)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.pop();
    expect(history.getPrev()).toBe(undefined);
  });

  it("should return undefined when the pointer is at the beginning", () => {
    const history = new CommandHistory();
    history.push("test");
    expect(history.getPrev()).toBe(undefined);
  });

  it("should return the item at the (pointer position - 1)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.setPointer(1);
    expect(history.getPrev()).toBe("test");
  });

  it("should move the pointer to a (pointer position - 1)", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.setPointer(1);
    history.getPrev();
    expect(history.getPointer()).toBe(0);
  });
});

describe("pop method", () => {
  it("should remove the last item from the history", () => {
    const history = new CommandHistory();
    history.push("test");
    history.push("test2");
    history.pop();
    expect(history.isEmpty()).toBe(false);
    expect(history.getPrev()).toBe(undefined);
  });

  it("should set the pointer to the last item", () => {
    const history = new CommandHistory();
    history.push("test0");
    history.push("test1");
    history.push("test2");
    history.pop();
    expect(history.getNext()).toBe(undefined);
  });

  it("should return the item that has been removed", () => {
    const history = new CommandHistory();
    history.push("test0");
    history.push("test1");
    history.push("test2");
    expect(history.pop()).toBe("test2");
  });

  it("should return undefined when the history is empty", () => {
    const history = new CommandHistory();
    expect(history.pop()).toBe(undefined);
  });

  it("should set the pointer to -1 when the history is empty", () => {
    const history = new CommandHistory();
    history.push("test0");
    history.pop();
    expect(history.getPointer()).toBe(-1);
  });

  it("should set the pointer to the new last item when the last item has been removed", () => {
    const history = new CommandHistory();
    history.push("test0");
    history.push("test1");
    history.pop();
    expect(history.getPointer()).toBe(0);
  });
});
