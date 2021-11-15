import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, merge, Observable, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements AfterViewInit {

	displayedColumns: string[] = ['select','created', 'state', 'number', 'title'];
	exampleDatabase:  null |ExampleHttpDatabase ;
	data: GithubIssue[] = [];
  
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
  
	@ViewChild(MatPaginator) paginator: MatPaginator|any;
	@ViewChild(MatSort) sort: MatSort |any;
  
	constructor(private _httpClient: HttpClient) {
		this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

	}
  
	ngAfterViewInit() {
  
	  // If the user changes the sort order, reset back to the first page.
	  this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  
	  merge(this.sort.sortChange, this.paginator.page)
		.pipe(
		  startWith({}),
		  switchMap(() => {
			this.isLoadingResults = true;
			return this.exampleDatabase!.getRepoIssues(
			  this.sort.active,
			  this.sort.direction,
			  this.paginator.pageIndex,
			).pipe(catchError(() => of(null)));
		  }),
		  map(data => {
			// Flip flag to show that loading has finished.
			this.isLoadingResults = false;
			this.isRateLimitReached = data === null;
  
			if (data === null) {
			  return [];
			}
  
			// Only refresh the result length if there is new data. In case of rate
			// limit errors, we do not want to reset the paginator to zero, as that
			// would prevent users from re-triggering requests.
			this.resultsLength = data.total_count;
			return data.items;
		  }),
		)
		.subscribe(data => (this.data = data));
	}
	isAllSelected() {
		//const numSelected = this.selection.selected.length;
		//const numRows = this.dataSource.data.length;
		//return numSelected === numRows;
	  }
	
	  /** Selects all rows if they are not all selected; otherwise clear selection. */
	  masterToggle() {
		//if (this.isAllSelected()) {
		//  this.selection.clear();
		//  return;
		//}
	
		//this.selection.select(...this.dataSource.data);
	  }
	
	  /** The label for the checkbox on the passed row */
	  checkboxLabel(): string {
		  return 'all'
		//if (!row) {
		//  return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		//}
		//return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	  }
  }
  
   interface GithubApi {
	items: GithubIssue[];
	total_count: number;
  }
  
   interface GithubIssue {
	created_at: string;
	number: string;
	state: string;
	title: string;
  }
  
  /** An example database that the data source uses to retrieve data for the table. */
  class ExampleHttpDatabase {
	constructor(private _httpClient: HttpClient) {}
  
	getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
	  const href = 'https://api.github.com/search/issues';
	  const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${
		page + 1
	  }`;
  
	  return this._httpClient.get<GithubApi>(requestUrl);
	}
  }

