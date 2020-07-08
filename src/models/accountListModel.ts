const localStorageKeuName = 'accountList';
const accountListModel = {
  data: [] as AccountItem[],
  clone(data: AccountItem[] | AccountItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeuName) || '[]') as AccountItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeuName, JSON.stringify(this.data));
  }
};

export default accountListModel;