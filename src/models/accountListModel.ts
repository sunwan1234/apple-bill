import clone from '@/lib/clone';

const localStorageKeuName = 'accountList';
const accountListModel = {
  data: [] as AccountItem[],

  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeuName) || '[]') as AccountItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeuName, JSON.stringify(this.data));
  },
  create(account: AccountItem){
    const newAccount: AccountItem = clone(account);
    newAccount.createdAt = new Date();
    this.data.push(newAccount);
  }
};

export default accountListModel;