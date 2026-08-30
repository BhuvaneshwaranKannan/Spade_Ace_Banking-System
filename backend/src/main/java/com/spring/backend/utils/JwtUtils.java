package com.spring.backend.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private final String SECRET = "VISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHIVISHI";
    private final long EXPIRATION = 1000 * 60 * 60;

    private final javax.crypto.SecretKey secretKey =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .issuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(secretKey, SignatureAlgorithm.HS256 )
                .compact();
    }

    public String extractUserId(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }


    public boolean validateJwtToken(String token) {
        try {

            extractUserId(token);
            return true;
        } catch (JwtException exception) {
            return false;
        }
    }

}

