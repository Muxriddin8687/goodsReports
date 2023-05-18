import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  http = inject(HttpClient);
  api = environment.api + 'product';
  user_id = sessionStorage.getItem('site_user_storge_name');

  product: any;

  load () {
    this.http.get(this.api + '?user_id=' + this.user_id).subscribe(res => this.product = res);
  }

  ngOnInit(): void {
    this.load();
  }

}
