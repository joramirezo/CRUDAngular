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
    const $datos = await this.db
      .table('usuarios')
      .where('nombre')
      .equals(datos.value.nombre)
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
    return $datos;
  }

  estaAutenticado() {
    return this.datosUsuario.sesion;
  }
}
