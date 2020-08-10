import UICtrl from "./controllers/ui-controller.js";
import ItemCtrl from "./controllers/item-ctrl.js";
import StorageCtrl from "./controllers/storage-ctrl.js";

// App controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
  // Load event listeners
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getUISelectors();
    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
    // Disable submit on Enter
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // Edit item click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
    // Back Button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);
    // Clear All Button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItems);
  };
  /*   Functions                 */

  // Add item submit
  const itemAddSubmit = (e) => {
    // Get form input
    const input = UICtrl.getItemInput();
    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add Total to UI
      UICtrl.showTotalCalories(totalCalories);
      // Store in local storage
      StorageCtrl.storeItem(newItem);
      // Clear Input
      UICtrl.clearInput();
    }
    e.preventDefault();
  };
  // Edit item click
  const itemEditClick = (e) => {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      // Get the id
      const id = +listId.split("-")[1];
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };
  // Update Item Submit
  const itemUpdateSubmit = (e) => {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total to UI
    UICtrl.showTotalCalories(totalCalories);
    // Update local Storage
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Delete Item event
  const itemDeleteSubmit = (e) => {
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total to UI
    UICtrl.showTotalCalories(totalCalories);
    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Clear ALl Items
  const clearAllItems = (e) => {
    // Delete All Items  from data structure
    ItemCtrl.clearAllItems();
    //Remove from UI
    UICtrl.removeAllItems();
    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total to UI
    UICtrl.showTotalCalories(totalCalories);
    // Clear All from Storage
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Public methods
  return {
    init() {
      // Clear edit state // set initial state
      UICtrl.clearEditState();
      // Fetch Items
      const items = ItemCtrl.getItems();
      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add Total to UI
      UICtrl.showTotalCalories(totalCalories);
      // Load event Listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();
