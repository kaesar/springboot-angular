package com.example.test.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

import com.example.test.user.model.Usuario;
import com.example.test.user.repository.UsuarioRepository;

@Service
public class UsuarioService implements UsuarioRepository {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public List<Usuario> findAll(Sort sort) {
        return usuarioRepository.findAll(sort);
    }

    @Override
    public Page<Usuario> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<Usuario> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {
        usuarioRepository.deleteById(aLong);
    }

    @Override
    public void delete(Usuario entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends Usuario> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends Usuario> S save(S entity) {
        return usuarioRepository.save(entity);
    }

    @Override
    public <S extends Usuario> List<S> saveAll(Iterable<S> entities) {
        return usuarioRepository.saveAll(entities);
    }

    @Override
    public Optional<Usuario> findById(Long aLong) {
        return usuarioRepository.findById(aLong);  //Optional.empty();
    }

    @Override
    public Optional<Usuario> findByNombre(String name) {
        return usuarioRepository.findByNombre(name);  //return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Usuario> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Usuario> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Usuario> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Usuario getOne(Long aLong) {
        return null;
    }

    @Override
    public Usuario getById(Long aLong) {
        return usuarioRepository.getById(aLong);
    }

    @Override
    public <S extends Usuario> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Usuario> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Usuario> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Usuario> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Usuario> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Usuario> boolean exists(Example<S> example) {
        return false;
    }
}
