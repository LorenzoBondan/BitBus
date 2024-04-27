package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Software;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoftwareRepository extends JpaRepository<Software, Long> {

    Page<Software> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
