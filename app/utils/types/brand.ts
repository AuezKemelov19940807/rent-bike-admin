export interface IModelProps {
  id: number;
  name: string;
}

export interface IBrandProps {
  id: number;
  name: string;
  models: IModelProps[];
}
