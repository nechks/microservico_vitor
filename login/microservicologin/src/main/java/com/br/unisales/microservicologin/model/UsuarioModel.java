package com.br.unisales.microservicologin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @apiNote Classe que representa o modelo da classe Usuario
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 23.04.2024
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioModel {
	private Integer id;
	private String nome;
	private String email;
	private String grupo;
}
