package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.ItemDTO;
import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Item;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.DoacaoRepository;
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
public class ItemService {

    @Autowired
    private ItemRepository repository;
    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional(readOnly = true)
    public Page<ItemDTO> findAllByName(String nome, Pageable pageable) {
        Page<Item> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(ItemDTO::new);
    }

    @Transactional(readOnly = true)
    public ItemDTO findById(Long id) {
        Item entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new ItemDTO(entity);
    }

    @Transactional
    public ItemDTO insert(ItemDTO dto) {
        Item entity = new Item();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ItemDTO(entity);
    }

    @Transactional
    public ItemDTO update(Long id, ItemDTO dto) {
        Item entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ItemDTO(entity);
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

    private void copyDtoToEntity(ItemDTO dto, Item entity) {
        entity.setNome(dto.getNome());
        entity.setAno(dto.getAno());
        entity.setQuantidade(dto.getQuantidade());
        entity.setAltura(dto.getAltura());
        entity.setLargura(dto.getLargura());
        entity.setEspessura(dto.getEspessura());
        entity.setInformacoes(dto.getInformacoes());

        if(dto.getDoacao() != null){
            entity.setDoacao(doacaoRepository.findById(dto.getDoacao().getId()).orElseThrow(() -> new ResourceNotFoundException("Doação não encontrada")));
        }

        entity.getLinks().clear();
        for(LinkDTO dtoLink : dto.getLinks()) {
            if(linkRepository.existsByUrl(dtoLink.getUrl())){
                Link link = linkRepository.findByUrl(dtoLink.getUrl());
                entity.getLinks().add(link);
            } else {
                Link link = new Link();
                link.setUrl(dtoLink.getUrl());
                link.setItem(entity);
                linkRepository.save(link);
                entity.getLinks().add(link);
            }
        }
    }
}
