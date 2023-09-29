package com.onlyoffice.authorization.api.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;
import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "identity_clients")
public class Client {
    @Id
    @Column(name = "client_id", unique = true, length = 36)
    private String clientId;
    @Column(name = "client_name")
    private String name;
    private String description;
    @Column(name = "client_secret", unique = true, length = 36)
    private String clientSecret;
    @Column(name = "terms_url")
    private String termsUrl;
    @Column(name = "policy_url")
    private String policyUrl;
    @Column(name = "logo_url")
    private String logoUrl;
    @Column(name = "client_issued_at")
    @CreatedDate
    private Timestamp clientIssuedAt;
    @Column(name = "authentication_method", length = 100)
    private String authenticationMethod;
    @Column(name = "redirect_uri")
    @Lob
    private String redirectUri;
    @Column(name = "logout_redirect_uri")
    @Lob
    private String logoutRedirectUri;
    @Column(name = "scopes")
    @Lob
    private String scopes;
    @ManyToOne
    @JoinColumn(name="tenant_id", nullable=false)
    private Tenant tenant;
    @Column(name = "invalidated")
    private Boolean invalidated;
    @PrePersist
    public void prePersist() {
        this.clientIssuedAt = Timestamp.from(Instant.now());
    }
}