import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api;
  user_id = sessionStorage.getItem('site_user_storge_name');

  filterForm = this.fb.group({
    start_date: null,
    end_date: null,
    product_id: 0,
    group_id: 0
  });
  action: any;
  product: any;
  group: any;
  id: number = 0;


  load () {
    this.http.get(this.api + 'action?user_id=' + this.user_id).subscribe(res => this.action = res);
    this.http.get(this.api + 'product?user_id=' + this.user_id).subscribe(res => this.product = res);
    this.http.get(this.api + 'group?user_id=' + this.user_id).subscribe(res => this.group = res);
  }

  ngOnInit(): void {
    this.load();
  }


  send() {
    this.http.post(this.api + 'action/filter?user_id=' + this.user_id, this.filterForm.value)
             .subscribe((res) => this.action = res );
  }
}
