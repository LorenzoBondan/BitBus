package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.dtos.VisitaDTO;
import br.ucs.bitbus.entities.Feedback;
import br.ucs.bitbus.entities.Pessoa;
import br.ucs.bitbus.entities.Visita;
import br.ucs.bitbus.repositories.FeedbackRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.repositories.VisitaRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
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
public class VisitaService {

    @Autowired
    private VisitaRepository repository;
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Transactional(readOnly = true)
    public Page<VisitaDTO> findAllPaged(Pageable pageable) {
        Page<Visita> list = repository.findAll(pageable);
        return list.map(VisitaDTO::new);
    }

    @Transactional(readOnly = true)
    public VisitaDTO findById(Long id) {
        Visita entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new VisitaDTO(entity);
    }

    @Transactional
    public VisitaDTO insert(VisitaDTO dto) {
        validateDuplicateRecord(dto);
        Visita entity = new Visita();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new VisitaDTO(entity);
    }

    @Transactional
    public VisitaDTO update(Long id, VisitaDTO dto) {
        Visita entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new VisitaDTO(entity);
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

    private void copyDtoToEntity(VisitaDTO dto, Visita entity) {
        entity.setLocal(dto.getLocal());
        entity.setDataInicio(dto.getDataInicio());
        entity.setDataFim(dto.getDataFim());
        entity.setResponsavel(pessoaRepository.findById(dto.getResponsavel().getId()).orElseThrow(() -> new ResourceNotFoundException("Responsável não encontrado")));

        entity.getVisitantes().clear();
        for(Long visitanteId : dto.getVisitantesIds()){
            Pessoa visitante = pessoaRepository.findById(visitanteId).orElse(null);
            entity.getVisitantes().add(visitante);
        }

        entity.getFeedbacks().clear();
        for(FeedbackDTO feedbackDTO : dto.getFeedbacks()){
            Feedback feedback = feedbackRepository.findById(feedbackDTO.getId()).orElse(null);
            entity.getFeedbacks().add(feedback);
        }
    }

    private void validateDuplicateRecord(VisitaDTO dto){
        if(repository.findByDataInicioAndDataFim(dto.getDataInicio(), dto.getDataFim())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new UniqueConstraintViolationException("Registro duplicado para a combinação de Data Início e Data Fim.");
        }
    }
}
