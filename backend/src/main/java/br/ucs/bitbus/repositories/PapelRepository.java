package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Papel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PapelRepository extends JpaRepository<Papel, Long> {

    Collection<Papel> findByDescricao(String descricao); // usado para verificar registro duplicado
}
