const defaultData = [
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
];
let n = 0;
const newTagList = [
  'new-1', 'new-2', 'new-3', 'new-4', 'new-5', 'new-6', 'new-7', 'new-8', 'new-9',
  'new-10', 'new-11', 'new-12', 'new-13', 'new-14', 'new-15'
];
let newDataId = 17;
const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    if (n === 0) {
      this.saveDefault();
    }
    n += 1;
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  defaultTagList: [] as string[],
  createTag: function (newTag: Tag) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(newTag.name) >= 0) {
      window.alert('标签名重复，无法创建');
      return 'duplicated';
    }
    this.tagList.push({
      'id': newDataId.toString(),
      'svg': newTag.svg, 'name': newTag.name, 'type': newTag.type
    });
    newDataId += 1;
    console.log(this.tagList[this.tagList.length - 1]);
    this.saveTags();
    window.alert('创建标签成功');
    return 'success';
  },

  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      window.alert('没找到这个标签');
      return false; //没有找到
    } else {
      this.tagList.splice(index, 1);
      this.saveTags();
      window.alert('删除标签成功');
      return true;
    }
  },

  findTag(type: string) {
    return this.tagList.filter((item) => item.type === type);
  },
  saveDefault() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(defaultData));
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  getNewTagList() {
    this.defaultTagList = newTagList
    return newTagList;
  },
};

tagStore.fetchTags();
tagStore.getNewTagList()

export default tagStore;