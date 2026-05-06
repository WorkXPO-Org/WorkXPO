package com.workxpo.backend.dto.user;

import com.workxpo.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserResponseDTO> {

    @Override
    public UserResponseDTO apply(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getInstitution(),
                user.getCourse(),
                user.getDescription(),
                user.getLinkedinUrl()
        );
    }

    public User toEntity(UserRequestDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());
        return user;
    }
}
