package com.syagur.resourceserver.realty;

import com.syagur.resourceserver.common.exception.exceptions.NoRightsForActionException;
import com.syagur.resourceserver.common.exception.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class RealtyService {

    private final RealtyRepository realtyRepository;

    @Value("${message.resourceNotFound.realty.one}")
    private String messageForOne;
    @Value("${message.resourceNotFound.realty.list}")
    private String messageForList;
    @Value("${message.noRightsForAction}")
    private String messageForAction;

    public Realty findById(String id) {
        return realtyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageForOne));
    }

    public Page<Realty> findAll(Pageable pageable) {
        return realtyRepository.findByIsDeletedFalse(pageable)
                .orElseThrow(() -> new ResourceNotFoundException(this.messageForList));
    }

    public Page<Realty> findByOwner(String owner, Pageable pageable) {
        return realtyRepository.findByOwnerEmailAndIsDeletedFalse(owner, pageable)
                .orElseThrow(() -> new ResourceNotFoundException(messageForList));
    }

    public void deleteById(String id) {
        Realty realty = realtyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageForOne));
        realty.setDeleted(true);
        realtyRepository.deleteById(id);
        realtyRepository.save(realty);
    }

    public void edit(Realty realty, String owner) {
        realty.setOwnerEmail(owner);
        realtyRepository.deleteById(realty.getId());
        realtyRepository.save(realty);
    }

    public void save(Realty realty) {
        realty.setDeleted(false);
        realty.setDateOfCreation(LocalDate.now());
        realtyRepository.save(realty);
    }

    public void isOwner(String ownerEmail, String realtyId) {
        Realty realty = realtyRepository.findById(realtyId)
                .orElseThrow(() -> new ResourceNotFoundException(messageForOne));
        if (!ownerEmail.equals(realty.getOwnerEmail())) {
            throw new NoRightsForActionException(messageForAction);
        }
    }

}
