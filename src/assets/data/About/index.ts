import jsonData from './data.json';

export interface ILongIntroList {
  title: string
  content: string
  content2: string
  srcImg: string
}

export interface IAbout {
  title: string;
  longIntroList: ILongIntroList[];
}

export const aboutData: IAbout = jsonData;
