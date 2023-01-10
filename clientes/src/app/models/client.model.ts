export interface Client {
  name: string,
  surname: string,
  age: number,
  dateOfBirth: Date
}
export interface ClientModel {
  name: string;
  surname: string;
  age: number;
  dateOfBirth: string;
}

export interface ClientWithProbableDeathModel {
  id: number;
  name: string;
  surname: string;
  age: number;
  dateOfBirth: string;
  probableDeath: number;
}