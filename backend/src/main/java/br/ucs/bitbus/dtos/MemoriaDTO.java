package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Memoria;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoriaDTO extends ItemDTO {

    public MemoriaDTO(Memoria entity) {
        this.setId(entity.getId());
        this.setNome(entity.getNome());
        this.setAno(entity.getAno());
        this.setQuantidade(entity.getQuantidade());
        this.setAltura(entity.getAltura());
        this.setLargura(entity.getLargura());
        this.setEspessura(entity.getEspessura());
        this.setInformacoes(entity.getInformacoes());
        if(entity.getDoacao() != null) {
            this.setDoacao(new DoacaoDTO(entity.getDoacao()));
        }

        entity.getLinks().forEach(link -> this.getLinks().add(new LinkDTO(link)));
    }
}
