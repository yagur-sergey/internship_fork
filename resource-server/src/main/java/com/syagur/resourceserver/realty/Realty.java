package com.syagur.resourceserver.realty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "realty")
public class Realty implements Serializable {

    @Id
    private String id;
    private Double price;
    private Double square;
    private LocalDate dateOfCreation;
    private RealtyType type;
    private String description;
    private boolean isDeleted;
    private String ownerEmail;

    private LocalDate dateOfBuilding;

    private String city;
    private String street;
    private String house;

}
