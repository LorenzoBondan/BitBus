package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Visita;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VisitaDTO {

    private Long id;
    private String local;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;

    private PessoaDTO responsavel;
    private List<Long> visitantesIds = new ArrayList<>();
    private List<FeedbackDTO> feedbacks = new ArrayList<>();

    public VisitaDTO(Visita entity) {
        this.id = entity.getId();
        this.local = entity.getLocal();
        this.dataInicio = entity.getDataInicio();
        this.dataFim = entity.getDataFim();
        this.responsavel = new PessoaDTO(entity.getResponsavel());

        entity.getVisitantes().forEach(visitante -> this.visitantesIds.add(visitante.getId()));
        entity.getFeedbacks().forEach(feedback -> this.feedbacks.add(new FeedbackDTO(feedback)));
    }
}
