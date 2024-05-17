package br.ucs.bitbus.repositories;

import br.ucs.bitbus.entities.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long> {

    Boolean existsByUrl(String url);
    Link findByUrl(String url);
}
