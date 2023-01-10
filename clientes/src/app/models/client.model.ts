export interface ClientViewModel {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  fechaNacimiento: string;
  fechaPosibleMuerte?: string;
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