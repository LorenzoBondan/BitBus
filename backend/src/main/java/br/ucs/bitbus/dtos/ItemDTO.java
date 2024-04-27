package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Item;
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
public class ItemDTO {

    private Long id;
    private String nome;
    private Integer ano;
    private Integer quantidade;
    private Double altura;
    private Double largura;
    private Double espessura;
    private String informacoes;
    private DoacaoDTO doacao;

    private List<LinkDTO> links = new ArrayList<>();

    public ItemDTO(Item entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.ano = entity.getAno();
        this.quantidade = entity.getQuantidade();
        this.altura = entity.getAltura();
        this.largura = entity.getLargura();
        this.espessura = entity.getEspessura();
        this.informacoes = entity.getInformacoes();
        this.doacao = new DoacaoDTO(entity.getDoacao());

        entity.getLinks().forEach(link -> this.links.add(new LinkDTO(link)));
    }
}
