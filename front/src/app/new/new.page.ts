import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { RolService } from '../services/rol.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  dataForm: FormGroup;
  private roles: any;
 
  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.dataForm = this.fb.group({
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      activo: ['S', Validators.required]
    });

    this.rolService.getAllRoles().subscribe(res => {
      this.roles = res;
    },
    error => console.error(error));
  }

  onSubmit() {
    let usuario = this.dataForm.value;
    console.log(this.dataForm.value);
    this.usuarioService.saveUsuario(usuario).subscribe(async res => {
      if (res.id) {
        this.dataForm.reset();
        await this.showToast('Usuario guardado!');
        sessionStorage.setItem('usuario_changed', res.id);
        window.history.back();
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
