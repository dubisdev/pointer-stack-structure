# @dubisdev/pointer-stack-structure

This package implements something similar to a stack, but with a pointer. This is useful when you want to keep a stack of items, but you also want to navigate through the stack.

Use cases:

- Keep track of commands in a terminal (like in a shell)
- A chat history
- List of visited pages in a browser
- Anywhere you want to store a list of items and navigate through them sequentially

## Principles

- The data structure is a simple array of items (type can be defined by the user)
- New items are added at the end of the array.
- The last added item can be accessed using the `peek` method.
- When a new item is added, the pointer is set to that item (the last).
- Navigation is done using a pointer that points to the current item. Youcan use `peek` anytime to get the last item without moving the pointer.
- You can navigate through the history using the `getPrevious` and `getNext` methods or
- Set the pointer to a specific item using the `setPointer` method.

## License

MIT © [David Jiménez](https://dubis.dev)
