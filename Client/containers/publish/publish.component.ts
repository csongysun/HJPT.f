import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
import { AppClientService } from 'app-shared';
import { Topic, Category } from 'app-models';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  topic: Topic;
  selectedParentCategory: Category = new Category();
  parentCategories: Array<Category>;
  childCategories: Array<Category>;
  get selectedChildCategories(): Array<Category> {
    return this.childCategories.filter(v => Math.floor(v.id / 100) === this.selectedParentCategory.id);
  }

  @ViewChild('publishForm') publishForm;
  $publishForm: FormData;

  constructor(
    private app: AppClientService,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.app.currentPage = '发布';
    this.app.getCategories().subscribe(categories => {
      // should sort in server-side
      // categories = categories.sort((a, b) => { return a.id < b.id ? -1 : 1; });
      this.parentCategories = [];
      this.childCategories = [];
      categories.forEach(c => {
        if (c.id % 100 === 0) {
          this.parentCategories.push(c);
        } else { this.childCategories.push(c); }
      });
    }, err => {
      this.snackBar.open(err, 'OK');
    });

    this.publishForm.get('');

  }

  publish() {
    this.$publishForm = new FormData(this.publishForm.nativeElement);
  }


}

