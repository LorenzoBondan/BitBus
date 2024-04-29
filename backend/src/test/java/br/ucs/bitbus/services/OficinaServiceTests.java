package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.dtos.OficinaDTO;
import br.ucs.bitbus.dtos.PessoaDTO;
import br.ucs.bitbus.entities.Oficina;
import br.ucs.bitbus.repositories.OficinaRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.services.exceptions.DuplicatedResourceException;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import br.ucs.bitbus.services.exceptions.UniqueConstraintViolationException;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
public class OficinaServiceTests {

    @InjectMocks
    private OficinaService service;
    @Mock
    private OficinaRepository repository;
    @Mock
    private PessoaRepository pessoaRepository;

    private long existingId;
    private long nonExistingId;
    private LocalDateTime duplicatedDate;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        duplicatedDate = LocalDateTime.of(2024,2,2,2,2,2);

        Oficina object = Factory.createOficina();
        PageImpl<Oficina> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);

        // duplicated
        Mockito.doThrow(DuplicatedResourceException.class).when(repository).findByHorario(duplicatedDate);

        // dependencies
        Mockito.when(pessoaRepository.findById(existingId)).thenReturn(Optional.of(Factory.createPessoa()));
        Mockito.when(pessoaRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<OficinaDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        OficinaDTO result = service.findById(existingId);
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
    public void insertShouldReturnOficinaDtoWhenValidData() {
        OficinaDTO oficinaDTO = Factory.createOficinaDTO();
        OficinaDTO result = service.insert(oficinaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(oficinaDTO.getTitulo(), result.getTitulo());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingPalestranteId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            OficinaDTO oficinaDTO = Factory.createOficinaDTO();
            PessoaDTO palestrante = Factory.createPessoaDTO();
            palestrante.setId(nonExistingId);
            oficinaDTO.setPalestrante(palestrante);
            service.insert(oficinaDTO);
        });
    }

    @Test
    public void insertShouldThrowDuplicatedResourceExceptionWhenHorarioIsAlreadyBusy() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            OficinaDTO oficinaDTO = Factory.createOficinaDTO();
            oficinaDTO.setHorario(duplicatedDate);
            service.insert(oficinaDTO);
        });
    }

    @Test
    public void updateShouldReturnOficinaDtoWhenExistingId() {
        OficinaDTO oficinaDTO = Factory.createOficinaDTO();
        OficinaDTO result = service.update(existingId, oficinaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(oficinaDTO.getTitulo(), result.getTitulo());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            OficinaDTO oficinaDTO = Factory.createOficinaDTO();
            service.update(nonExistingId, oficinaDTO);
        });
    }

    @Test
    public void updateShouldThrowDuplicatedResourceExceptionWhenHorarioIsAlreadyBusy() {
        Assertions.assertThrows(DuplicatedResourceException.class, () -> {
            OficinaDTO oficinaDTO = Factory.createOficinaDTO();
            oficinaDTO.setHorario(duplicatedDate);
            service.update(existingId, oficinaDTO);
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
