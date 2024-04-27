package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.TipoItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoItemDTO {

    private Long id;
    @NotNull(message = "A descrição não pode ser nula")
    @Size(min = 3, max = 30, message = "A descrição deve ter entre 3 a 30 caracteres")
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
