import clone from '@/lib/clone';

const localStorageKeuName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],

  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeuName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeuName, JSON.stringify(this.data));
  },
  create(record: RecordItem){
    const newRecord: RecordItem = clone(record);
    newRecord.createdAt = new Date();
    this.data.push(newRecord);
    this.save()
  }
};

export default recordListModel;