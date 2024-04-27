package br.ucs.bitbus.dtos.handlers;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FieldMessage {

    private String fieldName;
    private String message;
}
