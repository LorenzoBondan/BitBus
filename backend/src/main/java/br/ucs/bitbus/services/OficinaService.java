package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.OficinaDTO;
import br.ucs.bitbus.entities.Oficina;
import br.ucs.bitbus.repositories.OficinaRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
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
public class OficinaService {

    @Autowired
    private OficinaRepository repository;
    @Autowired
    private PessoaRepository pessoaRepository;

    @Transactional(readOnly = true)
    public Page<OficinaDTO> findAllPaged(Pageable pageable) {
        Page<Oficina> list = repository.findAll(pageable);
        return list.map(OficinaDTO::new);
    }

    @Transactional(readOnly = true)
    public OficinaDTO findById(Long id) {
        Oficina entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new OficinaDTO(entity);
    }

    @Transactional
    public OficinaDTO insert(OficinaDTO dto) {
        validateDuplicateRecord(dto);
        Oficina entity = new Oficina();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new OficinaDTO(entity);
    }

    @Transactional
    public OficinaDTO update(Long id, OficinaDTO dto) {
        Oficina entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new OficinaDTO(entity);
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

    private void copyDtoToEntity(OficinaDTO dto, Oficina entity) {
        entity.setLocal(dto.getLocal());
        entity.setHorario(dto.getHorario());
        entity.setDuracao(dto.getDuracao());
        entity.setResumo(dto.getResumo());
        entity.setTitulo(dto.getTitulo());
        entity.setPalestrante(pessoaRepository.findById(dto.getPalestrante().getId()).orElseThrow(() -> new ResourceNotFoundException("Palestrante não encontrado")));
    }

    private void validateDuplicateRecord(OficinaDTO dto){
        if(repository.findByHorario(dto.getHorario())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new DuplicatedResourceException("Verifique o campo horário.");
        }
    }
}
