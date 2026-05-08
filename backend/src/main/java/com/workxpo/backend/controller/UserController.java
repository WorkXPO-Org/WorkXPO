package com.workxpo.backend.controller;


import com.workxpo.backend.dto.user.UserRequestDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

  @PostMapping("/create")
  public void createUser(@Valid @RequestBody UserRequestDTO dados){
     System.out.println("dados: " + dados);
  }

}
