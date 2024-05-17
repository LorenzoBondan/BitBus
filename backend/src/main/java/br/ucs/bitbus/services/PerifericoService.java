package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.PerifericoDTO;
import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Periferico;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.PerifericoRepository;
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
public class PerifericoService {

    @Autowired
    private PerifericoRepository repository;
    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private TipoItemRepository tipoItemRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional(readOnly = true)
    public Page<PerifericoDTO> findAllByName(String nome, Pageable pageable) {
        Page<Periferico> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(PerifericoDTO::new);
    }

    @Transactional(readOnly = true)
    public PerifericoDTO findById(Long id) {
        Periferico entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new PerifericoDTO(entity);
    }

    @Transactional
    public PerifericoDTO insert(PerifericoDTO dto) {
        Periferico entity = new Periferico();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PerifericoDTO(entity);
    }

    @Transactional
    public PerifericoDTO update(Long id, PerifericoDTO dto) {
        Periferico entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PerifericoDTO(entity);
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

    private void copyDtoToEntity(PerifericoDTO dto, Periferico entity) {
        entity.setNome(dto.getNome());
        entity.setAno(dto.getAno());
        entity.setQuantidade(dto.getQuantidade());
        entity.setAltura(dto.getAltura());
        entity.setLargura(dto.getLargura());
        entity.setEspessura(dto.getEspessura());
        entity.setInformacoes(dto.getInformacoes());
        entity.setImgUrl(dto.getImgUrl());
        entity.setTipoItem(tipoItemRepository.findById(dto.getTipoItem().getId()).orElse(null));

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
