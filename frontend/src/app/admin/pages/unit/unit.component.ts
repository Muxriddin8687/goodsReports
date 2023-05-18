import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  api = environment.api;
  user_id = sessionStorage.getItem('site_user_storge_name');

  addForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    user_id: [this.user_id]
  });

  group: any;
  unit: any;
  id: number = 0;
  showError: boolean = false;

  load () {
    this.http.get(this.api + 'group?user_id=' + this.user_id).subscribe(res => this.group = res);
    this.http.get(this.api + 'unit?user_id=' + this.user_id).subscribe(res => this.unit = res);
  }

  ngOnInit(): void {
    this.load();
  }

  // unit functions
  editUnit(id: number) {
    this.id = id;
    this.unit.forEach((item: any) => {
      if(item.id == id) {
        this.addForm.patchValue({
          name: item.name,
        });
      }
    });
  }


  updateUnit() {
    this.http.patch(this.api + 'unit/' + this.id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }


  deleteUnit(id: number) {
    this.http.delete(this.api + 'unit/' + id).subscribe(
      (res) => this.load(),
      (err) => { this.showError = true; setTimeout(() => this.showError = false, 5000)}
    );
  }

  addUnit() {
    this.http.post(this.api + 'unit?user_id=' + this.user_id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }



  // group functions
  editGroup(id: number) {
    this.id = id;
    this.group.forEach((item: any) => {
      if(item.id == id) {
        this.addForm.patchValue({
          name: item.name,
        });
      }
    });
  }


  updateGroup() {
    this.http.patch(this.api + 'group/' + this.id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }


  deleteGroup(id: number) {
    this.http.delete(this.api + 'group/' + id).subscribe(
      (res) => this.load(),
      (err) => { this.showError = true; setTimeout(() => this.showError = false, 5000)}
    );
  }


  addGroup() {
    this.http.post(this.api + 'group?user_id=' + this.user_id, this.addForm.value)
             .subscribe(() => { this.addForm.reset(); this.load(); });
  }
}
