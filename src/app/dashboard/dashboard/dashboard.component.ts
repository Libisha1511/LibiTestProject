// dashboard.component.ts

import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/department.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  departmentList: any[] = [];
  totalDepartment!: number;
  itemsPerPage = 3;
  currentPage = 1;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDashboardList();
  }

  loadDashboardList(): void {
    this.departmentService.getDashboardList().subscribe(
      (data) => {
        this.departmentList = data.data.rows;
        this.totalDepartment = this.departmentList.length;
        console.log('data', data.data.rows);
      },
      (error) => {
        console.error('Error fetching dashboard list:', error);
      }
    );
  }

  getPages(): number[] {
    return Array(Math.ceil(this.totalDepartment / this.itemsPerPage)).fill(0).map((_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get paginatedDashboardList(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalDepartment);
    return this.departmentList.slice(startIndex, endIndex);
  }
}
