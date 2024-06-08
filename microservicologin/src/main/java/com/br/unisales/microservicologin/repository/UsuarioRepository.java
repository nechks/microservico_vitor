package com.br.unisales.microservicologin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.unisales.microservicologin.table.Usuario;

/**
 * @apiNote Classe responsável por realizar o CRUD na tabela usuário do banco de dados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 24.04.2024
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
    Optional<Usuario> findByEmail(String email);
    List<Usuario> findByNomeIgnoreCaseContainingAndSexoAndGrupoOrderByNome(String nome, String sexo, String grupo);
    List<Usuario> findByNomeIgnoreCaseContainingAndGrupoOrderByNome(String nome, String grupo);
    List<Usuario> findByNomeIgnoreCaseContainingAndSexoOrderByNome(String nome, String sexo);
    List<Usuario> findByNomeIgnoreCaseContainingOrderByNome(String nome);
    List<Usuario> findBySexoAndGrupoOrderByNome(String sexo, String grupo);
    List<Usuario> findByGrupoOrderByNome(String grupo);
    List<Usuario> findBySexoOrderByNome(String sexo);
}
