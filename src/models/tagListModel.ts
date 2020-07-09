const localStorageKeyName = 'tagList';
type Tag = {
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
}
const tagListModel: TagListModel = {
  defaultData: [
    {svg: 'meal', name: '餐饮', type: '-'},
    {svg: 'shop', name: '购物', type: '-'},
    {svg: 'everyday', name: '日用', type: '-'},
    {svg: 'transport', name: '交通', type: '-'},
    {svg: 'sport2', name: '运动', type: '-'},
    {svg: 'fun', name: '娱乐', type: '-'},
    {svg: 'cloth', name: '服饰', type: '-'},
    {svg: 'pet', name: '宠物', type: '-'},
    {svg: 'in-redpocket', name: '红包', type: '+'},
    {svg: 'in-rent', name: '租金', type: '+'},
    {svg: 'in-gift', name: '礼金', type: '+'},
    {svg: 'in-get', name: '收款', type: '+'},
    {svg: 'in-manage', name: '理财', type: '+'},
    {svg: 'in-annual', name: '年终奖', type: '+'},
    {svg: 'in-other', name: '其他', type: '+'}
  ],
  data:[],
  n: 0,
  newTag: 1,

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
    this.data.push({'svg': 'new-' + this.newTag, 'name': name, 'type': type});
    this.newTag += 1;
    console.log(this.data[this.data.length - 1])
    this.save()
    return 'success'
  }

};

export default tagListModel;