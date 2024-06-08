package com.br.unisales.microservicologin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.br.unisales.microservicologin.model.UsuarioModel;
import com.br.unisales.microservicologin.service.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService servico;

    @PostMapping("/login")
    public ResponseEntity<UsuarioModel> login(@RequestParam("email") String email, @RequestParam("senha") String senha, HttpServletRequest request) {
        UsuarioModel modelo = this.servico.login(email, senha);
        if((modelo!=null) && (modelo.getId()!=null)) {
            request.getSession().setAttribute("usuario", modelo);
            return ResponseEntity.status(HttpStatus.OK).body(modelo);
        }
        /*JSONObject json = new JSONObject();
		json.put("menssagem", "Usuário não encontrado no sistema!");*/
        return ResponseEntity.status(HttpStatus.FOUND).body(new UsuarioModel());
    }
}
