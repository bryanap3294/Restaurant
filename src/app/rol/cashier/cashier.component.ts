import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { OrdenService } from '../../model/orden/orden.service';
import { Orden } from '../../model/orden/orden.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Plato } from '../../model/orden/plato/plato.model';
import { PlatoService } from '../../model/orden/plato/plato.service';
import { Subscription } from 'rxjs/Subscription';
import {Response} from '@angular/http';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  id: number;
  editMode = false;
  ordenForm: FormGroup;
  platos: Plato[];
  subscription: Subscription;
  platoSeleccionado: false;
  ordenMonto;
  ordenRegistrada=false;
  ordenes: Orden[];

  constructor(private route: ActivatedRoute,
    private ordenService: OrdenService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private platoService: PlatoService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.initForm();
      }
    )

    if(this.authService.isAuthenticated()){
      this.dataStorageService.getPlatos();
      this.platos = this.platoService.getPlatos();
      this.subscription = this.platoService.platosChanged
        .subscribe(
        (platos: Plato[]) => {
          this.platos = platos;
        }
        );

      this.dataStorageService.getOrdenes();
      this.ordenes = this.ordenService.getOrdenes();
      this.subscription = this.ordenService.ordenChanged
        .subscribe(
        (ordenes: Orden[]) => {
          this.ordenes = ordenes;
        }
        );
    }

    (<FormArray>this.ordenForm.get('platos')).push(
      new FormGroup({
        'plato': new FormControl(null, Validators.required),
        'cantidad': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )

  }

  onSubmit() {
    this.getMonto();
    console.log(this.ordenForm);
    this.ordenService.addOrden(this.ordenForm.value);
    this.dataStorageService.saveOrdenes()
    .subscribe(
      (response: Response) => {
        console.log(response);
        this.ordenRegistrada=true;
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let ordenName = '';

    let ordenPlatos = new FormArray([]);

    this.ordenForm = new FormGroup({
      'nombreCliente': new FormControl(ordenName, Validators.required),
      'monto': new FormControl({value: this.ordenMonto}, Validators.required),
      'platos': ordenPlatos
    });
  }

  onAddPlato() {
    (<FormArray>this.ordenForm.get('platos')).push(
      new FormGroup({
        'plato': new FormControl(null, Validators.required),
        'cantidad': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeletePlato(index: number) {
    (<FormArray>this.ordenForm.get('platos')).removeAt(index);
  }

  getMonto(){
    this.ordenMonto = 0;
    for(let  k of  (<FormArray>this.ordenForm.get('platos')).value){
      this.ordenMonto += k.plato['precio']*(k.cantidad);
    }
    this.ordenForm.get('monto').setValue(this.ordenMonto);
    return this.ordenMonto;
  }

}
