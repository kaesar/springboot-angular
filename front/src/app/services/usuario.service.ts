import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_ENDPOINT = environment.endpoint + 'usuario';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsuarios(): Observable<any> {
    //return this.httpClient.get(this.API_ENDPOINT);
    return this.httpClient.get<Usuarios[]>(this.API_ENDPOINT)
      .pipe(
        tap(Usuario => console.log('Users list received!')),
        catchError(this.gestionaError<Usuarios[]>('Get User', []))
      );
  }

  public getByIdUsuario(id: number): Observable<any> {
    return this.httpClient.get(this.API_ENDPOINT + '/' + id);
  }

  public saveUsuario(usuario: any, id: number = -1): Observable<any> {
    let rol = usuario.rol
    if (typeof(rol) == 'number') {
      usuario.rol = {}
      usuario.rol.id = rol;
    }
    if (id < 0)
      return this.httpClient.post(this.API_ENDPOINT, usuario);
    else
      return this.httpClient.put(this.API_ENDPOINT + '/' + id, usuario);
  }

  public deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete(this.API_ENDPOINT + '/' + id);
  }

  private gestionaError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  } 
}

export class Usuarios {
  id: number;
  nombre: string;
  rol: any;
  activo: string;
}