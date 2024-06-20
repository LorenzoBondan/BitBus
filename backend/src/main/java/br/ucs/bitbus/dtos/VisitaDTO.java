package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Visita;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VisitaDTO {

    private Long id;
    @NotNull(message = "O local não pode ser nulo")
    @Size(min = 3, max = 50, message = "O local deve ter entre 3 a 50 caracteres")
    private String local;
    @NotNull(message = "A data de início não pode ser nula")
    @Future(message = "A data de início deve ser no futuro")
    private LocalDateTime dataInicio;
    @NotNull(message = "A data de fim não pode ser nula")
    @Future(message = "A data de fim deve ser no futuro")
    private LocalDateTime dataFim;
    @NotNull(message = "O responsável não pode ser nulo")
    private PessoaDTO responsavel;
    private List<PessoaDTO> visitantes = new ArrayList<>();
    private List<FeedbackDTO> feedbacks = new ArrayList<>();

    public VisitaDTO(Visita entity) {
        this.id = entity.getId();
        this.local = entity.getLocal();
        this.dataInicio = entity.getDataInicio();
        this.dataFim = entity.getDataFim();
        this.responsavel = new PessoaDTO(entity.getResponsavel());

        entity.getVisitantes().forEach(visitante -> this.visitantes.add(new PessoaDTO(visitante)));
        entity.getFeedbacks().forEach(feedback -> this.feedbacks.add(new FeedbackDTO(feedback)));
    }
}
