import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {Plato} from '../../model/orden/plato/plato.model';
import {PlatoService} from '../../model/orden/plato/plato.service';


@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit, OnDestroy {

  platos: Plato[];
  private subscription: Subscription;

  constructor(private platoService: PlatoService) { }

  ngOnInit() {
    this.platos = this.platoService.getPlatos();
    this.subscription =  this.platoService.platosChanged
    .subscribe(
      (platos: Plato[]) =>{
        this.platos = platos;
      }
    );
  }

  onEditItem(index: number){
    this.platoService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
