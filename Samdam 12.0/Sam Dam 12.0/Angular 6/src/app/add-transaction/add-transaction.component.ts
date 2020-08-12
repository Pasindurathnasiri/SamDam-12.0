import { Component, OnInit } from '@angular/core';
import {AccountingService} from '../shared/accounting.service';
import { FormControl, FormBuilder, FormGroup ,Validators, NgForm } from '@angular/forms';
import { SiteService } from '../shared/site.service';
import { getMonth } from 'date-fns';

interface Site{
  _id:string;
  site_id:string;
  name: string;
  site: Array<Site>;
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  siteControl = new FormControl('',Validators.required);
  siteFormControl = new FormControl('', Validators.required);
  sites: Site [] = [];
  AllSiteDate:any=[];
  public addTransactionGroup:FormGroup;
  showSucessMessage: boolean;
   serverErrorMessages: string;
  constructor(private formBuilder:FormBuilder,private accService:AccountingService,private siteService:SiteService) { 
   this.addTransactionGroup= this.formBuilder.group({
     dor:[Date],
     site:[],
     month:[],
     tr_id:[],
     description:[],
     bank_credit:[],
     bank_debit:[],
     cash_debit:[],
     cash_credit:[],
   })

   //Get sites
   this.siteService.GetAllSites().subscribe(data =>{
    this.AllSiteDate = data;
    //in here pass sites to mat-select
     setTimeout(()=>{

     },0)
     this.sites = this.AllSiteDate;
  })


  }

  ngOnInit(): void {

  }

  onTransaction(){
    this.addTransactionGroup.value.dor = new Date();
    var c_date = this.addTransactionGroup.value.dor.toLocaleDateString();
    var intmonth = getMonth(this.addTransactionGroup.value.dor);
    var strmonth='';
    
    switch (intmonth) {
      case 0:strmonth="January"
        break;
     case 1:strmonth="February"
        break;
        case 2:strmonth="March"
        break;
        case 3:strmonth="April"
        break;
        case 4:strmonth="May"
        break;
        case 5:strmonth="June"
        break;
        case 6:strmonth="July"
        break;
        case 7:strmonth="August"
        break;
        case 8:strmonth="September"
        break;
        case 9:strmonth="October"
        break;
        case 10:strmonth="November"
        break;
        case 11:strmonth="December"
        break;
        
        
      default:
        break;
    }
    this.addTransactionGroup.value.month = strmonth;
    this.addTransactionGroup.value.dor = c_date;
    this.accService.addTransaction(this.addTransactionGroup.value).subscribe(
      res=>{

      },
      err=>{
        if(err){
          console.log("Transaction Record Adding Failed"+err);
        }else{
          console.log("Something Went Wrong..!");
      
        }
      }
    );
    
  }

  onCancel(){
    
  }

}
