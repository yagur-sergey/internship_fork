package com.syagur.resourceserver.realty;

import com.syagur.resourceserver.common.util.Converter;
import lombok.RequiredArgsConstructor;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

@RestController
@RequestMapping("/realties")
@RequiredArgsConstructor
public class RealtyController {

    private final RealtyService realtyService;
    private final Converter converter;
    private final HttpServletRequest request;

    @GetMapping
    public ResponseEntity<Page<RealtyDto>> getAll(
            @RequestParam(value = "pageNum", defaultValue = "0") Integer pageNum,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortWith", defaultValue = "ASC") String sortWith
    ) {

        Pageable pageable = getPageable(pageNum, sortBy, sortWith);

        Page<Realty> realties = realtyService.findAll(pageable);
        Page<RealtyDto> realtyDtos = realties.map(converter::toRealtyDto);

        return ResponseEntity.ok(realtyDtos);
    }

    @GetMapping("/my")
    ResponseEntity<Page<RealtyDto>> getRealtiesByUserId(
            @RequestParam(value = "pageNum", defaultValue = "0") Integer pageNum,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortWith", defaultValue = "ASC") String sortWith) {

        Pageable pageable = getPageable(pageNum, sortBy, sortWith);

        String owner = getAuthorizedUserEmail();

        Page<Realty> realty = realtyService.findByOwner(owner, pageable);
        Page<RealtyDto> realtyDtos = realty.map(converter::toRealtyDto);

        return ResponseEntity.ok(realtyDtos);
    }

    @GetMapping("/{id}")
    ResponseEntity<RealtyDto> getRealtyById(@PathVariable("id") String id) {
        RealtyDto realtyDto = converter.toRealtyDto(realtyService.findById(id));
        return ResponseEntity.ok(realtyDto);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody RealtyDto realtyDto) {

        Realty realty = converter.toRealty(realtyDto);
        realty.setOwnerEmail(getAuthorizedUserEmail());

        realtyService.save(withDefaultDescription(realty));

        URI location = fromCurrentRequest().buildAndExpand(realty.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<Void> patchReality(@PathVariable("id") String id, @RequestBody RealtyDto realtyDto) {

        String owner = getAuthorizedUserEmail();
        realtyService.isOwner(owner, id);

        Realty realty = converter.toRealty(realtyDto);
        realtyService.edit(realty, owner);

        return ResponseEntity.status(204).build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteRealty(@PathVariable("id") String id) {

        String owner = getAuthorizedUserEmail();
        realtyService.isOwner(owner, id);
        realtyService.deleteById(id);

        return ResponseEntity.status(204).build();
    }

    private Pageable getPageable(Integer pageNum, String sortBy, String sortWith) {
        return PageRequest.of(pageNum, 6, Sort.by(Sort.Direction.valueOf(sortWith), sortBy));
    }

    private String getAuthorizedUserEmail() {
        KeycloakSecurityContext context = (KeycloakSecurityContext) request.getAttribute(
                KeycloakSecurityContext
                        .class
                        .getName());
        return context.getToken().getEmail();
    }

    private Realty withDefaultDescription(Realty realty) {
        String desc = "This is " + realty.getType() + " with price " + realty.getPrice()
                + "$ and square " + realty.getSquare() + ". Build at " + realty.getDateOfBuilding() + ".";
        realty.setDescription(desc);
        return realty;
    }
}
