package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;

@Repository
public interface OficinaRepository extends JpaRepository<Oficina, Long> {

    Collection<Oficina> findByHorario(LocalDateTime horario); // usado para verificar registro duplicado
}
