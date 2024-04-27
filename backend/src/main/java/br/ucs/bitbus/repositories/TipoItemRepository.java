package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.TipoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface TipoItemRepository extends JpaRepository<TipoItem, Long> {

    Collection<TipoItem> findByDescricao(String descricao); // usado para verificar registro duplicado
}
