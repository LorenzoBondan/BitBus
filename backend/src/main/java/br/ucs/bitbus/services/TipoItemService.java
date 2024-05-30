package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.TipoItemDTO;
import br.ucs.bitbus.entities.DiscoRemovivel;
import br.ucs.bitbus.entities.Periferico;
import br.ucs.bitbus.entities.TipoItem;
import br.ucs.bitbus.repositories.DiscoRemovivelRepository;
import br.ucs.bitbus.repositories.PerifericoRepository;
import br.ucs.bitbus.repositories.TipoItemRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TipoItemService {

    @Autowired
    private TipoItemRepository repository;
    @Autowired
    private PerifericoRepository perifericoRepository;
    @Autowired
    private DiscoRemovivelRepository discoRemovivelRepository;

    @Transactional(readOnly = true)
    public List<TipoItemDTO> findAll() {
        List<TipoItem> list = repository.findAll();
        return list.stream().map(TipoItemDTO::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TipoItemDTO findById(Long id) {
        TipoItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new TipoItemDTO(entity);
    }

    @Transactional
    public TipoItemDTO insert(TipoItemDTO dto) {
        validateDuplicateRecord(dto);
        TipoItem entity = new TipoItem();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new TipoItemDTO(entity);
    }

    @Transactional
    public TipoItemDTO update(Long id, TipoItemDTO dto) {
        TipoItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        validateDuplicateRecord(dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new TipoItemDTO(entity);
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

    private void copyDtoToEntity(TipoItemDTO dto, TipoItem entity) {
        entity.setDescricao(dto.getDescricao());

        entity.getDiscosRemoviveis().clear();
        for(Long discoRemovivelId : dto.getDiscosRemoviveisIds()){
            DiscoRemovivel discoRemovivel = discoRemovivelRepository.findById(discoRemovivelId).orElse(null);
            entity.getDiscosRemoviveis().add(discoRemovivel);
        }

        entity.getPerifericos().clear();
        for(Long perifericoId : dto.getPerifericosIds()){
            Periferico periferico = perifericoRepository.findById(perifericoId).orElse(null);
            entity.getPerifericos().add(periferico);
        }
    }

    private void validateDuplicateRecord(TipoItemDTO dto){
        if(repository.findByDescricao(dto.getDescricao())
                .stream()
                .anyMatch(t -> !t.getId().equals(Optional.ofNullable(dto.getId()).orElse(-1L)))){
            throw new DuplicatedResourceException("Verifique o campo descrição.");
        }
    }
}
