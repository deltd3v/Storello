import { Component, OnInit, Output,EventEmitter } from '@angular/core';

/** Delete button emits a custom event, thereafter invoking a database delete */
@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent implements OnInit {

  // delete event is emitted from the btn-component
   @Output() delete= new EventEmitter<boolean>();
   
   shouldDelete:boolean;
   
   constructor() { }
   
   ngOnInit(): void {
    
  }

  prepareDelete(){
    this.shouldDelete = true
  }

  cancelDelete(){
    this.shouldDelete = false
  }

  deleTe(){
    this.delete.emit(true)
    this.shouldDelete = false;
  }
}
