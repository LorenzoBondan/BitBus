package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tb_doacao")
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double valor;
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "doador_id")
    private Pessoa doador;

    @OneToMany(mappedBy = "doacao")
    private List<Item> itens = new ArrayList<>();
}
