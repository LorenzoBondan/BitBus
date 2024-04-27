package br.ucs.bitbus.services.exceptions;

import lombok.Getter;

@Getter
public class UniqueConstraintViolationException extends RuntimeException {

    private final String detailedMessage;

    public UniqueConstraintViolationException(String detailedMessage) {
        super("Violação de chave única: " + detailedMessage);
        this.detailedMessage = detailedMessage;
    }
}
