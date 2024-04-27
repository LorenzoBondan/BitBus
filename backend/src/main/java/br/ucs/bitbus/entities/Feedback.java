package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tb_feedback")
public class Feedback {

    @Id
    private Long id;
    private String comentario;
    @Column(columnDefinition = "TEXT")
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Pessoa autor;

    @ManyToOne
    @JoinColumn(name = "visita_id")
    private Visita visita;
}
