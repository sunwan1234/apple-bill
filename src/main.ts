import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/views/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';


Vue.config.productionTip = false;
// 全局引入nav
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

// record store
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem)=>{
  return recordListModel.create(record)

}


// taglist store
window.tagList = tagListModel.fetch();
window.defaultTagList = tagListModel.getNewTagList();
window.createTag = (tag) => {
  const message = tagListModel.create(tag);
  if (message === 'success') {
    window.alert('创建标签成功');
  } else if (message === 'duplicated') {
    window.alert('标签名重复，无法创建');
  }
  return message;
};

window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};

window.findTag = (type: string) => {
  return window.tagList.filter((item) => item.type === type);
};


new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
