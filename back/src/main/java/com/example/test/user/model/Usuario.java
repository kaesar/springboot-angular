package com.example.test.user.model;

import javax.persistence.*;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_usuario")
    Long  id;
    String nombre;
    //Long  id_rol;
    String activo;

    @ManyToOne
    @JoinColumn(name="id_rol")
    Rol rol;

    public Usuario() {}

    public Usuario(String nombre, Rol rol, String activo) {
        super();
        this.nombre = nombre;
        this.rol = rol;
        this.activo = activo;
    }

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
/*
    public Long  getId_rol() {
        return rol.id;
    }

    public void setId_rol(Long  id_rol) {
        this.rol.id = id_rol;
    }
*/
    public Rol getRol() {
        return rol;
    }
    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getActivo() {
        return activo;
    }

    public void setActivo(String activo) {
        this.activo = activo;
    }
}
