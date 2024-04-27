package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.DiscoRemovivel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscoRemovivelDTO extends ItemDTO {

    private String imgUrl;
    private TipoItemDTO tipoItem;

    public DiscoRemovivelDTO(DiscoRemovivel entity) {
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

        entity.getLinks().forEach(link -> this.getLinks().add(new LinkDTO(link)));
    }
}
