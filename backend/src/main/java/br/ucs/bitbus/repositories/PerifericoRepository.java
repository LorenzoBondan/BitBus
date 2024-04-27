package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Periferico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerifericoRepository extends JpaRepository<Periferico, Long> {

    Page<Periferico> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
