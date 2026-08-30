package com.spring.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class HelloWorldController {
    @GetMapping("/say")
    String sayWord() {
        return "Hello Abi";
    }
}
