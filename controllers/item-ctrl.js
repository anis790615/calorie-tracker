// Item Controller
import StorageCtrl from "./storage-ctrl.js";

const ItemCtrl = (() => {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  // Data structure / state
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };
  // Public methods
  return {
    logData() {
      return data;
    },
    getItems() {
      return data.items;
    },
    addItem(name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      const caloriesNumber = parseInt(calories, 10);
      // Create new Item
      const newItem = new Item(ID, name, caloriesNumber);
      // Add to items array
      data.items.push(newItem);
      return newItem;
    },
    getItemById(id) {
      return data.items.find((item) => item.id === id);
    },
    updateItem(name, calories) {
      let found = null;
      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = +calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem(itemId) {
      // Get ids
      const itemIndex = data.items.indexOf(
        data.items.find((item) => item.id === itemId)
      );
      data.items.splice(itemIndex, 1);
    },
    clearAllItems() {
      data.items = [];
    },
    setCurrentItem(item) {
      data.currentItem = item;
    },
    getCurrentItem() {
      return data.currentItem;
    },
    getTotalCalories() {
      return data.items
        .map((item) => {
          return +item.calories;
        })
        .reduce((acc, cur) => acc + cur, 0);
    },
  };
})();
export default ItemCtrl;
