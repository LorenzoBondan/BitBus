package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.dtos.ProcessadorDTO;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.entities.Processador;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.LinkRepository;
import br.ucs.bitbus.repositories.ProcessadorRepository;
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
public class ProcessadorService {

    @Autowired
    private ProcessadorRepository repository;
    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional(readOnly = true)
    public Page<ProcessadorDTO> findAllByName(String nome, Pageable pageable) {
        Page<Processador> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(ProcessadorDTO::new);
    }

    @Transactional(readOnly = true)
    public ProcessadorDTO findById(Long id) {
        Processador entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new ProcessadorDTO(entity);
    }

    @Transactional
    public ProcessadorDTO insert(ProcessadorDTO dto) {
        Processador entity = new Processador();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ProcessadorDTO(entity);
    }

    @Transactional
    public ProcessadorDTO update(Long id, ProcessadorDTO dto) {
        Processador entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ProcessadorDTO(entity);
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

    private void copyDtoToEntity(ProcessadorDTO dto, Processador entity) {
        entity.setNome(dto.getNome());
        entity.setAno(dto.getAno());
        entity.setQuantidade(dto.getQuantidade());
        entity.setAltura(dto.getAltura());
        entity.setLargura(dto.getLargura());
        entity.setEspessura(dto.getEspessura());
        entity.setInformacoes(dto.getInformacoes());

        if(dto.getDoacaoId() != null){
            entity.setDoacao(doacaoRepository.findById(dto.getDoacaoId()).orElseThrow(() -> new ResourceNotFoundException("Doação não encontrada")));
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
