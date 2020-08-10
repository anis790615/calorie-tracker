// Storage Controller
const StorageCtrl = (() => {
  //Public methods
  return {
    getItemsFromStorage() {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }
      return items;
    },
    storeItem(item) {
      let items = this.getItemsFromStorage();
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    },
    updateItemStorage(updatedItem) {
      let items = this.getItemsFromStorage();
      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemFromStorage(id) {
      let items = this.getItemsFromStorage();
      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItemsFromStorage() {
      localStorage.removeItem("items");
    },
  };
})();
export default StorageCtrl;
