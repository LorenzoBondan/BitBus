package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Memoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoriaRepository extends JpaRepository<Memoria, Long> {

    Page<Memoria> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
