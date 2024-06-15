package com.jesus.backAngular.services;

import com.jesus.backAngular.entities.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

public interface UsuarioService {

    ResponseEntity<Iterable<Usuario>> findAll();

    ResponseEntity<Usuario> findById(Long id);

    ResponseEntity<Usuario> findByUserName(String username);

    ResponseEntity<Usuario> deleteById(Long id);

    ResponseEntity<Usuario> createUser(Usuario usuario, UriComponentsBuilder ucb);

    ResponseEntity<Usuario> updateUser(Long id, Usuario usuario);
}
