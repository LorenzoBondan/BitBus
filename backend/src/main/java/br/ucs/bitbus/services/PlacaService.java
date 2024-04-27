package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.dtos.PlacaDTO;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.entities.Placa;
import br.ucs.bitbus.repositories.LinkRepository;
import br.ucs.bitbus.repositories.PlacaRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlacaService {

    @Autowired
    private PlacaRepository repository;
    @Autowired
    private LinkRepository linkRepository;

    @Transactional(readOnly = true)
    public Page<PlacaDTO> findAllByName(String nome, Pageable pageable) {
        Page<Placa> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(PlacaDTO::new);
    }

    @Transactional(readOnly = true)
    public PlacaDTO findById(Long id) {
        Placa entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new PlacaDTO(entity);
    }

    @Transactional
    public PlacaDTO insert(PlacaDTO dto) {
        Placa entity = new Placa();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PlacaDTO(entity);
    }

    @Transactional
    public PlacaDTO update(Long id, PlacaDTO dto) {
        Placa entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PlacaDTO(entity);
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

    private void copyDtoToEntity(PlacaDTO dto, Placa entity) {
        entity.setNome(dto.getNome());
        entity.setAno(dto.getAno());
        entity.setQuantidade(dto.getQuantidade());
        entity.setAltura(dto.getAltura());
        entity.setLargura(dto.getLargura());
        entity.setEspessura(dto.getEspessura());
        entity.setInformacoes(dto.getInformacoes());
        entity.setClassificacao(dto.getClassificacao());
        
        entity.getLinks().clear();
        for(LinkDTO dtoLink : dto.getLinks()) {
            Link link = linkRepository.findById(dtoLink.getId()).orElse(null);
            entity.getLinks().add(link);
        }
    }
}
