package com.syagur.resourceserver.common.util;

import com.syagur.resourceserver.realty.Realty;
import com.syagur.resourceserver.realty.RealtyDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface Converter {

    RealtyDto toRealtyDto(Realty realty);

    Realty toRealty(RealtyDto realtyDto);

}
