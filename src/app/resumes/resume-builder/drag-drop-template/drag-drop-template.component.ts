import { ItemType, EmploymentHistory, Hobbies, Course } from './../item.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() addItem = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<ItemType[]>) {
    moveItemInArray(this.objectList, event.previousIndex, event.currentIndex);
    console.log(this.objectList);
  }

  onAddItem() {
    this.addItem.emit(this.type);
  }

  onDelete(empHistory) {
    console.log(empHistory);
    const index =  this.objectList.indexOf(empHistory);
    if (index !== -1) {
      this.objectList.splice(index, 1);
    }
  }

}
