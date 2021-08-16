package com.example.test.user.controller;

import com.example.test.user.model.Usuario;
import com.example.test.user.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getByIdUsuario(@PathVariable Long id) {
        try {
            return ResponseEntity.of(usuarioService.findById(id));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Usuario> saveUsuario(@RequestBody Usuario usuario) {
        try {
            Optional<Usuario> checked = usuarioService.findByNombre(usuario.getNombre());
            if (checked.isPresent())
                return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();

            Usuario record = usuarioService.save(usuario);
            return ResponseEntity.created(new URI("/usuario/" + record.getId())).body(record);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> saveByIdUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario record = new Usuario();
        record.setId(id);
        record.setNombre(usuario.getNombre());
        record.setRol(usuario.getRol());
        record.setActivo(usuario.getActivo());
        try {
            //Optional<Usuario> checked = usuarioService.findByNombre(usuario.getNombre());
            //if (checked.isPresent())
            //    return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).build();

            usuarioService.save(record);
            return ResponseEntity.created(new URI("/usuario/" + record.getId())).body(record);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUsuario(@PathVariable Long id) {
        try {
            usuarioService.deleteById(id);
            return ResponseEntity.ok(!(usuarioService.findById(id) != null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
