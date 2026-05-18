package com.workxpo.backend.repository;

import com.workxpo.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>
{
    // this method help us find the user and not pass the UUID (which is gigantic)
    Optional<User> findByEmail(String email);
}
