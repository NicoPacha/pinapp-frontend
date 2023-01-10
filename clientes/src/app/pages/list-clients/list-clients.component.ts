import { Component, OnInit } from '@angular/core';
import { ClientViewModel, ClientWithProbableDeathModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import { ConfiPaginationModel } from 'src/app/util/config-model-pagination';

@Component({
  selector: 'app-analisis-cliente',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css'],
})
export class ListClientsComponent implements OnInit {
  config: ConfiPaginationModel;
  clienteList: ClientViewModel[];
  clientList: ClientWithProbableDeathModel[];
  clients = { data: [] };
  average: number;
  standardDeviation: number
  showData: boolean;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.getClientes();
    this.initPaginationConfig();
    this.getKpiOfClients();
  }

  getClientes() {
    this.clientsService.findAllClientsWithProbableDeath().subscribe({
      next: (resp) => {
        this.clientList =
          this.clients.data = resp
        this.showData = true;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getKpiOfClients() {
    this.clientsService.kpiOfClients().subscribe({
      next: (resp) => {
        this.average = resp.average;
        this.standardDeviation = resp.standardDeviation;
        this.showData = true;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  initPaginationConfig() {
    this.config = this.config
      ? this.config
      : {
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.clients.data.length,
      };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
