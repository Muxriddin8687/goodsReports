import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-out',
  templateUrl: './out.component.html',
  styleUrls: ['./out.component.scss']
})
export class OutComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api;
  user_id = sessionStorage.getItem('site_user_storge_name');

  product: any;


  formList: any = this.fb.group({
    data: this.fb.array([]),
  });


  get formItem(): FormArray {
    return this.formList.get('data') as FormArray;
  }


  newList(id: number): FormGroup {
    return this.fb.group({
      product_id: id,
      count: 0,
    });
  }


  addForm(id: number) {
    this.formItem.push(this.newList(id));
  }


  addCount(i: number, count: number) {
    if (this.formList.value.data[i]['count'] < count)
      this.formList.value.data[i]['count'] += 1;
  }

  removeCount(i: number) {
    if (this.formList.value.data[i]['count'] > 0)
      this.formList.value.data[i]['count'] -= 1;
  }


  load() {
    this.formList.reset();
    this.http.get(this.api + 'product?user_id=' + this.user_id)
      .subscribe((res: any) => {
        res.forEach((element: any) => this.addForm(element.id));
        this.product = res;
      });
  }


  ngOnInit(): void {
    this.load();
  }


  save() {
    let data = this.formList.value.data
      .filter((item: any) => item.count != 0)
      .map((item: any) => {
        return {
          product_id: item.product_id,
          count: -item.count
        }
      });

    this.http.post(this.api + 'action?user_id=' + this.user_id, data).subscribe((res: any) => this.load());
  }

}
