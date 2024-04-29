package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.MemoriaDTO;
import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Memoria;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.MemoriaRepository;
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
public class MemoriaService {

    @Autowired
    private MemoriaRepository repository;
    @Autowired
    private LinkRepository linkRepository;
    @Autowired
    private DoacaoRepository doacaoRepository;

    @Transactional(readOnly = true)
    public Page<MemoriaDTO> findAllByName(String nome, Pageable pageable) {
        Page<Memoria> list = repository.findByNomeContainingIgnoreCase(nome, pageable);
        return list.map(MemoriaDTO::new);
    }

    @Transactional(readOnly = true)
    public MemoriaDTO findById(Long id) {
        Memoria entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new MemoriaDTO(entity);
    }

    @Transactional
    public MemoriaDTO insert(MemoriaDTO dto) {
        Memoria entity = new Memoria();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new MemoriaDTO(entity);
    }

    @Transactional
    public MemoriaDTO update(Long id, MemoriaDTO dto) {
        Memoria entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new MemoriaDTO(entity);
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

    private void copyDtoToEntity(MemoriaDTO dto, Memoria entity) {
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
            Link link = linkRepository.findById(dtoLink.getId()).orElse(null);
            entity.getLinks().add(link);
        }
    }
}
