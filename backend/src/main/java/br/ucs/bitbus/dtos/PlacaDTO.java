package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Placa;
import br.ucs.bitbus.entities.enums.CLASSIFICACAO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacaDTO extends ItemDTO {

    @NotNull(message = "A classificação não pode ser nula")
    private CLASSIFICACAO classificacao;

    public PlacaDTO(Placa entity) {
        this.setId(entity.getId());
        this.setNome(entity.getNome());
        this.setAno(entity.getAno());
        this.setQuantidade(entity.getQuantidade());
        this.setAltura(entity.getAltura());
        this.setLargura(entity.getLargura());
        this.setEspessura(entity.getEspessura());
        this.setInformacoes(entity.getInformacoes());
        this.classificacao = entity.getClassificacao();

        entity.getLinks().forEach(link -> this.getLinks().add(new LinkDTO(link)));
    }
}
