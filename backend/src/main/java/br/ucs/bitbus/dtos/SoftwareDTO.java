package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Software;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SoftwareDTO extends ItemDTO {

    public SoftwareDTO(Software entity) {
        this.setId(entity.getId());
        this.setNome(entity.getNome());
        this.setAno(entity.getAno());
        this.setQuantidade(entity.getQuantidade());
        this.setAltura(entity.getAltura());
        this.setLargura(entity.getLargura());
        this.setEspessura(entity.getEspessura());
        this.setInformacoes(entity.getInformacoes());
        if(entity.getDoacao() != null) {
            this.setDoacaoId(entity.getDoacao().getId());
        }

        entity.getLinks().forEach(link -> this.getLinks().add(new LinkDTO(link)));
    }
}
