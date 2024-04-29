package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.PapelDTO;
import br.ucs.bitbus.entities.Papel;
import br.ucs.bitbus.repositories.PapelRepository;
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

@ExtendWith(SpringExtension.class)
public class PapelServiceTests {

    @InjectMocks
    private PapelService service;
    @Mock
    private PapelRepository repository;

    private long existingId, nonExistingId, dependentId;
    private String duplicatedDescription;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 2L;
        duplicatedDescription = "duplicatedDescription";

        Papel object = Factory.createPapel();
        PageImpl<Papel> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);
        Mockito.doThrow(DatabaseException.class).when(repository).deleteById(dependentId);

        // duplicated
        Mockito.doThrow(DuplicatedResourceException.class).when(repository).findByDescricao(duplicatedDescription);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<PapelDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        PapelDTO result = service.findById(existingId);
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
    public void insertShouldReturnPapelDtoWhenValidData() {
        PapelDTO papelDTO = Factory.createPapelDTO();
        PapelDTO result = service.insert(papelDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(papelDTO.getDescricao(), result.getDescricao());
    }

    @Test
    public void insertShouldThrowDuplicatedResourceExceptionWhenDescricaoAlreadyExists() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            PapelDTO papelDTO = Factory.createPapelDTO();
            papelDTO.setDescricao(duplicatedDescription);
            service.insert(papelDTO);
        });
    }

    @Test
    public void updateShouldReturnPapelDtoWhenExistingId() {
        PapelDTO PapelDTO = Factory.createPapelDTO();
        PapelDTO result = service.update(existingId, PapelDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(PapelDTO.getDescricao(), result.getDescricao());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            PapelDTO PapelDTO = Factory.createPapelDTO();
            service.update(nonExistingId, PapelDTO);
        });
    }

    @Test
    public void updateShouldThrowDuplicatedResourceExceptionWhenDescricaoAlreadyExists() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            PapelDTO papelDTO = Factory.createPapelDTO();
            papelDTO.setDescricao(duplicatedDescription);
            service.update(existingId, papelDTO);
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
