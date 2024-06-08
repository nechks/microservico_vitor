package com.br.unisales.microservicologin.controller;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.br.unisales.microservicologin.model.ClienteModel;
import com.br.unisales.microservicologin.model.UsuarioModel;
import com.br.unisales.microservicologin.service.UsuarioService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

/**
 * @apiNote Classe responsável por receber as requisições do navegador (browser) em relação a tabela usuario
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 27.04.2024
 */
@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService servico;

    /**
     * @apiNote Método responsável por realizar o login do usuário no sistema
     * @param String email
     * @param String senha
     * @param HttpServletRequest request
     * @return ResponseEntity<UsuarioModel>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 27.04.2024
     */
    @PostMapping("/login")
    public ResponseEntity<UsuarioModel> login(@RequestParam("email") String email, @RequestParam("senha") String senha, HttpServletRequest request) {
        UsuarioModel modelo = this.servico.login(email, senha);
        if((modelo!=null) && (modelo.getId()!=null)) {
            modelo.setToken(this.criarToken().toString());
            request.getSession().setAttribute("usuario", modelo);
            return ResponseEntity.status(HttpStatus.OK).body(modelo);
        }
        /*JSONObject json = new JSONObject();
		json.put("menssagem", "Usuário não encontrado no sistema!");*/
        return ResponseEntity.status(HttpStatus.FOUND).body(new UsuarioModel());
    }

    /**
     * @apiNote Método responsável por buscar os usuários pelos parâmetros passados
     * @param String nome
     * @param String email
     * @param String grupo
     * @param HttpServletRequest request
     * @return ResponseEntity<List<UsuarioModel>>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 27.04.2024
     */
    @PostMapping("/listarUsuario")
    public ResponseEntity<List<UsuarioModel>> listarUsuario(@RequestParam("nome") String nome, @RequestParam("sexo") String sexo, @RequestParam("email") String email,
                                                            @RequestParam("grupo") String grupo, HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            List<UsuarioModel> lista = new ArrayList<UsuarioModel>();
            if(usuarioSession.getGrupo().equals("Administrador"))
                lista = this.servico.listarPorParametros(nome, sexo, email, grupo);
            else
                lista.add(usuarioSession);
            if((lista!=null) && lista.size()>0)
                return ResponseEntity.status(HttpStatus.OK).body(lista);
            return ResponseEntity.status(HttpStatus.FOUND).body(new ArrayList<UsuarioModel>());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    /**
     * @apiNote Método responsável por buscar o usuário pelo seu id
     * @param Integer id
     * @param HttpServletRequest request
     * @return ResponseEntity<UsuarioModel>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 27.04.2024
     */
    @PostMapping("/buscarUsuarioPorId")
    public ResponseEntity<UsuarioModel> buscarUsuarioPorId(@RequestParam("id") Integer id, HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            if(usuarioSession.getGrupo().equals("Administrador")) {
                usuarioSession = this.servico.buscarPorId(id);
                if((usuarioSession!=null) && (usuarioSession.getId()!=null))
                    return ResponseEntity.status(HttpStatus.OK).body(usuarioSession);
                else 
                    return ResponseEntity.status(HttpStatus.FOUND).body(new UsuarioModel());
            } else if(usuarioSession.getId()==id) 
                return ResponseEntity.status(HttpStatus.OK).body(usuarioSession);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    /**
     * @apiNote Método responsável por salvar os dados do usuário
     * @param Integer id
     * @param String nome
     * @param String sexo
     * @param String email
     * @param String grupo
     * @param HttpServletRequest request
     * @return ResponseEntity<UsuarioModel>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 28.04.2024
     */
    @PostMapping("/salvarUsuario")
    public ResponseEntity<UsuarioModel> salvarUsuario(@RequestParam("id") Integer id, @RequestParam("nome") String nome, @RequestParam("sexo") String sexo,
                                                      @RequestParam("email") String email, @RequestParam("grupo") String grupo,  @RequestParam("senha") String senha,
                                                      HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            if((usuarioSession!=null) && ((usuarioSession.getGrupo().equals("Administrador")) || (usuarioSession.getId()==id))) {
                UsuarioModel usuario = this.servico.salvar(id, nome, sexo, email, senha, grupo);
                if((usuario!=null) && (usuario.getId()!=null))
                    return ResponseEntity.status(HttpStatus.OK).body(usuario);
            }
            return ResponseEntity.status(HttpStatus.FOUND).body(new UsuarioModel());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    /**
     * @apiNote Método responsável por excluir o usuário
     * @param Integer id
     * @param HttpServletRequest request
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 28.04.2024
     */
    @PostMapping("/excluirUsuario")
    public ResponseEntity<String> excluirUsuario(@RequestParam("id") Integer id, @RequestParam("nome") String nome, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            if((usuarioSession!=null) && (usuarioSession.getGrupo().equals("Administrador")) && (usuarioSession.getId()!=id)) {
                String jsonCliente = this.buscarClientePorIdUsuario(id, usuarioSession.getToken()).getBody();
                try {
                    ObjectMapper mapper = new ObjectMapper();
                    List<ClienteModel> listaModel = mapper.readValue(jsonCliente, new TypeReference<List<ClienteModel>>(){});
                    ClienteModel clienteModel = listaModel.get(0);
                    String resultado = this.excluirCliente(clienteModel.getId(), usuarioSession.getToken()).getBody();
                    if((resultado!=null) && (resultado.equals("sucesso"))) {
                        this.servico.excluir(id);
                        json.put("id", id);
                        return ResponseEntity.status(HttpStatus.OK).body(json.toString());
                    }
                    json.put("resposta", "erro");
                    json.put("mensagem", "Os dados do usuário NÃO foram excluídos!");
                    return ResponseEntity.status(HttpStatus.OK).body(json.toString());
                } catch (Exception e) {
                    json.put("resposta", "erro");
                    json.put("mensagem", "Os dados do cliente NÃO foram excluídos!");
                    return ResponseEntity.status(HttpStatus.OK).body(json.toString());
                }
            } else {
                json.put("resposta", "Informação");
                json.put("mensagem", "Usuário não pode ser excluído!");
                return ResponseEntity.status(HttpStatus.FOUND).body(json.toString());
            }
        } else {
            json.put("resposta", "Erro");
            json.put("mensagem", "Usuário não está logado no sistema");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json.toString());
        }
    }

    /**
     * @apiNote Método responsável por finalizar o acesso (logout) do usuário no sistema
     * @param HttpServletRequest request
     * @return String
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 27.04.2024
     */
    @GetMapping("/sair")
    public String sair(HttpServletRequest request) {
        request.getSession().setAttribute("usuario", null);
        request.getSession().removeAttribute("usuario");
        return "";
    }

    /**
     * @apiNote Método responsável por criar o token
     * @return UUID
     *
     * @author Vito Rodrigues Franzosi
     * @Data Criação 30.04.2024
     */
    private UUID criarToken() {
        String chave = "Sistem de micro servico login";
        Charset charset = Charset.forName("ASCII");
        byte[] byteArrray = chave.getBytes(charset);
        return UUID.nameUUIDFromBytes(byteArrray); 
    }

    /**
     * 
     * @param id
     * @param token
     * @return
     */
    private ResponseEntity<String> buscarClientePorIdUsuario(Integer id, String token) {
        String url = "http://localhost:8090/buscarClientePorIdUsuario";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("id", id.toString());
        map.add("token", token);
        HttpEntity<MultiValueMap<String, String>> resposta = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, resposta, String.class);
        return ResponseEntity.status(HttpStatus.OK).body(response.getBody());
    }

    /**
     * @apiNote Método responsável por enviar os dados para a exclusão do cliente
     * @param Integer id
     * @param String token
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 03.05.2024
     */
    private ResponseEntity<String> excluirCliente(Integer id, String token) {
        String url = "http://localhost:8090/excluirCliente";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);       
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("id", id.toString());
        map.add("token", token);
        HttpEntity<MultiValueMap<String, String>> resposta = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, resposta, String.class);
        return ResponseEntity.status(HttpStatus.OK).body(response.getBody());

    }
}
