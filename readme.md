# @dubisdev/pointer-stack-structure

This package implements a data structure for the CLI. It can be used in the CLI to store the history of introduced commands.

## Principles

- The data structure is a simple array of items (type can be defined by the user)
- New items are added at the end of the array, so the last item is the most recent one.
- When a new item is added, the pointer is set to that item (the last).
- Navigation is done using a pointer that points to the current item.
- You can navigate through the history using the `getPrevious` and `getNext` methods.
- You can set the pointer to a specific item using the `setPointer` method.

## Isn't this a stack?

It is something similar. This is a stack *with a pointer*. The pointer is used to navigate through the stack. This is useful when you want to navigate through the history of commands, without needing to delete the items that you have already visited.
