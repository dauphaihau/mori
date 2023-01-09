import jsonData from './data.json';

export interface IState {
  country: string
  states: string[]
}

export interface IStates {
  title: string;
  list: IState[];
}

export const statesData: IStates = jsonData;
