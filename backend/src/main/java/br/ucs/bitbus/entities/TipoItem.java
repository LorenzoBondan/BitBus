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
@Table(name = "tb_tipo_item")
public class TipoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;

    @OneToMany(mappedBy = "tipoItem")
    private List<DiscoRemovivel> discosRemoviveis = new ArrayList<>();

    @OneToMany(mappedBy = "tipoItem")
    private List<Periferico> perifericos = new ArrayList<>();
}
