package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Oficina;
import br.ucs.bitbus.entities.Papel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OficinaDTO {

    private Long id;
    @NotNull(message = "O local não pode ser nulo")
    @Size(min = 3, max = 40, message = "O local deve ter entre 3 a 40 caracteres")
    private String local;
    @NotNull(message = "O horário não pode ser nulo")
    @Future(message = "O horário deve ser no futuro")
    private LocalDateTime horario;
    @NotNull(message = "A duração não pode ser nula")
    @Positive(message = "A duração deve ser positiva")
    private Integer duracao;
    @NotNull(message = "O título não pode ser nulo")
    @Size(min = 3, max = 50, message = "O título deve ter entre 3 a 50 caracteres")
    private String titulo;
    @Size(min = 3, max = 255, message = "O resumo deve ter entre 3 a 255 caracteres")
    private String resumo;
    @NotNull(message = "O palestrante não pode ser nulo")
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
