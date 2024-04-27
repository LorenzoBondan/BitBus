package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tb_visita")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String local;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;

    @ManyToOne
    @JoinColumn(name = "responsavel_id")
    private Pessoa responsavel;

    @ManyToMany
    @JoinTable(name = "tb_visita_pessoa",
            joinColumns = @JoinColumn(name = "visita_id"),
            inverseJoinColumns = @JoinColumn(name = "pessoa_id"))
    private Set<Pessoa> visitantes = new HashSet<>();

    @OneToMany(mappedBy = "visita")
    private List<Feedback> feedbacks = new ArrayList<>();
}
