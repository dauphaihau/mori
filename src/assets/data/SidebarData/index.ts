import jsonData from './data.json';

export interface IAdmin {
  title: string;
  href: string;
  icon: string;
  subLinks?: {
    title: string,
    href: string
  }[];
}

export interface ISidebar {
  title: string;
  adminList: IAdmin[];
}

export const data: ISidebar = jsonData;
