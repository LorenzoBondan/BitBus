package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.DoacaoDTO;
import br.ucs.bitbus.dtos.PessoaDTO;
import br.ucs.bitbus.entities.Doacao;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.ItemRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import br.ucs.bitbus.util.Factory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
public class DoacaoServiceTests {

    @InjectMocks
    private DoacaoService service;
    @Mock
    private DoacaoRepository repository;
    @Mock
    private PessoaRepository pessoaRepository;
    @Mock
    private ItemRepository itemRepository;

    private long existingId;
    private long nonExistingId;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;

        Doacao object = Factory.createDoacao();
        PageImpl<Doacao> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);

        // dependencies
        Mockito.when(pessoaRepository.findById(existingId)).thenReturn(Optional.of(Factory.createPessoa()));
        Mockito.when(pessoaRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(itemRepository.findById(existingId)).thenReturn(Optional.of(Factory.createItem()));
        Mockito.when(itemRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<DoacaoDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        DoacaoDTO result = service.findById(existingId);
        Assertions.assertNotNull(result);
        Mockito.verify(repository).findById(existingId);
    }

    @Test
    public void findByIdShouldThrowResourceNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.findById(nonExistingId);
        });
        Mockito.verify(repository).findById(nonExistingId);
    }

    @Test
    public void insertShouldReturnDoacaoDtoWhenValidData() {
        DoacaoDTO doacaoDTO = Factory.createDoacaoDTO();
        DoacaoDTO result = service.insert(doacaoDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(doacaoDTO.getDescricao(), result.getDescricao());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingAutorAndVisitaId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            DoacaoDTO doacaoDTO = Factory.createDoacaoDTO();
            PessoaDTO doador = Factory.createPessoaDTO();
            doador.setId(nonExistingId);
            doacaoDTO.setDoador(doador);
            service.insert(doacaoDTO);
        });

        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            DoacaoDTO doacaoDTO = Factory.createDoacaoDTO();
            doacaoDTO.setItens(List.of(Factory.createItemDTO()));
            service.insert(doacaoDTO);
        });

    }

    @Test
    public void updateShouldReturnDoacaoDtoWhenExistingId() {
        DoacaoDTO doacaoDTO = Factory.createDoacaoDTO();
        DoacaoDTO result = service.update(existingId, doacaoDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(doacaoDTO.getDescricao(), result.getDescricao());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            DoacaoDTO doacaoDTO = Factory.createDoacaoDTO();
            service.update(nonExistingId, doacaoDTO);
        });
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {
        Assertions.assertDoesNotThrow( () -> {
            service.delete(existingId);
        });
        Mockito.verify(repository).deleteById(existingId);
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistingId);
        });
        Mockito.verify(repository).deleteById(nonExistingId);
    }
}
