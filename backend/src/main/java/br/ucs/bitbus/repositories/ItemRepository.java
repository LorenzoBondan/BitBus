package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
