package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.DoacaoDTO;
import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Doacao;
import br.ucs.bitbus.entities.Item;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.ItemRepository;
import br.ucs.bitbus.repositories.LinkRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
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
public class DoacaoService {

    @Autowired
    private DoacaoRepository repository;
    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private ItemRepository itemRepository;

    @Transactional(readOnly = true)
    public Page<DoacaoDTO> findAllPaged(Pageable pageable) {
        Page<Doacao> list = repository.findAll(pageable);
        return list.map(DoacaoDTO::new);
    }

    @Transactional(readOnly = true)
    public DoacaoDTO findById(Long id) {
        Doacao entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        return new DoacaoDTO(entity);
    }

    @Transactional
    public DoacaoDTO insert(DoacaoDTO dto) {
        Doacao entity = new Doacao();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new DoacaoDTO(entity);
    }

    @Transactional
    public DoacaoDTO update(Long id, DoacaoDTO dto) {
        Doacao entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Objeto não encontrado: " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new DoacaoDTO(entity);
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

    private void copyDtoToEntity(DoacaoDTO dto, Doacao entity) {
        entity.setDescricao(dto.getDescricao());
        entity.setValor(dto.getValor());
        entity.setDoador(pessoaRepository.findById(dto.getDoador().getId()).orElseThrow(() -> new ResourceNotFoundException("Doador não encontrado")));

        entity.getItens().clear();
        for(Long itemId : dto.getItensIds()){
            Item item = itemRepository.findById(itemId).orElseThrow(() -> new ResourceNotFoundException("Item não encontrado: " + itemId));
            entity.getItens().add(item);
            item.setDoacao(entity);
        }
    }
}
