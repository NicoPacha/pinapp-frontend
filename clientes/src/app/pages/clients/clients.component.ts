import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ClientModel, ClientWithProbableDeathModel } from 'src/app/models/client.model';
import { ConfiPaginationModel } from 'src/app/util/config-model-pagination';
import { Alpha } from 'src/app/validators/alpha-validator';
import { Required } from 'src/app/validators/required-validator';
import Swal from 'sweetalert2';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clienteForm: FormGroup;
  initialState: ClientModel;
  clientList: ClientWithProbableDeathModel[];
  clients = { count: 10, data: [] };
  config: ConfiPaginationModel;
  showData: boolean;
  desviacionEstandar: number;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.initialState = this.initialState
      ? this.initialState
      : {
        name: '',
        surname: '',
        age: null,
        dateOfBirth: '',
      };
    const { name, surname, age, dateOfBirth } = this.initialState;

    this.clienteForm = this.fb.group({
      name: [name, [Required('*El nombre es requerido'), Alpha()]],
      surname: [surname, [Required('*El apellido es requerido'), Alpha()]],
      age: [age, [Required('*La edad es requerida')]],
      dateOfBirth: [
        dateOfBirth,
        [Required('*La fecha de nacimiento es requerida')],
      ],
    });
  }

  async createCliente(): Promise<void> {
    try {
      const formValue = this.clienteForm.value;
      formValue.dateOfBirth = this.convertDate(formValue.dateOfBirth);
      this.clientsService.saveClient(formValue).subscribe({
        complete: () => Swal.fire('Cliente creado con exito!', '', 'success')
        , error: (e) => Swal.fire('No se ha podido crear el cliente!', '', 'error')
      })
      this.clienteForm.reset();
    } catch (error) {
      console.error(error)
    }
  }

  submitCliente(formDirective: FormGroupDirective) {
    if (this.clienteForm.valid) {
      this.createCliente();
      formDirective.resetForm();
    } else {
      Swal.fire(
        'Ocurrio un error!',
        'Verifique los datos ingresados',
        'error'
      );
    }
  }

  refreshForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
  }

  convertDate(str): string {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join('-');
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError) {
      return control.errors['message'];
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  get name(): AbstractControl {
    return this.clienteForm.get('name');
  }

  get surname(): AbstractControl {
    return this.clienteForm.get('surname');
  }

  get age(): AbstractControl {
    return this.clienteForm.get('age');
  }

  get dateOfBirth(): AbstractControl {
    return this.clienteForm.get('dateOfBirth');
  }
}
