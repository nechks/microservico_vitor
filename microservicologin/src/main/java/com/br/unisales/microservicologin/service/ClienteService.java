package com.br.unisales.microservicologin.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.br.unisales.microservicologin.model.ClienteModel;

@Service
public class ClienteService {
    /**
     * @apiNote Método responsável por buscar no sistema de micro serviço cliente a lista de clientes cadastrados
     * @param String url
     * @param MultiValueMap<String, String> map
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 30.01.2024
     */
    public ResponseEntity<String> listarCliente(String url, MultiValueMap<String, String> map) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> resposta = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, resposta, String.class);
        return ResponseEntity.status(HttpStatus.OK).body(response.getBody());
    }

    /**
     * @apiNote Método responsável por buscar o cliente pelo seu id
     * @param Integer id
     * @param String token
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 03.05.2024
     */
    public ResponseEntity<String> buscarPorId(Integer id, String token) {
        String url = "http://localhost:8090/buscarClientePorId";
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
     * @apiNote Método responsável por buscar o cliente pelo seu id
     * @param Integer id
     * @param String token
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 03.05.2024
     */
    public ResponseEntity<String> buscarPorIdUsuario(Integer idUsuario, String token) {
        String url = "http://localhost:8090/buscarClientePorIdUsuario";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("id", idUsuario.toString());
        map.add("token", token);
        HttpEntity<MultiValueMap<String, String>> resposta = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, resposta, String.class);
        return ResponseEntity.status(HttpStatus.OK).body(response.getBody());
    }

    /**
     * @apiNote Método responsável por enviar os dados do cliente para serem salvos no micro serviço cliente
     * @param ClienteModel cliente
     * @param String token
     * @return ResponseEntity<String>
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 01.05.2024
     */
    public ResponseEntity<String> salvar(ClienteModel cliente, String token) {
        String url = "http://localhost:8090/salvarCliente";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("id", (cliente.getId()!=null ? cliente.getId().toString() : null));
        map.add("nome", cliente.getNome());
        map.add("sexo", cliente.getSexo());
        map.add("cpf", cliente.getCpf());
        map.add("id_usuario", cliente.getIdUsuario().toString());
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
    public ResponseEntity<String> excluir(Integer id, String token) {
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
