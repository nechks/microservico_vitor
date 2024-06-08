package com.br.unisales.microservicologin.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.br.unisales.microservicologin.model.ClienteModel;
import com.br.unisales.microservicologin.model.UsuarioModel;
import com.br.unisales.microservicologin.service.ClienteService;
import com.br.unisales.microservicologin.service.UsuarioService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ClienteController {
    @Autowired
    private ClienteService servico;
    @Autowired
    private UsuarioService usuarioServico;

    /**
     * @apiNote Método responsável por buscar no sistema de micro serviço cliente a lista de clientes cadastrados
     * @param String nome
     * @param String sexo
     * @param String cpf
     * @param HttpServletRequest request
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 30.01.2024
     */
    @PostMapping("/listarCliente")
    public ResponseEntity<String> listarCliente(@RequestParam("nome") String nome,
                                                @RequestParam("sexo") String sexo,
                                                @RequestParam("cpf") String cpf,
                                                HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            String url = "http://localhost:8090/listarCliente";
            if(usuarioSession.getGrupo().equals("Cliente"))
                url="http://localhost:8090/buscarClientePorIdUsuario";
            MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
            if(usuarioSession.getGrupo().equals("Cliente"))
                map.add("id", usuarioSession.getId().toString());
            else {
                map.add("nome", nome);
                map.add("sexo", sexo);
                map.add("cpf", cpf);
            }
            map.add("token", usuarioSession.getToken());
            return this.servico.listarCliente(url, map);
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(null);
    }
 
    /**
     * @apiNote Método responsável por receber do navegador id do cliente para buscá-lo no banco de dados
     * @param Integer id
     * @param HttpServletRequest request
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 01.05.2024
     */
    @PostMapping("/buscarClientePorId")
    public ResponseEntity<String> buscarClientePorId(@RequestParam("id") Integer id, HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            return ResponseEntity.status(HttpStatus.OK).body(this.servico.buscarPorId(id, usuarioSession.getToken()).getBody());
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(null);
    }

    /**
     * @apiNote Método responsável por receber do navegador os dados do cliente para serem salvos
     * @param Integer id
     * @param Integer idUsuario
     * @param String nome
     * @param String sexo
     * @param String cpf
     * @param HttpServletRequest request
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 01.05.2024
     */
    @PostMapping("/salvarCliente")
    public ResponseEntity<String> salvarCliente(@RequestParam("id") Integer id, @RequestParam("idUsuario") Integer idUsuario,
                                                @RequestParam("nome") String nome, @RequestParam("sexo") String sexo,
                                                @RequestParam("cpf") String cpf, HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            ClienteModel cliente = new ClienteModel(id, idUsuario, nome, sexo, cpf);
            if((usuarioSession!=null) && (usuarioSession.getGrupo().equals("Administrador")))
                return this.servico.salvar(cliente, usuarioSession.getToken());
            else if((usuarioSession!=null) && (usuarioSession.getGrupo().equals("Cliente")) && (usuarioSession.getId()==cliente.getIdUsuario()))
                return this.servico.salvar(cliente, usuarioSession.getToken());
        }
        return ResponseEntity.status(HttpStatus.FOUND).body(null);
    }

    /**
     * @apiNote Método responsável por enviar o código do cliente que deverá ser excluído do banco d dados
     * @param Integer id
     * @param HttpServletRequest request
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 03.05.2024
     */
    @PostMapping("/excluirCliente")
    public ResponseEntity<String> excluirCliente(@RequestParam("id") Integer id, HttpServletRequest request) {
        JSONObject jsonResposta = new JSONObject();
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null)) {
            UsuarioModel usuarioSession = (UsuarioModel) request.getSession().getAttribute("usuario");
            if((usuarioSession!=null) && (usuarioSession.getGrupo().equals("Administrador"))) {
                String json = this.servico.buscarPorId(id, usuarioSession.getToken()).getBody();
                if((json!=null) && (!json.equals("erro"))) {
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        List<ClienteModel> listaModel = mapper.readValue(json, new TypeReference<List<ClienteModel>>(){});
                        ClienteModel modelo = listaModel.get(0);
                        if(modelo!=null) {
                            Integer idUsuario=modelo.getIdUsuario();
                            String resultado = this.servico.excluir(id, usuarioSession.getToken()).getBody();
                            if((resultado!=null) && (resultado.equals("sucesso"))) {
                                this.usuarioServico.excluir(idUsuario);
                                jsonResposta.put("id", id);
                                return ResponseEntity.status(HttpStatus.OK).body(jsonResposta.toString());
                            }
                            jsonResposta.put("resposta", "erro");
                            jsonResposta.put("mensagem", "Os dados do cliente NÃO foram excluídos!");
                            return ResponseEntity.status(HttpStatus.OK).body(jsonResposta.toString());
                        }
                    } catch (Exception e) {
                        jsonResposta.put("resposta", "erro");
                        jsonResposta.put("mensagem", "Os dados do cliente NÃO foram excluídos!");
                        return ResponseEntity.status(HttpStatus.OK).body(jsonResposta.toString());
                    }
                }
            }
        }
        jsonResposta.put("resposta", "erro");
        jsonResposta.put("mensagem", "O usuário não tem acesso a esta ação!");
        return ResponseEntity.status(HttpStatus.OK).body(jsonResposta.toString());
    }
}
