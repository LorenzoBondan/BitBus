package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.entities.Feedback;
import br.ucs.bitbus.repositories.FeedbackRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.repositories.VisitaRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import br.ucs.bitbus.services.exceptions.UniqueConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository repository;
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private VisitaRepository visitaRepository;

    @Transactional(readOnly = true)
    public Page<FeedbackDTO> findAllPaged(Pageable pageable) {
        Page<Feedback> list = repository.findAll(pageable);
        return list.map(FeedbackDTO::new);
    }

    @Transactional(readOnly = true)
    public FeedbackDTO findById(Long id) {
        Feedback entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new FeedbackDTO(entity);
    }

    @Transactional
    public FeedbackDTO insert(FeedbackDTO dto) {
        validateDuplicateRecord(dto);
        Feedback entity = new Feedback();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new FeedbackDTO(entity);
    }

    @Transactional
    public FeedbackDTO update(Long id, FeedbackDTO dto) {
        Feedback entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new FeedbackDTO(entity);
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

    private void copyDtoToEntity(FeedbackDTO dto, Feedback entity) {
        entity.setComentario(dto.getComentario());
        entity.setImgUrl(dto.getImgUrl());
        entity.setAutor(pessoaRepository.findById(dto.getAutorId()).orElseThrow(() -> new ResourceNotFoundException("Autor não encontrado")));
        entity.setVisita(visitaRepository.findById(dto.getVisitaId()).orElseThrow(() -> new ResourceNotFoundException("Visita não encontrada")));
    }

    private void validateDuplicateRecord(FeedbackDTO dto){
        if(repository.findByAutorAndVisita(dto.getAutorId(), dto.getVisitaId())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new UniqueConstraintViolationException("Registro duplicado para a combinação de Autor e Visita.");
        }
    }
}
