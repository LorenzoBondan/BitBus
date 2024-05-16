package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.DiscoRemovivelDTO;
import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.DiscoRemovivel;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.DiscoRemovivelRepository;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.LinkRepository;
import br.ucs.bitbus.repositories.TipoItemRepository;
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
public class DiscoRemovivelService {

    @Autowired
    private DiscoRemovivelRepository repository;
    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private TipoItemRepository tipoItemRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional(readOnly = true)
    public Page<DiscoRemovivelDTO> findAllByName(String nome, Pageable pageable) {
        Page<DiscoRemovivel> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(DiscoRemovivelDTO::new);
    }

    @Transactional(readOnly = true)
    public DiscoRemovivelDTO findById(Long id) {
        DiscoRemovivel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new DiscoRemovivelDTO(entity);
    }

    @Transactional
    public DiscoRemovivelDTO insert(DiscoRemovivelDTO dto) {
        DiscoRemovivel entity = new DiscoRemovivel();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new DiscoRemovivelDTO(entity);
    }

    @Transactional
    public DiscoRemovivelDTO update(Long id, DiscoRemovivelDTO dto) {
        DiscoRemovivel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new DiscoRemovivelDTO(entity);
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

    private void copyDtoToEntity(DiscoRemovivelDTO dto, DiscoRemovivel entity) {
        entity.setNome(dto.getNome());
        entity.setAno(dto.getAno());
        entity.setQuantidade(dto.getQuantidade());
        entity.setAltura(dto.getAltura());
        entity.setLargura(dto.getLargura());
        entity.setEspessura(dto.getEspessura());
        entity.setInformacoes(dto.getInformacoes());
        entity.setImgUrl(dto.getImgUrl());
        entity.setTipoItem(tipoItemRepository.findById(dto.getTipoItem().getId()).orElseThrow(() -> new ResourceNotFoundException("TipoItem não encontrado")));

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
