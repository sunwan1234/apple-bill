import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex); // 把 store 绑到 Vue.prototype.$store = store

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
const newTagList = [
  'new-1', 'new-2', 'new-3', 'new-4', 'new-5', 'new-6', 'new-7', 'new-8', 'new-9',
  'new-10', 'new-11', 'new-12', 'new-13', 'new-14', 'new-15'
];
let newDataId = 17;
const defaultRecords = [
  {
    amount: '32800',
    createdAt: '2020-07-08T09:34:10.201Z',
    note: '买口红',
    tag: {id: '2', svg: 'shop', name: '购物', type: '-'},
    type: '-'
  },
  {
    amount: '100000',
    createdAt: '2020-07-10T10:42:35.952Z',
    note: '别人送的红包',
    tag: {id: '11', svg: 'in-gift', name: '礼金', type: '+'},
    type: '+'
  },
  {
    amount: '3570',
    createdAt: '2020-07-11T09:35:11.432Z',
    note: '坐滴滴',
    tag: {id: '4', svg: 'transport', name: '交通', type: '-'},
    type: '-',
  },
  {
    amount: '14720',
    createdAt: '2020-07-11T09:35:28.235Z',
    note: '给汪汪买粮',
    tag: {id: '8', svg: 'pet', name: '宠物', type: '-'},
    type: '-',
  },
  {
    amount: '100000',
    createdAt: '2020-07-11T09:35:39.708Z',
    note: '中新股',
    tag: {id: '13', svg: 'in-manage', name: '股票', type: '+'},
    type: '+',
  },
  {
    amount: '25600',
    createdAt: '2020-07-09T12:24:07.868Z',
    note: '基金定投挣钱了',
    tag: {id: '14', svg: 'in-manage2', name: '基金', type: '+'},
    type: '+'
  },


];


const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    defaultTagList: [] as string[],
    createTagResult: '',
    removeTagResult: '',
    outTags: [] as Tag[],
    inTags: [] as Tag[]
  },
  mutations: {
    fetchRecords(state) {
      // window.localStorage.removeItem('recordList')
      const records = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      if (records.length === 0) {
        store.commit('saveDefaultRecords')
      }
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
      },
    saveDefaultRecords(state){
      window.localStorage.setItem('recordList', JSON.stringify(defaultRecords));
    },
    createRecord(state, record: RecordItem) {
      const newRecord: RecordItem = clone(record);
      newRecord.createdAt = new Date().toISOString();
      state.recordList.push(newRecord);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      console.log('----------save record')
      console.log(state.recordList)
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList));
      window.alert('已记好一笔账~');
    },
    saveDefault() {
      window.localStorage.setItem('tagList', JSON.stringify(defaultData));
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    getNewTagList(state) {
      state.defaultTagList = newTagList;
    },
    fetchTags(state) {
      const taglist = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (taglist.length === 0) {
        store.commit('saveDefault');
      }
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, newTag: Tag) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(newTag.name) >= 0) {
        state.createTagResult = 'duplicated';
         window.alert('标签名重复，无法创建');
      }
      state.tagList.push({
        'id': newDataId.toString(),
        'svg': newTag.svg, 'name': newTag.name, 'type': newTag.type
      });
      newDataId += 1;
      console.log(state.tagList[state.tagList.length - 1]);
      store.commit('saveTags');
      state.createTagResult = 'success';
      window.alert('创建标签成功');
    },
    getOutTags(state) {
      state.outTags = state.tagList.filter(item => item.type === '-');
    },
    getInTags(state) {
      state.inTags = state.tagList.filter(item => item.type === '+');
    },
    updateOutTags(state){
      store.commit('fetchTags')
      state.outTags = state.tagList.filter(item => item.type === '-');
    },
    updateInTags(state){
      store.commit('fetchTags')
      state.inTags = state.tagList.filter(item => item.type === '+');
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        window.alert('没找到这个标签');
      } else {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除标签成功');
      }
    },


  },

});

export default store;
