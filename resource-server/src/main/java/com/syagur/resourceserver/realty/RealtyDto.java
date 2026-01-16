package com.syagur.resourceserver.realty;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RealtyDto {

    private String id;
    private Double price;
    private Double square;
    private String dateOfCreation;
    private String type;
    private String description;
    private String ownerEmail;

    private String dateOfBuilding;

    private String city;
    private String street;
    private String house;

}
