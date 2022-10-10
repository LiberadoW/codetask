import { Component } from '@angular/core';
import { GetApiService } from './get-api.service';

type AssignedTo = {
  person_name?: string;
  status?: string;
};

type Data = {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: AssignedTo[];
  status: string;
  priority: string;
};

const filterData = (array: Data[], filter: string) =>
  array.filter((el) =>
    el.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  filter: string = '';
  data: Data[] = [];
  filteredData: Data[] = [];
  tableHeaders: string[] = [
    'WO ID',
    'Description',
    'Received date',
    'Assigned to',
    'Status',
    'Priority',
  ];

  onInput(input: string) {
    this.filter = input;
    this.filteredData = filterData(this.data, this.filter);
  }

  constructor(private api: GetApiService) {}

  ngOnInit() {
    this.api.getData().then((data:any) => {
      this.data = data['response']['data'];
      this.filteredData = data['response']['data'];
    });
  }
}
