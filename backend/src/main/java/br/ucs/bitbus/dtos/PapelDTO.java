package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Papel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PapelDTO {

    private Long id;
    private String descricao;

    public PapelDTO(Papel entity) {
        this.id = entity.getId();
        this.descricao = entity.getDescricao();
    }
}
