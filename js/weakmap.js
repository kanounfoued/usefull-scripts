/**
 *
 * Weakmap
 *
 * prevent keys from being garbage collected, as long as you do own the key, you will always have access to the value associated.
 * weakmap is not iterable, it can not be run through to get its values unless you have the keys
 *  you can not use forin, forof foreach map
 *
 *
 * use case
 *  1 you can relate the keys to DOM nodes, and whenever you delete the node, its key should be deleted from the weakmap
 *  for the same exampl, you can attach the attirbutes for that node into weakmap as long as the node keep existing in the DOM
 *
 *  2 determine if an object/list has been modified, by storing its value in first place, and then you have changed it reference it can not be accessed
 *  in the weakmap anymore.
 *
 */

let wm = new WeakMap();

const arr = [];
wm.set(arr, 34);

console.log(wm.has(arr));
