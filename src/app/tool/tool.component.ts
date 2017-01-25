import { Component, Output, EventEmitter } from '@angular/core';
import { PlayServService } from '../play-serv.service';


@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
  //providers: [PlayServService]
})
export class ToolComponent {
  
  ngOnInit() {
    
  }
  public size;
  constructor(private playService: PlayServService) { }



   @Output() changeSizeMiddle: EventEmitter<number> = new EventEmitter();
   @Output() changeSizeBig: EventEmitter<number> = new EventEmitter();

  getMiddle() {
    this.size = this.playService.getMiddle();
    this.changeSizeMiddle.emit(this.size);
    
  }
  getBig() {
    this.size = this.playService.getBig();
    this.changeSizeBig.emit(this.size);
    
  }


}