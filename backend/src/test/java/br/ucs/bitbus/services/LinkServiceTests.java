package br.ucs.bitbus.services;

import br.ucs.bitbus.dtos.LinkDTO;
import br.ucs.bitbus.entities.Link;
import br.ucs.bitbus.repositories.ItemRepository;
import br.ucs.bitbus.repositories.LinkRepository;
import br.ucs.bitbus.services.exceptions.ResourceNotFoundException;
import br.ucs.bitbus.util.Factory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
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
public class LinkServiceTests {

    @InjectMocks
    private LinkService service;
    @Mock
    private LinkRepository repository;
    @Mock
    private ItemRepository itemRepository;

    private long existingId;
    private long nonExistingId;

    @BeforeEach
    void setUp() {
        existingId = 1L;
        nonExistingId = 1000L;

        Link object = Factory.createLink();
        PageImpl<Link> page = new PageImpl<>(List.of(object));

        Mockito.when(repository.findAll(any(Pageable.class))).thenReturn(page);

        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(object));
        Mockito.when(repository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);

        Mockito.when(repository.save(any())).thenReturn(object);

        Mockito.doNothing().when(repository).deleteById(existingId);
        Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);

        // dependencies
        Mockito.when(itemRepository.findById(existingId)).thenReturn(Optional.of(Factory.createItem()));
        Mockito.when(itemRepository.findById(nonExistingId)).thenThrow(ResourceNotFoundException.class);
    }

    @Test
    public void findAllShouldReturnPage() {
        Pageable pageable = PageRequest.of(0,10);
        Page<LinkDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void findByIdShouldReturnObjectWhenExistingId() {
        LinkDTO result = service.findById(existingId);
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
    public void insertShouldReturnLinkDtoWhenValidData() {
        LinkDTO linkDTO = Factory.createLinkDTO();
        LinkDTO result = service.insert(linkDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(linkDTO.getUrl(), result.getUrl());
    }

    @Test
    public void insertShouldThrowResourceNotFoundExceptionWhenNonExistingItemId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            LinkDTO linkDTO = Factory.createLinkDTO();
            linkDTO.setItemId(nonExistingId);
            service.insert(linkDTO);
        });
    }

    @Test
    public void updateShouldReturnLinkDtoWhenExistingId() {
        LinkDTO linkDTO = Factory.createLinkDTO();
        LinkDTO result = service.update(existingId, linkDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(linkDTO.getUrl(), result.getUrl());
    }

    @Test
    public void updateShouldThrowEntityNotFoundExceptionWhenNonExistingId() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            LinkDTO linkDTO = Factory.createLinkDTO();
            service.update(nonExistingId, linkDTO);
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
