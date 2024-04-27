package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query(nativeQuery = true, value = """
            SELECT f.* FROM tb_feedback f WHERE f.autor_id = :autorId AND f.visita_id = :visitaId
            """)
    Collection<Feedback> findByAutorAndVisita(@Param("autorId") Long autorId, @Param("visitaId") Long visitaId); // usado para verificar registro duplicado
}
