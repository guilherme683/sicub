package com.cidades.gov.sicub.repository.search;

import com.cidades.gov.sicub.domain.Scripts;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Scripts entity.
 */
public interface ScriptsSearchRepository extends ElasticsearchRepository<Scripts, Long> {
}
