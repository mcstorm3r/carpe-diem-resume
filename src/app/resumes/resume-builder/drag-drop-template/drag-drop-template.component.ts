import { EmploymentHistory, ItemType } from '../item.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drag-drop-template',
  templateUrl: './drag-drop-template.component.html',
  styleUrls: ['./drag-drop-template.component.css']
})
export class DragDropTemplateComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() type: string;
  @Input() objectList: ItemType[];



  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<EmploymentHistory[]>) {
    moveItemInArray(this.objectList, event.previousIndex, event.currentIndex);
  }

  onAddEmploymentHistory() {
    this.objectList.push( new EmploymentHistory('(Not specified)', '', new Date(), new Date(), '', ''));
  }

  onDelete(empHistory) {
    console.log(empHistory);
    const index =  this.objectList.indexOf(empHistory);
    if (index !== -1) {
      this.objectList.splice(index, 1);
    }
  }

}
