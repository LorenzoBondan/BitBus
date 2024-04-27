package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Pessoa;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PessoaDTO {

    private Long id;
    private String nome;
    @Email
    private String email;
    private String curriculo;

    private List<PapelDTO> papeis = new ArrayList<>();
    private List<Long> doacoesIds = new ArrayList<>();
    private List<Long> oficinasIds = new ArrayList<>();
    private List<VisitaDTO> visitas = new ArrayList<>();
    private List<Long> visitasResponsavelIds = new ArrayList<>();
    private List<FeedbackDTO> feedbacks = new ArrayList<>();

    public PessoaDTO(Pessoa entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.curriculo = entity.getCurriculo();

        entity.getPapeis().forEach(papel -> papeis.add(new PapelDTO(papel)));
        entity.getDoacoes().forEach(doacao -> doacoesIds.add(doacao.getId()));
        entity.getOficinas().forEach(oficina -> oficinasIds.add(oficina.getId()));
        entity.getVisitas().forEach(visita -> visitas.add(new VisitaDTO(visita)));
        entity.getVisitasResponsavel().forEach(visita -> visitasResponsavelIds.add(visita.getId()));
        entity.getFeedbacks().forEach(feedback -> feedbacks.add(new FeedbackDTO(feedback)));
    }
}