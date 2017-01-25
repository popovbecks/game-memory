import { Component, Input } from '@angular/core';
import { PlayServService } from '../play-serv.service'

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [PlayServService]
})
export class PlayComponent {
  @Input()
  public size: number;
  public timer: number = 90;
  public timerId: number;
  public points: number = 0;
  public conditionCards: boolean = false;
  public conditionDisplay: boolean = false;
  public standBy: boolean = true;
  public toolState: boolean = false;
  private conditionDisplayIsWin: boolean = false;
  public countOpened: number = 0;
  public second: number = 1;
  public stopIsShow: boolean = false;
  public startIsShow: boolean = true;


  data: { src: string, id: number }[][];    //our data with image and their id(name)


  public currentOpened: number = 0;            //current opened image

  public getStart(): void {                                  //start when your click on btn "GameStart"
    if (this.size !== undefined) {
      this.startIsShow = false;
      this.stopIsShow = true;
      this.second = 1;
      this.timer = 90;
      clearInterval(this.timerId);
      this.goTime();
      this.data = this.playService.createTable(this.size);
      this.conditionCards = true;
      this.conditionDisplay = false;
      this.standBy = false;
      this.toolState = true;
      this.points = 0;
    } else {
      return;
    }

  }
  public getStop() {
    this.stopIsShow = false;
    this.startIsShow = true;
    this.conditionDisplay = false;
    this.conditionDisplayIsWin = false;
    this.standBy = true;
    this.toolState = false;
    this.conditionCards = false;
    //this.timer = 90;
  }
  constructor(private playService: PlayServService) {
  }

  public currentOpenImages: any[] = [];



  initClick(e) {

    let td = e.target.closest('td');
    if (!td) return;
    let img = td.firstElementChild;
    if (img === this.currentOpenImages[0] || img === this.currentOpenImages[1]) return;

    if (this.currentOpenImages.length === 0) {
      img.classList.add('open');
      this.currentOpenImages.push(img);
    }
    else if (this.currentOpenImages.length === 1) {
      if (this.currentOpenImages[0].id === img.id) {

        this.currentOpenImages[0].parentNode.classList.add('hide');

        img.classList.add('open');
        img.parentNode.classList.add('hide');

        this.countOpened++;
        this.checkCards();
        this.currentOpenImages.length = 0;
        console.log(this.countOpened);
        this.getPoints();

      } else {
        img.classList.add('open');
        this.currentOpenImages.push(img);
      }

    }
    else {
      if (this.currentOpenImages.length === 2) {
        this.currentOpenImages[0].classList.remove('open');
        this.currentOpenImages[1].classList.remove('open');
        this.currentOpenImages.length = 0;
        this.currentOpenImages.push(img);
        img.classList.add('open');
      }
    }


  }
  goTime(): void {
    this.timer -= this.second;
    if (this.timer > 0) {
      this.timerId = setTimeout(this.goTime.bind(this), 1000);
      console.log(this.timerId);
    } else {
      this.timeOut();
    }
  }

  public getPoints(): void {
    this.points++;
  }
  public timeOut(): void {
    clearInterval(this.timerId);

    this.conditionDisplay = true;

    this.conditionCards = false;
  }
  public reload(): void {
    this.conditionDisplay = false;
    this.conditionDisplayIsWin = false;
    this.standBy = true;
    this.toolState = false;
    this.timer = 90;
  }
  public checkCards(): void {
    if (this.countOpened === this.size * 2) {
      this.conditionCards = false;
      this.standBy = true;
      this.conditionDisplayIsWin = true;
      this.toolState = false;
      clearInterval(this.timerId);
    }
  }
}