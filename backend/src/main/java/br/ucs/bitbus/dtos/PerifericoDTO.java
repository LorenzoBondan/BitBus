package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Periferico;
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
public class PerifericoDTO extends ItemDTO {

    @Size(min = 8, message = "A url deve ter ao menos 8 caracteres")
    private String imgUrl;
    @NotNull(message = "O tipo de item não pode ser nulo")
    private TipoItemDTO tipoItem;

    public PerifericoDTO(Periferico entity) {
        this.setId(entity.getId());
        this.setNome(entity.getNome());
        this.setAno(entity.getAno());
        this.setQuantidade(entity.getQuantidade());
        this.setAltura(entity.getAltura());
        this.setLargura(entity.getLargura());
        this.setEspessura(entity.getEspessura());
        this.setInformacoes(entity.getInformacoes());
        this.setImgUrl(entity.getImgUrl());
        this.setTipoItem(new TipoItemDTO(entity.getTipoItem()));
        if(entity.getDoacao() != null) {
            this.setDoacaoId(entity.getDoacao().getId());
        }

        entity.getLinks().forEach(link -> this.getLinks().add(new LinkDTO(link)));
    }
}
