package br.ucs.bitbus.controllers.exception;

import br.ucs.bitbus.dtos.handlers.CustomError;
import br.ucs.bitbus.dtos.handlers.ValidationError;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import br.ucs.bitbus.services.exceptions.UniqueConstraintViolationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<CustomError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DuplicatedResourceException.class)
    public ResponseEntity<CustomError> duplicatedResource(DuplicatedResourceException e, HttpServletRequest request){
        HttpStatus status = HttpStatus.CONFLICT;
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), e.getMessage() + " " + e.getDetail(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<CustomError> database(DatabaseException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class) // anotações de validação das entidades
    public ResponseEntity<CustomError> methodArgumentNotValidation(MethodArgumentNotValidException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        ValidationError err = new ValidationError(LocalDateTime.now(), status.value(), "Dados inválidos", request.getRequestURI());
        for (FieldError f : e.getBindingResult().getFieldErrors()) {
            err.addError(f.getField(), f.getDefaultMessage());
        }
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<CustomError> constraintViolation(ConstraintViolationException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        List<String> constraintMessages = e.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessageTemplate)
                .collect(Collectors.toList());
        String concatenatedMessages = String.join(", ", constraintMessages);
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), concatenatedMessages, request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(JsonMappingException.class) // String no lugar de Integer no body da request
    public ResponseEntity<CustomError> handleJsonMappingException(JsonMappingException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String fieldName = extractJsonFieldName(e);
        String errorMessage = "Erro na leitura do corpo JSON";
        if (fieldName != null) {
            errorMessage += ", campo problemático: " + fieldName;
        }
        errorMessage += ". Mensagem: " + e.getMessage();
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), errorMessage, request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(UniqueConstraintViolationException.class)
    public ResponseEntity<CustomError> uniqueConstraintViolation(UniqueConstraintViolationException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        CustomError err = new CustomError(LocalDateTime.now(), status.value(), e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);
    }

    private String extractJsonFieldName(JsonMappingException e) {
        return e.getPath().stream()
                .map(JsonMappingException.Reference::getFieldName)
                .findFirst()
                .orElse(null);
    }
}
