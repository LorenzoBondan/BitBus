package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Visita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;

@Repository
public interface VisitaRepository extends JpaRepository<Visita, Long> {

    Collection<Visita> findByDataInicioAndDataFim(LocalDateTime dataInicio, LocalDateTime dataFim); // usado para verificar registro duplicado
}
