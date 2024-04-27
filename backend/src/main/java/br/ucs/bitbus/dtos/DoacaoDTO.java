package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Doacao;
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
public class DoacaoDTO {

    private Long id;
    private Double valor;
    private String descricao;
    private PessoaDTO doador;
    private List<Long> itensIds = new ArrayList<>();

    public DoacaoDTO(Doacao entity) {
        this.id = entity.getId();
        this.valor = entity.getValor();
        this.descricao = entity.getDescricao();
        this.doador = new PessoaDTO(entity.getDoador());

        entity.getItens().forEach(item -> this.itensIds.add(item.getId()));
    }
}
