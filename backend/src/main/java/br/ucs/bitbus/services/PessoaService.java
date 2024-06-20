package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.dtos.PapelDTO;
import br.ucs.bitbus.dtos.PessoaDTO;
import br.ucs.bitbus.entities.*;
import br.ucs.bitbus.repositories.*;
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
public class PessoaService {

    @Autowired
    private PessoaRepository repository;
    @Autowired
    private OficinaRepository oficinaRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private VisitaRepository visitaRepository;
    @Autowired
    private PapelRepository papelRepository;

    @Transactional(readOnly = true)
    public Page<PessoaDTO> findAllByName(String nome, Pageable pageable) {
        Page<Pessoa> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(PessoaDTO::new);
    }

    @Transactional(readOnly = true)
    public PessoaDTO findById(Long id) {
        Pessoa entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new PessoaDTO(entity);
    }

    @Transactional
    public PessoaDTO insert(PessoaDTO dto) {
        validateDuplicateRecord(dto);
        Pessoa entity = new Pessoa();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PessoaDTO(entity);
    }

    @Transactional
    public PessoaDTO update(Long id, PessoaDTO dto) {
        Pessoa entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PessoaDTO(entity);
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

    private void copyDtoToEntity(PessoaDTO dto, Pessoa entity) {
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setCurriculo(dto.getCurriculo());

        entity.getPapeis().clear();
        for(PapelDTO papelDto : dto.getPapeis()) {
            Papel papel = papelRepository.findById(papelDto.getId()).orElse(null);
            entity.getPapeis().add(papel);
        }

        entity.getDoacoes().clear();
        for(Long doacaoId : dto.getDoacoesIds()){
            Doacao doacao = doacaoRepository.findById(doacaoId).orElse(null);
            entity.getDoacoes().add(doacao);
        }

        entity.getFeedbacks().clear();
        for(FeedbackDTO feedbackDto : dto.getFeedbacks()){
            Feedback feedback = feedbackRepository.findById(feedbackDto.getId()).orElse(null);
            entity.getFeedbacks().add(feedback);
        }

        entity.getVisitas().clear();
        for(Long visitaId : dto.getVisitasIds()){
            Visita visita = visitaRepository.findById(visitaId).orElse(null);
            entity.getVisitas().add(visita);
        }

        entity.getVisitasResponsavel().clear();
        for(Long visitaResponsavelId : dto.getVisitasResponsavelIds()){
            Visita visita = visitaRepository.findById(visitaResponsavelId).orElse(null);
            entity.getVisitasResponsavel().add(visita);
        }

        entity.getOficinas().clear();
        for(Long oficinaId : dto.getOficinasIds()){
            Oficina oficina = oficinaRepository.findById(oficinaId).orElse(null);
            entity.getOficinas().add(oficina);
        }
    }

    private void validateDuplicateRecord(PessoaDTO dto){
        if(repository.findByEmail(dto.getEmail())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new DuplicatedResourceException("Verifique o campo email.");
        }
    }
}
