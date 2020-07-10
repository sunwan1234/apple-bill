import tagListModel from '@/models/tagListModel';

export default {
  tagList: tagListModel.fetch(),
  defaultTagList: tagListModel.getNewTagList(),
  createTag: (tag) => {
    const message = tagListModel.create(tag);
    if (message === 'success') {
      window.alert('创建标签成功');
    } else if (message === 'duplicated') {
      window.alert('标签名重复，无法创建');
    }
    return message;
  },

  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },

  findTag(type: string) {
    return this.tagList.filter((item) => item.type === type);
  }
};