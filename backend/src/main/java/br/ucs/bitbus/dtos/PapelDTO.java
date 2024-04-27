package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Papel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PapelDTO {

    private Long id;
    @NotNull(message = "A descrição não pode ser nula")
    @Size(min = 3, max = 30, message = "A descrição deve ter entre 3 a 30 caracteres")
    private String descricao;

    public PapelDTO(Papel entity) {
        this.id = entity.getId();
        this.descricao = entity.getDescricao();
    }
}
