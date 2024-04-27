package br.ucs.bitbus.entities;

import br.ucs.bitbus.entities.enums.CLASSIFICACAO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_placa")
public class Placa extends Item {

    @Enumerated(EnumType.STRING)
    private CLASSIFICACAO classificacao;
}
