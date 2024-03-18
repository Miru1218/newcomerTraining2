import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CRUDCategory } from '../crudcategory';

@Component({
  selector: 'app-reactive-forms-crud',
  templateUrl: './reactive-forms-crud.component.html',
  styles: [
  ]
})
export class ReactiveFormsCrudComponent {
  public capacity = ['5人', '10人', '20人', '30人', '40人']
  public meetingRoomForm: FormGroup;
  public crudcategory: CRUDCategory;
  constructor(public builder: FormBuilder) {

    this.crudcategory = new CRUDCategory(
      101, '哥多華', this.capacity[2], false, true);

    this.meetingRoomForm = this.builder.group({
      'id': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      "size": [''], 'projector': [''], 'TV': ['']
    });
  }
  ngOnInit(): void {
    this.meetingRoomForm.setValue(this.meetingRoom);
  }
  onSubmit() {
    this.meetingRoom = this.meetingRoomForm.value;
  }
}
