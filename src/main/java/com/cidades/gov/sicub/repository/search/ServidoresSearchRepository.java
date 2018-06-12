package com.cidades.gov.sicub.repository.search;

import com.cidades.gov.sicub.domain.Servidores;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Servidores entity.
 */
public interface ServidoresSearchRepository extends ElasticsearchRepository<Servidores, Long> {
}
