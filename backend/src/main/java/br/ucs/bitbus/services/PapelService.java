package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.PapelDTO;
import br.ucs.bitbus.entities.Papel;
import br.ucs.bitbus.repositories.PapelRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PapelService {

    @Autowired
    private PapelRepository repository;

    @Transactional(readOnly = true)
    public Page<PapelDTO> findAllPaged(Pageable pageable) {
        Page<Papel> list = repository.findAll(pageable);
        return list.map(PapelDTO::new);
    }

    @Transactional(readOnly = true)
    public PapelDTO findById(Long id) {
        Papel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new PapelDTO(entity);
    }

    @Transactional
    public PapelDTO insert(PapelDTO dto) {
        validateDuplicateRecord(dto);
        Papel entity = new Papel();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PapelDTO(entity);
    }

    @Transactional
    public PapelDTO update(Long id, PapelDTO dto) {
        Papel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PapelDTO(entity);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id não encontrado " + id);
        } catch(DataIntegrityViolationException e) {
            throw new DatabaseException("Existem vínculos para o id " + id);
        }
    }

    private void copyDtoToEntity(PapelDTO dto, Papel entity) {
        entity.setDescricao(dto.getDescricao());
    }

    private void validateDuplicateRecord(PapelDTO dto){
        if(repository.findByDescricao(dto.getDescricao())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new DuplicatedResourceException("Verifique o campo descrição.");
        }
    }
}
