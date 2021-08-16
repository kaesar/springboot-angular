import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public usuario: any;
  private id: string;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuarioService.getByIdUsuario(parseInt(this.id)).subscribe(async res => {
      this.usuario = res
    },
    error => { console.error(error) });
  }

  onDelete() {
    this.showConfirm();
  }

  async showConfirm() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirmar acción con usuario',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Remover',
        role: 'destructive',
        icon: 'trash',
        //handler: () => {}
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        //handler: () => {}
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    if (role == 'destructive')
      this.usuarioService.deleteUsuario(parseInt(this.id)).subscribe(async res => {
        await this.showToast('Usuario eliminado!');
        sessionStorage.setItem('usuario_changed', this.id);
        window.history.back();
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
