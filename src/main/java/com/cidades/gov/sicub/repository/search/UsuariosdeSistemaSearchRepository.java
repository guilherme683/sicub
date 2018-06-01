package com.cidades.gov.sicub.repository.search;

import com.cidades.gov.sicub.domain.UsuariosdeSistema;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UsuariosdeSistema entity.
 */
public interface UsuariosdeSistemaSearchRepository extends ElasticsearchRepository<UsuariosdeSistema, Long> {
}
