package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.DiscoRemovivel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscoRemovivelRepository extends JpaRepository<DiscoRemovivel, Long> {

    Page<DiscoRemovivel> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
