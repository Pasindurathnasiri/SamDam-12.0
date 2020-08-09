import { Component, OnInit,Inject,Optional,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { AccountingService } from '../shared/accounting.service';
import {Transaction} from '../shared/accounting.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-cashbook-hq',
  templateUrl: './cashbook-hq.component.html',
  styleUrls: ['./cashbook-hq.component.css']
})
export class CashbookHqComponent implements OnInit {
  dataSourceTR:MatTableDataSource<Transaction>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  allTransactionsData :any =[];

  displayedColumnsTR:string[] = ['date','tr_id','site','description','bank_debit','bank_credit','cash_debit','cash_credit','balance','action']
  constructor(private dialog:MatDialog,private accService:AccountingService) {
    this.accService.getAllTransactions().subscribe(data=>{
      this.allTransactionsData=data;
      this.dataSourceTR = new MatTableDataSource<Transaction>(this.allTransactionsData);
      setTimeout(()=>{
        this.dataSourceTR.paginator = this.paginator;
      },0)
    })

    
   }

  ngOnInit(): void {
  }

  onAddTransaction(){
    const adddialogConfig =new MatDialogConfig();
    adddialogConfig.disableClose=false;
    adddialogConfig.autoFocus=true;
    adddialogConfig.width="75%";
    adddialogConfig.height="100%";
    this.dialog.open(AddTransactionComponent,adddialogConfig)
  }
}
