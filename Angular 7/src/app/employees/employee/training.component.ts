import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/training.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: TrainingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      tID: null,
      TName: '',
      startdate:null,
      enddate:null
    }
  }


  onSubmit(form: NgForm) {
    if (form.value.tID == null)
    {
     this.insertRecord(form);
    }
    else
    {
      this.updateRecord(form);}
  }

  insertRecord(form: NgForm) {
    this.service.postTraining(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putTraining(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.refreshList();
    });

  }

}
