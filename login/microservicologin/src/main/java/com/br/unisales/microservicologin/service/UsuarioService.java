package com.br.unisales.microservicologin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.unisales.microservicologin.model.UsuarioModel;
import com.br.unisales.microservicologin.repository.UsuarioRepository;
import com.br.unisales.microservicologin.table.Usuario;


/**
 * @apiNote Classe responsável por responder as solicitações do controller em relação ao usuário
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 24.04.2024
 */
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repo;

    /**
     * @apiNote Método responsável por realizar o login no sistema
     * @param String email
     * @param String senha
     * @return UsuarioModel
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    public UsuarioModel login(String email, String senha) {
        Usuario novo = new Usuario(null, "Vito Franzosi", "vito.franzosi@gmail.com", "1234567", "Administrador", senha);
        this.repo.save(novo);
        novo = new Usuario(null, "Francesco Franzosi", "francesco.franzosi@gmail.com", "1234567", "Cliente", senha);
        this.repo.save(novo);
        Optional<Usuario> usuario = this.repo.findByEmailAndSenha(email, senha);
        if(usuario.isPresent())
            return this.converterUsuarioToModel(usuario.get());
        return new UsuarioModel();
    }

    /**
     * @apiNote Método responsável por listar todos os usuários cadastrados
     * @return List<UsuarioModel>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    public List<UsuarioModel> listar() {
        List<Usuario> lista = this.repo.findAll();
        List<UsuarioModel> listaModelo = new ArrayList<UsuarioModel>();
        for(Usuario item: lista)
            listaModelo.add(this.converterUsuarioToModel(item));
        return listaModelo;
    }

    /**
     * @apiNote Método responsável por listar todos os usuários cadastrados
     * @return List<UsuarioModel>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    public List<UsuarioModel> listarPorParametros(String nome, String email, String grupo) {
        List<Usuario> lista = new ArrayList<Usuario>();
        if((email!=null) && (email.trim().length()>0)) {
            Optional<Usuario> usuario = this.repo.findByEmail(email);
            if(usuario.isPresent())
                lista.add(usuario.get());
        }
        List<UsuarioModel> listaModelo = new ArrayList<UsuarioModel>();
        for(Usuario item: lista)
            listaModelo.add(this.converterUsuarioToModel(item));
        return listaModelo;
    }

    /**
     * @apiNote Método responsável por buscar o usuário pelo seu id
     * @return UsuarioModel
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    public UsuarioModel buscarPorId(Integer id) {
        Optional<Usuario> usuario = this.repo.findById(id);
        UsuarioModel model = new UsuarioModel();
        if(usuario.isPresent())
            model = this.converterUsuarioToModel(usuario.get());
        return model;
    }

    /**
     * @apiNote Método responsável por converter um usuário no seu modelo
     * @param usuario
     * @return UsuarioModel
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    private UsuarioModel converterUsuarioToModel(Usuario usuario) {
        UsuarioModel modelo = new UsuarioModel(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getGrupo());
        return modelo;
    }
}
