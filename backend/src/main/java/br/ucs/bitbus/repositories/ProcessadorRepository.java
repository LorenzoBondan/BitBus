package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Processador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessadorRepository extends JpaRepository<Processador, Long> {

    Page<Processador> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
