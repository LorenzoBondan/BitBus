package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Feedback;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {

    private Long id;
    @Size(min = 3, max = 100, message = "O comentário deve ter entre 3 a 100 caracteres")
    private String comentario;
    private String imgUrl;
    @NotNull(message = "O autor não pode ser nulo")
    private Long autorId;
    @NotNull(message = "A visita não pode ser nula")
    private Long visitaId;

    public FeedbackDTO(Feedback entity) {
        this.id = entity.getId();
        this.comentario = entity.getComentario();
        this.imgUrl = entity.getImgUrl();
        this.autorId = entity.getAutor().getId();
        this.visitaId = entity.getVisita().getId();
    }
}
