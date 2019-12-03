package com.aperea.repository;
import com.aperea.domain.CogBroadcastRights;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CogBroadcastRights entity.
 */
@Repository
public interface CogBroadcastRightsRepository extends JpaRepository<CogBroadcastRights, Long> {

    @Query(value = "select distinct cogBroadcastRights from CogBroadcastRights cogBroadcastRights left join fetch cogBroadcastRights.sameCodes",
        countQuery = "select count(distinct cogBroadcastRights) from CogBroadcastRights cogBroadcastRights")
    Page<CogBroadcastRights> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct cogBroadcastRights from CogBroadcastRights cogBroadcastRights left join fetch cogBroadcastRights.sameCodes")
    List<CogBroadcastRights> findAllWithEagerRelationships();

    @Query("select cogBroadcastRights from CogBroadcastRights cogBroadcastRights left join fetch cogBroadcastRights.sameCodes where cogBroadcastRights.id =:id")
    Optional<CogBroadcastRights> findOneWithEagerRelationships(@Param("id") Long id);

}
