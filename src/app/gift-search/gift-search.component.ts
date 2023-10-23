import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GiftService } from '../gifts/gift.service';
import { Gift } from '../gift-page/gift-page.component';


@Component({
  selector: 'app-search',
  templateUrl: './gift-search.component.html',
  styleUrls: ['./gift-search.component.css']
})
export class GiftSearchComponent implements OnInit {
  input : string = '';
  gift : any = '';
  // This is the observable 
  searchSubject = new Subject();

  constructor(private giftService : GiftService) {}

  findGift(input : string) : void {
    // This publishes that something happened (in this case, the event of the findGift() method firing, or receiving the input type) 
    // publishing is a way of communicating information/announcing a change in data 
    // subscribing does something with that data (listens for changes)
    // observables are just a mix of publishing and subscribing  
    this.searchSubject.next(input);
  }

  ngOnInit() : void {
    this.searchSubject
    // this is like a setTimeout() method that only sends another request if you search for something different than the previous search 
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe(input => {
      this.giftService.getAllGifts()
      // This means it's listening in for the response ("Subscribe basically used to take some action after event happen. Like if u have used in API call and if u want to perform some action only after response come u can subscribe that call.")
        .subscribe(response => {
          // Remove this in production 
          console.log(response)
          this.gift = response 
        })
    })
  }

}