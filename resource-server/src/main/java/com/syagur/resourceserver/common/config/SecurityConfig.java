package com.syagur.resourceserver.common.config;

import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

@KeycloakConfiguration
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);

        http.httpBasic().disable()
                .csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
                .antMatchers("/sso/login").permitAll()
                .antMatchers("/swagger-resources/**", "/v2/api-docs", "/configuration/**",
                        "/webjars/**", "/swagger*/**").permitAll()
                .antMatchers("/actuator/*").permitAll()
                .antMatchers(HttpMethod.GET, "/realties/").hasAnyAuthority("ADMIN", "USER")
                .antMatchers("/token/**").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.POST, "/realties/").hasAuthority("USER")
                .antMatchers(HttpMethod.DELETE, "/realties/{id}/").hasAuthority("USER")
                .antMatchers(HttpMethod.PATCH, "/realties/{id}/").hasAuthority("USER")
                .antMatchers(HttpMethod.GET, "/realties/{id}/").hasAnyAuthority("ADMIN", "USER")
                .antMatchers("/realties/my/").hasAuthority("USER")
                .antMatchers("/realties/deleted/").hasAuthority("ADMIN")
                .antMatchers("/realties/deleted/{id}/").hasAuthority("ADMIN")
                .antMatchers("/users/**").hasAuthority("ADMIN")
                .anyRequest().authenticated();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        SimpleAuthorityMapper grantedAuthorityMapper = new SimpleAuthorityMapper();
        grantedAuthorityMapper.setPrefix("ROLE_");

        KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(grantedAuthorityMapper);

        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

    @Bean
    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
    }

}
