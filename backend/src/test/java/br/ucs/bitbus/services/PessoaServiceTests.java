package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.PapelDTO;
import br.ucs.bitbus.dtos.PessoaDTO;
import br.ucs.bitbus.entities.Pessoa;
import br.ucs.bitbus.repositories.PapelRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
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
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(SpringExtension.class)
public class PessoaServiceTests {

    @InjectMocks
    private PessoaService service;
    @Mock
    private PessoaRepository repository;
    @Mock
    private PapelRepository papelRepository;

    private long existingId, nonExistingId, dependentId;
    private String nome, duplicatedEmail;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 2L;
        nome = "Nome 1";
        duplicatedEmail = "duplicatedEmail@email.com";

        Pessoa object = Factory.createPessoa();
        PageImpl<Pessoa> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findByNomeContainingIgnoreCase(eq(nome), any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);
        Mockito.doThrow(DatabaseException.class).when(repository).deleteById(dependentId);

        // duplicated
        Mockito.doThrow(DuplicatedResourceException.class).when(repository).findByEmail(duplicatedEmail);

        // dependencies
        Mockito.when(papelRepository.findById(existingId)).thenReturn(Optional.of(Factory.createPapel()));
        Mockito.when(papelRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<PessoaDTO> result = service.findAllByName(nome, pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        PessoaDTO result = service.findById(existingId);
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
    public void insertShouldReturnPessoaDtoWhenValidData() {
        PessoaDTO PessoaDTO = Factory.createPessoaDTO();
        PessoaDTO result = service.insert(PessoaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(PessoaDTO.getNome(), result.getNome());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingPapelId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            PessoaDTO pessoaDTO = Factory.createPessoaDTO();
            PapelDTO papelDTO = Factory.createPapelDTO();
            papelDTO.setId(nonExistingId);
            pessoaDTO.setPapeis(List.of(papelDTO));
            service.insert(pessoaDTO);
        });
    }

    @Test
    public void insertShouldThrowDuplicatedResourceExceptionWhenEmailAlreadyExists() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            PessoaDTO pessoaDTO = Factory.createPessoaDTO();
            pessoaDTO.setEmail(duplicatedEmail);
            service.insert(pessoaDTO);
        });
    }

    @Test
    public void updateShouldReturnPessoaDtoWhenExistingId() {
        PessoaDTO PessoaDTO = Factory.createPessoaDTO();
        PessoaDTO result = service.update(existingId, PessoaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(PessoaDTO.getNome(), result.getNome());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            PessoaDTO PessoaDTO = Factory.createPessoaDTO();
            service.update(nonExistingId, PessoaDTO);
        });
    }

    @Test
    public void updateShouldThrowDuplicatedResourceExceptionWhenEmailAlreadyExists() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            PessoaDTO pessoaDTO = Factory.createPessoaDTO();
            pessoaDTO.setEmail(duplicatedEmail);
            service.update(existingId, pessoaDTO);
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

    @Test
    public void deleteShouldThrowDatabaseExceptionWhenIdIsDependent() {
        Assertions.assertThrows(DatabaseException.class, () -> {
            service.delete(dependentId);
        });
        Mockito.verify(repository).deleteById(dependentId);
    }
}
