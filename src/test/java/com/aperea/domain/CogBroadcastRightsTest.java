package com.aperea.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.aperea.web.rest.TestUtil;

public class CogBroadcastRightsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CogBroadcastRights.class);
        CogBroadcastRights cogBroadcastRights1 = new CogBroadcastRights();
        cogBroadcastRights1.setId(1L);
        CogBroadcastRights cogBroadcastRights2 = new CogBroadcastRights();
        cogBroadcastRights2.setId(cogBroadcastRights1.getId());
        assertThat(cogBroadcastRights1).isEqualTo(cogBroadcastRights2);
        cogBroadcastRights2.setId(2L);
        assertThat(cogBroadcastRights1).isNotEqualTo(cogBroadcastRights2);
        cogBroadcastRights1.setId(null);
        assertThat(cogBroadcastRights1).isNotEqualTo(cogBroadcastRights2);
    }
}
