import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service'; 
import { CRUDCategory } from '../crudcategory';

@Component({
  selector: 'app-reactive-forms-crud',
  templateUrl: './reactive-forms-crud.component.html',
  styleUrls: []
})
export class ReactiveFormsCrudComponent implements OnInit {
  public salary = ['10000', '20000', '30000', '40000', '50000'];
  public reactiveFormsCRUD!: FormGroup;
  public crudcategories: CRUDCategory[] = [];
  public isEditMode: boolean = false;
  public selectedCategoryIndex: number = -1;
  public isFormVisible: boolean = false;
  public searchText: string = '';
  public isDeleteDisabled: boolean = false;
  public isSaveButtonDisabled: boolean = false;

  constructor(
    public builder: FormBuilder,
    private crudService: CrudService // 注入 CrudService
  ) { }

  ngOnInit() {
    this.reactiveFormsCRUD = this.builder.group({
      'name': ['', Validators.required],
      'country': ['', Validators.required],
      'salary': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
    });

    // 從 CrudService 獲取初始數據
    this.crudService.getCrudCategories().subscribe(categories => {
      this.crudcategories = categories;
    });
  }

  onSubmit() {
    if (this.reactiveFormsCRUD.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.crudService.updateCrudCategory(this.selectedCategoryIndex, this.reactiveFormsCRUD.value); // 使用 CrudService 更新
      this.isEditMode = false;
    } else {
      this.crudService.addCrudCategory(this.reactiveFormsCRUD.value); // 使用 CrudService 添加数据
    }
    this.reactiveFormsCRUD.reset();
  }

  editCategory(index: number) {
    this.isEditMode = true;
    this.isFormVisible = true;
    this.selectedCategoryIndex = index;
    this.reactiveFormsCRUD.patchValue(this.crudcategories[index]);
    this.isDeleteDisabled = true;
    this.isSaveButtonDisabled = false;
  }

  deleteCategory(index: number) {
    if (index === this.selectedCategoryIndex) {
      this.isFormVisible = false;
      this.selectedCategoryIndex = -1;
    }
    this.crudService.deleteCrudCategory(index); // 使用 CrudService 删除
  }

  getTotalDisplayedSalary(): number {
    let total = 0;
    for (let category of this.crudcategories) {
      if (category.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        total += parseInt(category.salary);
      }
    }
    return total;
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.reactiveFormsCRUD.reset();
      const salaryControl = this.reactiveFormsCRUD.get('salary');
      if (salaryControl) {
        salaryControl.setValue('');
      }
      this.isEditMode = false;
      this.isDeleteDisabled = false;
      this.isSaveButtonDisabled = false;
    }
  }

  addMode() {
    this.isFormVisible = true;
    this.reactiveFormsCRUD.reset();
    this.isEditMode = false;
    this.isDeleteDisabled = true;
  }
}
