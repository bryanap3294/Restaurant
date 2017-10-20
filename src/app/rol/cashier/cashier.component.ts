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

  constructor(private route: ActivatedRoute,
    private ordenService: OrdenService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private platoService: PlatoService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
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
    }

    (<FormArray>this.ordenForm.get('platos')).push(
      new FormGroup({
        'nombrePlato': new FormControl(null, Validators.required),
        'precio': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )

  }

  onSubmit() {
    console.log(this.ordenForm);
    if (this.editMode) {
      this.ordenService.updateOrden(this.id, this.ordenForm.value)
    } else {
      this.ordenService.addOrden(this.ordenForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  private initForm() {
    let ordenName = '';
    let ordenMonto;
    let ordenPlatos = new FormArray([]);

    if (this.editMode) {
      const orden = this.ordenService.getOrden(this.id);
      ordenName = orden.nombreCliente;
      ordenMonto = orden.monto;
      if (orden['platos']) {
        for (let plato of orden.platos) {
          ordenPlatos.push(
            new FormGroup({
              'nombrePlato': new FormControl(plato.nombrePlato, Validators.required),
              'precio': new FormControl(plato.precio, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.ordenForm = new FormGroup({
      'nombreCliente': new FormControl(ordenName, Validators.required),
      'monto': new FormControl(ordenMonto, Validators.required),
      'platos': ordenPlatos
    });
  }

  onAddPlato() {
    (<FormArray>this.ordenForm.get('platos')).push(
      new FormGroup({
        'nombrePlato': new FormControl(null, Validators.required),
        'precio': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeletePlato(index: number) {
    (<FormArray>this.ordenForm.get('platos')).removeAt(index);
  }

}
