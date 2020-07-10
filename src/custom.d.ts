type RecordItem = {
  type: string;
  tag: string;
  amount: number;
  note: string;
  createdAt?: Date;
}

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
  create: (tag: Tag) => 'success' | 'duplicated'; // 联合类型
  save: () => void;
  saveDefault: () => void;
  newDataId: number;
  newTagList: string[];
  getNewTagList: () => string[];
  remove: (id: string) => boolean;
}

interface Window {
  defaultTagList: string[];
  tagList: Tag[];
  recordList: RecordItem[];
  createTag: (tag: Tag) => 'success' | 'duplicated'; // 联合类型
  removeTag: (id: string) => boolean;
  findTag: (type: string) => Tag[];
}