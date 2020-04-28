import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/training.service';
import { Training } from 'src/app/shared/training.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: TrainingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(emp: Training) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTraining(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }

}
