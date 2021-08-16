import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewChecked {

  private usuarios: any;
  filter: string;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getAllUsuarios()
  }

  ngAfterViewChecked() {
    if (sessionStorage.getItem('usuario_changed')) {
      sessionStorage.removeItem('usuario_changed');
      this.getAllUsuarios();
    }
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe(res => {
      this.usuarios = res;
    },
    error => console.error(error));
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }
}
