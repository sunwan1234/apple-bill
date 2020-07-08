const localStorageKeuName = 'accountList';
const model = {
  clone(data: AccountItem[] | AccountItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeuName) || '[]') as AccountItem[];
  },
  save(data: AccountItem[]) {
    window.localStorage.setItem(localStorageKeuName, JSON.stringify(data));
  }
};


export default model;