package com.syagur.resourceserver.common.exception;

import com.syagur.resourceserver.common.exception.exceptions.NoRightsForActionException;
import com.syagur.resourceserver.common.exception.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.Objects;

@ControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex, WebRequest request) {

        CustomErrorResponse error = createNewException(ex);
        error.setStatus(HttpStatus.NOT_FOUND.value());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoRightsForActionException.class)
    public ResponseEntity<CustomErrorResponse> handleNoRightsForAction(
            NoRightsForActionException ex, WebRequest request) {

        CustomErrorResponse error = createNewException(ex);
        error.setStatus(HttpStatus.FORBIDDEN.value());

        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        CustomErrorResponse error = new CustomErrorResponse();
        error.setTime(LocalDateTime.now());
        error.setMessage(Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage());
        error.setStatus(HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleExceptions(Exception ex, WebRequest request) {

        CustomErrorResponse error = createNewException(ex);
        error.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private CustomErrorResponse createNewException(Exception ex) {

        CustomErrorResponse error = new CustomErrorResponse();
        error.setTime(LocalDateTime.now());
        error.setMessage(ex.getMessage());

        return error;
    }
}
