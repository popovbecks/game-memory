import { Injectable } from '@angular/core';

@Injectable()
export class PlayServService {
  // public countOpened: number = 0;               //count active(click) images 
  public size: number;
  
  
  

  images:any [] = [                           //images in table
    {
      src: 'assets/0.jpg',
      id: 0
    },
    {
      src: 'assets/1.jpg',
      id: 1
    },
    {
      src: 'assets/2.jpg',
      id: 2
    },
    {
      src: 'assets/3.jpg',
      id: 3
    }

  ];


  public createTable(size) {                     //create double array

    let current = this.createArray(size);
    let currentArray = this.createRandomImage(current);
    let matrix = [[]];
    let count = 0;
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = currentArray[count];
        count++;
      }
    }
    return matrix;
  }

  private createRandomImage(array): any[] {             //random order in array
    return array.sort(function () {
      return 0.5 - Math.random();
    });
  }

  private createArray(size): any[] {                         //create array with img
    let arr = [];
    let count = 0;

    for (let i = 0; i < Math.pow(size, 2) / 2; i++) {
      arr[i] = this.images[count];
      count++;
      if (count >= this.images.length) {
        count = 0;
      }
    }
    let result = arr.concat(arr);

    return result;

  }
  
  
  
  constructor() { }
  private middle:number = 4;
  private big:number = 8;


  
  public getMiddle():number {
    
    return this.middle;
  }
  public getBig():number {
    
    return this.big;
  }
  
  

  
  

}