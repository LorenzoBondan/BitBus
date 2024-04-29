package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.FeedbackDTO;
import br.ucs.bitbus.entities.Feedback;
import br.ucs.bitbus.repositories.PessoaRepository;
import br.ucs.bitbus.repositories.FeedbackRepository;
import br.ucs.bitbus.repositories.VisitaRepository;
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

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(SpringExtension.class)
public class FeedbackServiceTests {

    @InjectMocks
    private FeedbackService service;
    @Mock
    private FeedbackRepository repository;
    @Mock
    private PessoaRepository pessoaRepository;
    @Mock
    private VisitaRepository visitaRepository;

    private long existingId, nonExistingId, duplicatedId;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;
        duplicatedId = 2L;

        Feedback object = Factory.createFeedback();
        PageImpl<Feedback> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);

        // duplicated
        Mockito.doThrow(UniqueConstraintViolationException.class).when(repository).findByAutorAndVisita(duplicatedId, duplicatedId);

        // dependencies
        Mockito.when(pessoaRepository.findById(existingId)).thenReturn(Optional.of(Factory.createPessoa()));
        Mockito.when(pessoaRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(visitaRepository.findById(existingId)).thenReturn(Optional.of(Factory.createVisita()));
        Mockito.when(visitaRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<FeedbackDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        FeedbackDTO result = service.findById(existingId);
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
    public void insertShouldReturnFeedbackDtoWhenValidData() {
        FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
        FeedbackDTO result = service.insert(feedbackDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(feedbackDTO.getComentario(), result.getComentario());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingAutorAndVisitaId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
            feedbackDTO.setAutorId(nonExistingId);
            service.insert(feedbackDTO);
        });

        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
            feedbackDTO.setVisitaId(nonExistingId);
            service.insert(feedbackDTO);
        });
    }

    @Test
    public void insertShouldThrowUniqueConstraintValidationExceptionWhenFeedbackForThisAutorAndVisitaAlreadyExists() {
        Assertions.assertThrows(UniqueConstraintViolationException.class, () -> {
            FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
            feedbackDTO.setAutorId(duplicatedId);
            feedbackDTO.setVisitaId(duplicatedId);
            service.insert(feedbackDTO);
        });
    }

    @Test
    public void updateShouldReturnFeedbackDtoWhenExistingId() {
        FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
        FeedbackDTO result = service.update(existingId, feedbackDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(feedbackDTO.getComentario(), result.getComentario());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            FeedbackDTO feedbackDTO = Factory.createFeedbackDTO();
            service.update(nonExistingId, feedbackDTO);
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
