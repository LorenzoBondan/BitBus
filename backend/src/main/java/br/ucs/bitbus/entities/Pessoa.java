package br.ucs.bitbus.entities;

import lombok.*;

import javax.persistence.*;
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
@Table(name = "tb_pessoa")
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Column(unique = true)
    private String email;
    @Column(columnDefinition = "TEXT")
    private String curriculo;

    @ManyToMany
    @JoinTable(name = "tb_pessoa_papel",
            joinColumns = @JoinColumn(name = "pessoa_id"),
            inverseJoinColumns = @JoinColumn(name = "papel_id"))
    private Set<Papel> papeis = new HashSet<>();

    @OneToMany(mappedBy = "doador")
    private List<Doacao> doacoes = new ArrayList<>();

    @OneToMany(mappedBy = "palestrante")
    private List<Oficina> oficinas = new ArrayList<>();

    @OneToMany(mappedBy = "responsavel")
    private List<Visita> visitasResponsavel = new ArrayList<>();

    @ManyToMany(mappedBy = "visitantes")
    private Set<Visita> visitas = new HashSet<>();

    @OneToMany(mappedBy = "autor")
    private List<Feedback> feedbacks = new ArrayList<>();
}
