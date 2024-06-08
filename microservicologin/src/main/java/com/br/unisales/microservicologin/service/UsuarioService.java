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
        /*Usuario novo = new Usuario(null, "Vito Franzosi", "M", "vito.franzosi@gmail.com", "123456", "Administrador");
        this.repo.save(novo);
        novo = new Usuario(null, "Francesco Franzosi", "M", "francesco.franzosi@gmail.com", "123456", "Cliente");
        this.repo.save(novo);*/
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
    public List<UsuarioModel> listarPorParametros(String nome, String sexo, String email, String grupo) {
        List<Usuario> lista = new ArrayList<Usuario>();
        if((email!=null) && (email.trim().length()>0)) {
            Optional<Usuario> usuario = this.repo.findByEmail(email);
            if(usuario.isPresent())
                lista.add(usuario.get());
        } else if((nome!=null) && ((nome.trim()).length()>0)) {
                if(((grupo!=null)) && ((grupo.trim()).length()>0) && (!grupo.equals("Todos"))) {
                    if((sexo!=null) && ((sexo.trim()).length()>0) && (!sexo.equals("T")))
                        lista = this.repo.findByNomeIgnoreCaseContainingAndSexoAndGrupoOrderByNome(nome, sexo, grupo);
                    else
                        lista = this.repo.findByNomeIgnoreCaseContainingAndGrupoOrderByNome(nome, grupo);
                } else if((sexo!=null) && ((sexo.trim()).length()>0) && (!sexo.equals("T")))
                    lista = this.repo.findByNomeIgnoreCaseContainingAndSexoOrderByNome(nome, sexo);
                else
                    lista = this.repo.findByNomeIgnoreCaseContainingOrderByNome(nome);
        } else if(((grupo!=null)) && ((grupo.trim()).length()>0) && (!grupo.equals("Todos"))) {
            if((sexo!=null) && ((sexo.trim()).length()>0) && (!sexo.equals("T")))
                lista = this.repo.findBySexoAndGrupoOrderByNome(sexo, grupo);
            else
                lista = this.repo.findByGrupoOrderByNome(grupo);
        } else if((sexo!=null) && ((sexo.trim()).length()>0) && (!sexo.equals("T")))
            lista = this.repo.findBySexoOrderByNome(sexo);
        else
            lista = this.repo.findAll();
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
     * @apiNote Método responsável por salvar o usuário no banco de dados
     * @param Integer id
     * @param String nome
     * @param String email
     * @param String senha
     * @param String grupo
     * @return UsuarioModel
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 28.04.2024
     */
    public UsuarioModel salvar(Integer id, String nome, String sexo, String email, String senha, String grupo) {
        Usuario usuario = new Usuario();
        if((id!=null) && (id!=0)) {
            Optional<Usuario> usuarioOptional = this.repo.findById(id);
            if(usuarioOptional.isPresent())
                usuario = usuarioOptional.get();
        }
        usuario.setEmail(email);
        usuario.setGrupo(grupo);
        usuario.setNome(nome);
        if((senha.trim()).length()>0)
            usuario.setSenha(senha);
        //usuario.setSexo(sexo);
        usuario = this.repo.save(usuario);
        return this.converterUsuarioToModel(usuario);
    }

    /**
     * @apiNote Método responsável por excluir um usuário do banco de dados
     * @param Integer id
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 28.04.2024
     */
    public void excluir(Integer id) {
        Optional<Usuario> usuarioOptional = this.repo.findById(id);
        if(usuarioOptional.isPresent())
            this.repo.delete(usuarioOptional.get());
    }

    /**
     * @apiNote Método responsável por converter um usuário no seu modelo
     * @param Usuario usuario
     * @return UsuarioModel
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 24.04.2024
     */
    private UsuarioModel converterUsuarioToModel(Usuario usuario) {
        return new UsuarioModel(usuario.getId(), usuario.getNome(), usuario.getSexo(), usuario.getEmail(), usuario.getGrupo(), null);
    }
}
