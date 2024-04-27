package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tb_oficina")
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String local;
    private LocalDateTime horario;
    private Integer duracao;
    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String resumo;

    @ManyToOne
    @JoinColumn(name = "palestrante_id")
    private Pessoa palestrante;
}
