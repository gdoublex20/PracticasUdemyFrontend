package com.jesus.backAngular.services;

import com.jesus.backAngular.entities.Role;
import com.jesus.backAngular.entities.Usuario;
import com.jesus.backAngular.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements UsuarioService {

    private UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UsuarioServiceImp(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){

        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public ResponseEntity<Iterable<Usuario>> findAll() {
        Iterable<Usuario> Users = usuarioRepository.findAll();
        return new ResponseEntity<>(Users, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Usuario> findById(Long id) {
        return usuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Usuario> findByUserName(String username) {
        return usuarioRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<Usuario> createUser(Usuario request, UriComponentsBuilder ucb) {
        Usuario user = Usuario.builder()
                .name(request.getName())
                .lastname(request.getLastname())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode( request.getPassword()))
                .creationDate(request.getCreationDate())
                .lastDate(request.getLastDate())
                .avatar(request.getAvatar())
                .role(request.getRole())
                .build();
        Usuario savedUsuario = usuarioRepository.save(user);
        URI locationOfNewUserd = ucb
                .path("users/{id}")
                .buildAndExpand(savedUsuario.getId())
                .toUri();
        return ResponseEntity.created(locationOfNewUserd).body(savedUsuario);

    }

    @Override
    public ResponseEntity<Usuario> deleteById(Long id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        try {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Usuario> updateUser(Long id, Usuario updateUsuario) {
        Optional<Usuario> optionalUser = usuarioRepository.findById(id);

        System.out.println(optionalUser);
        if (optionalUser.isPresent()) {
            Usuario user = optionalUser.get();
            user.setName(updateUsuario.getName());
            user.setLastname(updateUsuario.getLastname());
            user.setUsername(updateUsuario.getUsername());
            user.setEmail(updateUsuario.getEmail());
            user.setLastDate(updateUsuario.getLastDate());
            user.setAvatar(updateUsuario.getAvatar());
            user.setRole(updateUsuario.getRole());

            System.out.println(user);
            Usuario updatedUsuario = usuarioRepository.save(user);
            return ResponseEntity.ok(updatedUsuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
