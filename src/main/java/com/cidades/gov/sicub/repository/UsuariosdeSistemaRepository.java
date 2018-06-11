package com.cidades.gov.sicub.repository;

import com.cidades.gov.sicub.domain.UsuariosdeSistema;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the UsuariosdeSistema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuariosdeSistemaRepository extends JpaRepository<UsuariosdeSistema, Long> {
    @Query("select distinct usuariosde_sistema from UsuariosdeSistema usuariosde_sistema left join fetch usuariosde_sistema.servidores")
    List<UsuariosdeSistema> findAllWithEagerRelationships();

    @Query("select usuariosde_sistema from UsuariosdeSistema usuariosde_sistema left join fetch usuariosde_sistema.servidores where usuariosde_sistema.id =:id")
    UsuariosdeSistema findOneWithEagerRelationships(@Param("id") Long id);

}
