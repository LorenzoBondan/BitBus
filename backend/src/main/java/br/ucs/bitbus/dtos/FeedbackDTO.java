package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Feedback;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {

    private Long id;
    private String comentario;
    private String imgUrl;
    private Long autorId;
    private Long visitaId;

    public FeedbackDTO(Feedback entity) {
        this.id = entity.getId();
        this.comentario = entity.getComentario();
        this.imgUrl = entity.getImgUrl();
        this.autorId = entity.getAutor().getId();
        this.visitaId = entity.getVisita().getId();
    }
}
