package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.TipoItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoItemDTO {

    private Long id;
    private String descricao;

    private List<Long> discosRemoviveisIds = new ArrayList<>();
    private List<Long> perifericosIds = new ArrayList<>();

    public TipoItemDTO(TipoItem entity) {
        this.id = entity.getId();
        this.descricao = entity.getDescricao();

        entity.getDiscosRemoviveis().forEach(discoRemovivel -> this.discosRemoviveisIds.add(discoRemovivel.getId()));
        entity.getPerifericos().forEach(periferico -> this.perifericosIds.add(periferico.getId()));
    }
}
