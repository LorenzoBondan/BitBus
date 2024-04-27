package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Placa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacaRepository extends JpaRepository<Placa, Long> {

    Page<Placa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
