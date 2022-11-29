export interface IContext {
  auth: any;
  provider: any;
  db: any;
  ref: Function;
  set: Function;
  onValue: Function;
  push: Function;
  remove: Function;
  update: Function;
}

export interface IBlog {
  desc: string;
  email: string;
  id: string;
  name: string;
  nameOfBlog: string;
  photo: string;
  uid: string;
  notes: any;
}

export interface INotes {
  header: string;
  text: string;
  likes: number;
  dislike: number;
}

export interface INote {
  header: string;
  text: string;
}

export interface IBlogInfo {
  nameOfBlog: string;
  desc: string;
}

export interface ICommentary {
  user: string,
  email: string,
  comment: string
}
