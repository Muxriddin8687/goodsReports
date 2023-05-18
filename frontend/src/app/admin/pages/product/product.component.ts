import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api;
  user_id = sessionStorage.getItem('site_user_storge_name');

  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    group_id: [0, Validators.required],
    unit_id: [0, Validators.required],
    user_id: [this.user_id]
  });
  product: any;
  group: any;
  unit: any;
  id: number = 0;

  load () {
    this.http.get(this.api + 'product?user_id=' + this.user_id).subscribe(res => this.product = res);
    this.http.get(this.api + 'group?user_id=' + this.user_id).subscribe(res => this.group = res);
    this.http.get(this.api + 'unit?user_id=' + this.user_id).subscribe(res => this.unit = res);
  }

  ngOnInit(): void {
    this.load();
  }


  editProduct(id: number) {
    this.id = id;
    this.product.forEach((item: any) => {
      if(item.id == id) {
        this.addForm.patchValue({
          name: item.name,
          group_id: item.group_id,
          unit_id: item.unit_id
        });
      }
    });
  }


  updateProduct() {
    this.http.patch(this.api + 'product/' + this.id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }


  deleteProduct(id: number) {
    this.http.delete(this.api + 'product/' + id).subscribe(() => this.load());
  }


  send() {
    this.http.post(this.api + 'product?user_id=' + this.user_id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }
}
