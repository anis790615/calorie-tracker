import ItemCtrl from "./item-ctrl.js";
//  UI controller
const UICtrl = (() => {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  // Public methods
  return {
    populateItemList(items) {
      let html = "";
      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="" class="secondary-content">
            <i class="edit-item material-icons">edit</i>
          </a>
        </li>
        `;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getUISelectors() {
      return UISelectors;
    },
    getItemInput() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="" class="secondary-content">
        <i class="edit-item material-icons">edit</i>
      </a>`;
      // Insert Item
      document.querySelector(UISelectors.itemList).appendChild(li);
    },
    updateListItem(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn nodes into array
      listItems = Array.from(listItems);
      const { id } = listItems.find(
        (listItem) => listItem.getAttribute("id") === `item-${item.id}`
      );

      document.querySelector(
        `#${id}`
      ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="" class="secondary-content">
        <i class="edit-item material-icons">edit</i>
      </a>`;
    },
    deleteListItem(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeAllItems() {
      document.querySelector("#item-list").innerHTML = "";
    },
    clearInput() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.setEditState();
    },
    hideList() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    setEditState() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
  };
})();
export default UICtrl;
