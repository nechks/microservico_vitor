package com.br.unisales.microservicologin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @apiNote Classe que representa o modelo da classe cliente do sistema micro serviço cliente
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 30.04.2024
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteModel {
    private Integer id;
    private Integer idUsuario;
    private String nome;
    private String sexo;
    private String cpf;
}
