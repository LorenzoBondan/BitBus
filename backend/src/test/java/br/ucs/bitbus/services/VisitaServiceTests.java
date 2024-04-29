package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.dtos.VisitaDTO;
import br.ucs.bitbus.dtos.PessoaDTO;
import br.ucs.bitbus.entities.Feedback;
import br.ucs.bitbus.entities.Visita;
import br.ucs.bitbus.repositories.FeedbackRepository;
import br.ucs.bitbus.repositories.VisitaRepository;
import br.ucs.bitbus.repositories.PessoaRepository;
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
public class VisitaServiceTests {

    @InjectMocks
    private VisitaService service;
    @Mock
    private VisitaRepository repository;
    @Mock
    private PessoaRepository pessoaRepository;

    private long existingId, nonExistingId;
    private LocalDateTime duplicatedDate;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        duplicatedDate = LocalDateTime.of(2024,2,2,2,2,2);

        Visita object = Factory.createVisita();
        PageImpl<Visita> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);

        // duplicated
        Mockito.doThrow(UniqueConstraintViolationException.class).when(repository).findByDataInicioAndDataFim(duplicatedDate, duplicatedDate);

        // dependencies
        Mockito.when(pessoaRepository.findById(existingId)).thenReturn(Optional.of(Factory.createPessoa()));
        Mockito.when(pessoaRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<VisitaDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        VisitaDTO result = service.findById(existingId);
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
    public void insertShouldReturnVisitaDtoWhenValidData() {
        VisitaDTO visitaDTO = Factory.createVisitaDTO();
        VisitaDTO result = service.insert(visitaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(visitaDTO.getLocal(), result.getLocal());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingReponsavelId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            VisitaDTO visitaDTO = Factory.createVisitaDTO();
            PessoaDTO responsavel = Factory.createPessoaDTO();
            responsavel.setId(nonExistingId);
            visitaDTO.setResponsavel(responsavel);
            service.insert(visitaDTO);
        });
    }

    @Test
    public void insertShouldThrowUniqueConstraintValidationExceptionWhenDateRangeIsAlreadyBusy() {
        Assertions.assertThrows(UniqueConstraintViolationException.class, () -> {
            VisitaDTO visitaDTO = Factory.createVisitaDTO();
            visitaDTO.setDataInicio(duplicatedDate);
            visitaDTO.setDataFim(duplicatedDate);
            service.insert(visitaDTO);
        });
    }

    @Test
    public void updateShouldReturnVisitaDtoWhenExistingId() {
        VisitaDTO visitaDTO = Factory.createVisitaDTO();
        VisitaDTO result = service.update(existingId, visitaDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(visitaDTO.getLocal(), result.getLocal());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            VisitaDTO visitaDTO = Factory.createVisitaDTO();
            service.update(nonExistingId, visitaDTO);
        });
    }

    @Test
    public void updateShouldThrowUniqueConstraintValidationExceptionWhenDateRangeIsAlreadyBusy() {
        Assertions.assertThrows(UniqueConstraintViolationException.class, () -> {
            VisitaDTO visitaDTO = Factory.createVisitaDTO();
            visitaDTO.setDataInicio(duplicatedDate);
            visitaDTO.setDataFim(duplicatedDate);
            service.update(existingId, visitaDTO);
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
