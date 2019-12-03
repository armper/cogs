package com.aperea.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.aperea.web.rest.TestUtil;

public class SameCodeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SameCode.class);
        SameCode sameCode1 = new SameCode();
        sameCode1.setId(1L);
        SameCode sameCode2 = new SameCode();
        sameCode2.setId(sameCode1.getId());
        assertThat(sameCode1).isEqualTo(sameCode2);
        sameCode2.setId(2L);
        assertThat(sameCode1).isNotEqualTo(sameCode2);
        sameCode1.setId(null);
        assertThat(sameCode1).isNotEqualTo(sameCode2);
    }
}
