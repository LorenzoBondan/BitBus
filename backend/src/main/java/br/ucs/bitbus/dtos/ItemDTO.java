package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {

    private Long id;
    @NotNull(message = "O nome não pode ser nulo")
    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 a 50 caracteres")
    private String nome;
    @NotNull(message = "O ano não pode ser nulo")
    @Positive(message = "O ano deve ser positivo")
    private Integer ano;
    @NotNull(message = "A quantidade não pode ser nula")
    @Positive(message = "A quantidade deve ser positiva")
    private Integer quantidade;
    @Positive(message = "A altura deve ser positiva")
    private Double altura;
    @Positive(message = "A largura deve ser positiva")
    private Double largura;
    @Positive(message = "A espessura deve ser positiva")
    private Double espessura;
    @NotNull(message = "As informações não podem ser nulas")

    @Size(min = 3, max = 255, message = "As informações devem conter entre 3 a 255 caracteres")
    private String informacoes;
    private Long doacaoId;

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
        if(entity.getDoacao() != null) {
            this.doacaoId = entity.getDoacao().getId();
        }
        entity.getLinks().forEach(link -> this.links.add(new LinkDTO(link)));
    }
}
