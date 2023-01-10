import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClientViewModel } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private clienteCollection: AngularFirestoreCollection<ClientViewModel>;
  clientes: Observable<ClientViewModel>;
  dataEdad = {
    promedio: 0,
    edadMaxima: 0,
    edadMinima: 0,
    cantClientesRegistrados: 0,
    edades: [],
  };

  constructor(private firebase: AngularFirestore) {
    this.clienteCollection = firebase.collection<ClientViewModel>('clientes');
  }

  async saveCliente(clienteForm: ClientViewModel): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.firebase.createId();
        const data = { id, ...clienteForm };
        const result = this.clienteCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async deleteCliente(id: string) {
    return this.firebase.collection('clientes').doc(id).delete();
  }

  async updateCliente(id: string, clienteForm:ClientViewModel){
    return this.firebase.collection('clientes').doc(id).update(clienteForm);
  }

  getClientes() {
    return this.firebase.collection('clientes').snapshotChanges();
  }

  setEstadisticas(clienteList: ClientViewModel[]) {
    let edades = [];
    if (clienteList) {
      clienteList.forEach((element) => {
        edades.push(element.edad);
      });
      this.dataEdad.promedio =
        edades.reduce((acc, val) => acc + val, 0) / edades.length;
      this.dataEdad.edadMaxima = Math.max(...edades);
      this.dataEdad.edadMinima = Math.min(...edades);
      this.dataEdad.cantClientesRegistrados = clienteList.length;
      this.dataEdad.edades = edades;
      return this.dataEdad;
    }
    return this.dataEdad;
  }

  desviacionEstandar() {
    return Math.sqrt(
      this.dataEdad.edades
        .reduce(
          (acc, val) => acc.concat((val - this.dataEdad.promedio) ** 2),
          []
        )
        .reduce((acc, val) => acc + val, 0) /
        (this.dataEdad.edades.length - 1)
    );
  }
}
