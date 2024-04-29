package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.MemoriaDTO;
import br.ucs.bitbus.entities.Memoria;
import br.ucs.bitbus.repositories.DoacaoRepository;
import br.ucs.bitbus.repositories.MemoriaRepository;
import br.ucs.bitbus.services.exceptions.DatabaseException;
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
public class MemoriaServiceTests {

    @InjectMocks
    private MemoriaService service;
    @Mock
    private MemoriaRepository repository;
    @Mock
    private DoacaoRepository doacaoRepository;

    private long existingId, nonExistingId, dependentId;
    private String name;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 2L;
        name = "Example";

        Memoria object = Factory.createMemoria();
        PageImpl<Memoria> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findByNomeContainingIgnoreCase(eq(name), any())).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);
        Mockito.doThrow(DatabaseException.class).when(repository).deleteById(dependentId);

        // dependencies

        Mockito.when(doacaoRepository.findById(existingId)).thenReturn(Optional.of(Factory.createDoacao()));
        Mockito.when(doacaoRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<MemoriaDTO> result = service.findAllByName(name, pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        MemoriaDTO result = service.findById(existingId);
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
    public void insertShouldReturnMemoriaDtoWhenValidData() {
        MemoriaDTO MemoriaDTO = Factory.createMemoriaDTO();
        MemoriaDTO result = service.insert(MemoriaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(MemoriaDTO.getNome(), result.getNome());
    }

    @Test
    public void updateShouldReturnMemoriaDtoWhenExistingId() {
        MemoriaDTO MemoriaDTO = Factory.createMemoriaDTO();
        MemoriaDTO result = service.update(existingId, MemoriaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(MemoriaDTO.getNome(), result.getNome());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            MemoriaDTO MemoriaDTO = Factory.createMemoriaDTO();
            service.update(nonExistingId, MemoriaDTO);
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
