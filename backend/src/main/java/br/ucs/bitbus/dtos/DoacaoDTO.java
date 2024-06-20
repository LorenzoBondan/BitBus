package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Doacao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoacaoDTO {

    private Long id;
    @PositiveOrZero(message = "O valor não pode ser negativo")
    private Double valor;
    @NotNull(message = "A descrição não pode ser nula")
    @Size(min = 3, max = 50, message = "A descrição deve ter entre 3 e 50 caracteres")
    private String descricao;
    @NotNull(message = "O doador não pode ser nulo")
    private PessoaDTO doador;

    private List<ItemDTO> itens = new ArrayList<>();

    public DoacaoDTO(Doacao entity) {
        this.id = entity.getId();
        this.valor = entity.getValor();
        this.descricao = entity.getDescricao();
        this.doador = new PessoaDTO(entity.getDoador());

        entity.getItens().forEach(item -> this.itens.add(new ItemDTO(item)));
    }
}
