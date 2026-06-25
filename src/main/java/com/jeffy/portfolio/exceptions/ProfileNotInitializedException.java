package com.jeffy.portfolio.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Forces Spring Boot to send 404 instead of 500 over the network
public class ProfileNotInitializedException extends RuntimeException {
    public ProfileNotInitializedException(String message) {
        super(message);
    }
}