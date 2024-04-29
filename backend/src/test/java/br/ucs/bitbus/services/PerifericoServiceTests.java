package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.PerifericoDTO;
import br.ucs.bitbus.dtos.TipoItemDTO;
import br.ucs.bitbus.entities.Periferico;
import br.ucs.bitbus.repositories.PerifericoRepository;
import br.ucs.bitbus.repositories.ItemRepository;
import br.ucs.bitbus.repositories.TipoItemRepository;
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
public class PerifericoServiceTests {

    @InjectMocks
    private PerifericoService service;
    @Mock
    private PerifericoRepository repository;
    @Mock
    private ItemRepository itemRepository;
    @Mock
    private TipoItemRepository tipoItemRepository;

    private long existingId, nonExistingId, dependentId;
    private String name;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 2L;
        name = "Example";

        Periferico object = Factory.createPeriferico();
        PageImpl<Periferico> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findByNomeContainingIgnoreCase(eq(name), any())).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);
        Mockito.doThrow(DatabaseException.class).when(repository).deleteById(dependentId);

        // dependencies
        Mockito.when(tipoItemRepository.findById(existingId)).thenReturn(Optional.of(Factory.createTipoItem()));
        Mockito.when(tipoItemRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<PerifericoDTO> result = service.findAllByName(name, pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        PerifericoDTO result = service.findById(existingId);
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
    public void insertShouldReturnPerifericoDtoWhenValidData() {
        PerifericoDTO perifericoDTO = Factory.createPerifericoDTO();
        PerifericoDTO result = service.insert(perifericoDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(perifericoDTO.getNome(), result.getNome());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingTipoItemId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            PerifericoDTO perifericoDTO = Factory.createPerifericoDTO();
            TipoItemDTO tipoItemDTO = Factory.createTipoItemDTO();
            tipoItemDTO.setId(nonExistingId);
            perifericoDTO.setTipoItem(tipoItemDTO);
            service.insert(perifericoDTO);
        });
    }

    @Test
    public void updateShouldReturnPerifericoDtoWhenExistingId() {
        PerifericoDTO perifericoDTO = Factory.createPerifericoDTO();
        PerifericoDTO result = service.update(existingId, perifericoDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(perifericoDTO.getNome(), result.getNome());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            PerifericoDTO perifericoDTO = Factory.createPerifericoDTO();
            service.update(nonExistingId, perifericoDTO);
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
