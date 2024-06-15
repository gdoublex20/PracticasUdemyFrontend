package com.jesus.backAngular.controllers;

import com.jesus.backAngular.entities.Usuario;
import com.jesus.backAngular.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping("/users")
public class UsuarioController {

    private UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping()
    public ResponseEntity<Iterable<Usuario>> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @PostMapping("/create")
    private ResponseEntity<Usuario> createUser(@RequestBody Usuario newUsuario, UriComponentsBuilder ucb) {
        return usuarioService.createUser(newUsuario, ucb);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Usuario> findByUsername(@PathVariable String username) {
        return usuarioService.findByUserName(username);
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<Usuario> deleteById(@PathVariable Long id) {
        return usuarioService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<Usuario> updateUser(@PathVariable Long id, @RequestBody Usuario updateUsuario){
        return usuarioService.updateUser(id, updateUsuario);
    }
}
