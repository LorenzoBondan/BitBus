package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Oficina;
import br.ucs.bitbus.entities.Papel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OficinaDTO {

    private Long id;
    private String local;
    private LocalDateTime horario;
    private Integer duracao;
    private String titulo;
    private String resumo;
    private PessoaDTO palestrante;

    public OficinaDTO(Oficina entity) {
        this.id = entity.getId();
        this.local = entity.getLocal();
        this.horario = entity.getHorario();
        this.duracao = entity.getDuracao();
        this.titulo = entity.getTitulo();
        this.resumo = entity.getResumo();
        this.palestrante = new PessoaDTO(entity.getPalestrante());
    }
}
