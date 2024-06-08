package com.br.unisales.microservicologin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

/**
 * @apiNote Classe responsável pela navegação no sistema
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 25.04.2024
 */
@Controller
public class MainController {

    /**
     * @apiNote Método responsável por enviar a página html index.html para o navegador 
     * @return String (endereço da página html)
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 25.04.2024
     */
    @GetMapping("/")
    public String index() {
        return "./pages/templates/template_site.html";
    }

    /**
     * @apiNote Método responsável por enviar o template da página html template_manager.html para o navegador 
     * @return String (endereço da página html)
     * 
     * @author Vito Rodrigues Franzosi
     * @Data Criação 25.04.2024
     */
    @GetMapping("/manager")
    public String manager(HttpServletRequest request) {
        if((request.getSession()!=null) && (request.getSession().getAttribute("usuario")!=null))
            return "./pages/templates/template_manager.html";
        return "./pages/templates/template_site.html";
    }
}
