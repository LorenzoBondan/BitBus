package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.ItemRepository;
import br.ucs.bitbus.repositories.LinkRepository;
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
public class LinkService {

    @Autowired
    private LinkRepository repository;
    @Autowired
    private ItemRepository itemRepository;

    @Transactional(readOnly = true)
    public Page<LinkDTO> findAllPaged(Pageable pageable) {
        Page<Link> list = repository.findAll(pageable);
        return list.map(LinkDTO::new);
    }

    @Transactional(readOnly = true)
    public LinkDTO findById(Long id) {
        Link entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new LinkDTO(entity);
    }

    @Transactional
    public LinkDTO insert(LinkDTO dto) {
        Link entity = new Link();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new LinkDTO(entity);
    }

    @Transactional
    public LinkDTO update(Long id, LinkDTO dto) {
        Link entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new LinkDTO(entity);
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

    private void copyDtoToEntity(LinkDTO dto, Link entity) {
        entity.setUrl(dto.getUrl());
        entity.setItem(itemRepository.findById(dto.getItemId()).orElse(null));
    }
}
