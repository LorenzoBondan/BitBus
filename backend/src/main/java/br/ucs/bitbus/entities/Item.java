package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
@Entity
@Table(name = "tb_item")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String nome;
    private Integer ano;
    private Integer quantidade;
    private Double altura;
    private Double largura;
    private Double espessura;
    @Column(columnDefinition = "TEXT")
    private String informacoes;

    @ManyToOne
    @JoinColumn(name = "doacao_id")
    private Doacao doacao;

    @OneToMany(mappedBy = "item", cascade = CascadeType.REMOVE)
    private List<Link> links = new ArrayList<>();
}
