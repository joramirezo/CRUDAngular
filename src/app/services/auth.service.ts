import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { NgForm } from '@angular/forms';
import { Usuario } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private db: DbService) {}

  datosUsuario: Usuario = {
    nombre: '',
    correo: '',
    password: '',
    sesion: false,
  };

  async getLogin(datos: NgForm) {
    try {
      const $datos = await this.db
        .table('usuarios')
        .where('nombre')
        .equals(datos.value.usuario)
        .toArray();
      if (!$datos.length) {
        console.log('Usuario no encontrado');
        return false;
      } else {
        const user = $datos[0];
        if (user.password === datos.value.password) {
          try {
            await this.db.table('usuarios').update(user.id, { sesion: true });
            this.datosUsuario = user;
            this.datosUsuario.sesion = true;
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
        } else {
          console.log('Contraseña incorrecta');
          return false;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    // return $datos;
  }
  async getLogout(idUsuario: number): Promise<void> {
    await this.db.table('usuarios').update(idUsuario, { sesion: false });
    this.datosUsuario.sesion = false;
  }

  estaAutenticado() {
    return this.datosUsuario.sesion;
  }
}
