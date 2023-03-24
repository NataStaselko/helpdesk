import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/core/service/history.service';
import { HistoryResponce } from '../history-responce';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{
  ticketId: number
  histories: HistoryResponce[] = []; 
  pageNo: number = 1;
  totalItems: number = 0;
  pageSize: number = 0; 

  constructor(private router: Router, private historyService: HistoryService){
    this.ticketId = Number(router.routerState.snapshot.root.firstChild?.params['id'])
  }

  ngOnInit(): void {  
      this.getHistories()
  }

  changePage(value: any){
    this.pageNo = value
    this.getHistories()
  }

  private getHistories(){   
    this.histories = []
    this.historyService.getHistories(this.ticketId, this.pageNo - 1).subscribe({
      next: (resp: any)=>{           
        this.totalItems = resp.totalElements
        this.pageSize = resp.pageSize
        for(let i = 0; i < resp.content.length; i++ ){
          let userName = resp.content[i].userDto.first_name + ' ' + resp.content[i].userDto.last_name
          this.histories.push(
            {date: resp.content[i].date, user: userName, action: resp.content[i].action, description: resp.content[i].description}
          )          
        }
      }
    })
  }  
}


