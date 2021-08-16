import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RolService } from '../services/rol.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  dataForm: FormGroup;
  private roles: any;
  public usuario: any;
  private id: string;
  public rol: any;
  
  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      id: '',
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      activo: ['', Validators.required]
    });

    this.rolService.getAllRoles().subscribe(res => {
      this.roles = res;
    },
    error => console.error(error));

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioService.getByIdUsuario(parseInt(this.id)).subscribe(async res => {
      this.usuario = res
      this.rol = this.usuario.rol;
      this.dataForm.setValue({
        id: this.usuario.id,
        nombre: this.usuario.nombre,
        rol: this.usuario.rol,
        activo: this.usuario.activo
      });
    },
    error => { console.error(error) });
  }

  byRol(a, b) {
    return b.id == a || b == a;
  }

  onSubmit() {
    this.usuario = this.dataForm.value;
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || this.usuario.id;
    this.usuarioService.saveUsuario(this.usuario, parseInt(this.id)).subscribe(async res => {
      console.log(res);
      if (res.id) {
        await this.showToast('Usuario guardado!');
        sessionStorage.setItem('usuario_changed', res.id);
        window.history.go(-2);
      }
    },
    error => { console.error(error) });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
