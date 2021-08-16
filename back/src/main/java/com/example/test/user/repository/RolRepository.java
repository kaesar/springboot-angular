package com.example.test.user.repository;

//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.test.user.model.Rol;

public interface RolRepository extends JpaRepository<Rol, Long> {
}