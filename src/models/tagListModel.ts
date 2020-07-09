const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  svg: string;
  name: string;
  type: string;
}
type TagListModel = {
  data: Tag[];
  defaultData: Tag[];
  n: number;
  newTag: number;
  fetch: () => Tag[];
  create: (name: string, type: string) => 'success' | 'duplicated'; // 联合类型
  save: () => void;
  saveDefault: () => void;
  newDataId: number;
}
const tagListModel: TagListModel = {
  defaultData: [
    {id: '1', svg: 'meal', name: '餐饮', type: '-'},
    {id: '2', svg: 'shop', name: '购物', type: '-'},
    {id: '3', svg: 'everyday', name: '日用', type: '-'},
    {id: '4', svg: 'transport', name: '交通', type: '-'},
    {id: '5', svg: 'sport2', name: '运动', type: '-'},
    {id: '6', svg: 'fun', name: '娱乐', type: '-'},
    {id: '7', svg: 'cloth', name: '服饰', type: '-'},
    {id: '8', svg: 'pet', name: '宠物', type: '-'},
    {id: '9', svg: 'in-redpocket', name: '红包', type: '+'},
    {id: '10', svg: 'in-rent', name: '租金', type: '+'},
    {id: '11', svg: 'in-gift', name: '礼金', type: '+'},
    {id: '12', svg: 'in-get', name: '收款', type: '+'},
    {id: '13', svg: 'in-manage', name: '股票', type: '+'},
    {id: '14', svg: 'in-manage2', name: '基金', type: '+'},
    {id: '15', svg: 'in-annual', name: '年终奖', type: '+'},
    {id: '16', svg: 'in-other', name: '其他', type: '+'}
  ],
  data: [],
  n: 0,
  newTag: 1,
  newDataId: 17,

  fetch() {
    if (this.n === 0) {
      this.saveDefault();
    }
    this.n += 1;
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  saveDefault() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.defaultData));
  },
  create(name: string, type: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({'id': this.newDataId.toString(),'svg': 'new-' + this.newTag, 'name': name, 'type': type});
    this.newTag += 1;
    this.newDataId += 1
    console.log(this.data[this.data.length - 1]);
    this.save();
    return 'success';
  },
  // remove(id: string) {
  //
  // }

};

export default tagListModel;