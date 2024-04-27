package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    Collection<Pessoa> findByEmail(String email); // usado para verificar registro duplicado

    Page<Pessoa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
