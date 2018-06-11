package com.cidades.gov.sicub.repository;

import com.cidades.gov.sicub.domain.Servidores;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Servidores entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServidoresRepository extends JpaRepository<Servidores, Long> {

}
