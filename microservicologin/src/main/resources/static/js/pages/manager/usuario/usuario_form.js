/**
 * @apiNote Função responsável por validar os dados do usuário
 * @param Json json
 * @returns String frase
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 28.04.2024
 */
function validarDados(json) {
    let frase='';
    if((json.nome==null) || ((json.nome.trim()).length<2))
        frase +='O campo nome não pode está com menos de 2 caracteres!<br>';
    if((json.sexo==null) ||  ((json.sexo.trim()).length==0))
        frase +='O campo sexo não pode está vazio!<br>';
    if((json.email==null) ||  ((json.email.trim()).length==0))
        frase +='O campo e-mail não pode está vazio!<br>';
    if((json.grupo==null) ||  ((json.grupo.trim()).length==0))
        frase +='O campo grupo não pode está vazio!<br>';
    if(((json.id==null) || (json.id==0)) && ((json.senha==null) || ((json.senha.trim()).length==0)))
        frase +='O campo senha não pode está vazio!<br>';
    return frase;
}

/**
 * @apiNote Função responsável por verificar se a senha é igual a confirma senha
 * @returns boolean
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 28.04.2024
 */
function validarSenha() {
    let senha=jQuery('#id_senha').val();
    let confirmaSenha=jQuery('#id_confirma_senha').val();
    if(senha==confirmaSenha)
        return true;
    return false;
}

/**
 * @apiNote Função responsável por salvar os dados do usuário
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 28.04.2024
 */
async function salvar() {
    let json={'id':null, 'nome':null, 'sexo':null, 'email':null, 'grupo':null, 'senha':null};
    let id = window.sessionStorage.getItem('idUsuario');
    json.id=id;
    json.nome=jQuery('#id_nome').val();
    json.sexo=jQuery('#id_sexo').val();
    json.email=jQuery('#id_email').val();
    json.grupo=jQuery('#id_grupo').val();
    json.senha=jQuery('#id_senha').val();
    if(validarSenha()) {
        let frase = validarDados(json);
        console.log('Json: ', json);
        if(frase=='') {
            let resposta = await alterarDadosDaTabela('/salvarUsuario', json);
            if(resposta.id) {
                alert('Os dados do usuário foram salvos com sucesso!');
                if(json.grupo=='Cliente') {
                    window.sessionStorage.setItem('idUsuarioCliente', resposta.id);
                    window.sessionStorage.setItem('idCliente', 0);
                    jQuery('#id_div_pagina').html('');
                    jQuery('#id_div_pagina').load('/pages/manager/cliente/cliente_form.html', function(statusTxt, xhr) {
                        if(statusTxt == 'error')
                            alert('Error: ' + xhr.status + ': ' + xhr.statusText);
                    });
                } else
                    window.location='/manager';
            } else
                alert('Os dados do usuário NÃO foram salvos!');
        } else
            alert(frase);
    } else
        alert('O campo senha está diferente do campo confirma senha!');

}

/**
 * @apiNote Função responsável por visualizar os dados do usuário para alteração
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 28.04.2024
 */
function visualizarDados(usuario) {
    jQuery('#id_nome').val(usuario.nome);
    jQuery('#id_email').val(usuario.email);
    if(usuario.grupo) {
        jQuery('#id_grupo').find('option').each(function() {
            if(jQuery(this).val()==usuario.grupo) {
                jQuery(this).prop('selected', true);
            }
        });
    }
    if(usuario.sexo) {
        jQuery('#id_sexo').find('option').each(function() {
            if(jQuery(this).val()==usuario.sexo) {
                jQuery(this).prop('selected', true);
            }
        });
    }
    if(window.sessionStorage.getItem('usuarioGrupo')=='Cliente')
        jQuery('#id_grupo').prop('disabled', 'disabled');
    else
        jQuery('#id_grupo').prop('disabled', false);
}

/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 28.04.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let usuario = await listarDadosDaTabela('/buscarUsuarioPorId', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(usuario.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((usuario!=null) && (usuario.id!=null))
		visualizarDados(usuario);
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 28.04.2024
 */
jQuery(function() {
    let id = window.sessionStorage.getItem('idUsuario');
    if(id!=0)
	    listarDados(id);
    jQuery('#id_btn_salvar').click(function() {
        salvar();
    });
    jQuery('#id_btn_cancelar').click(function() {
        window.location="/manager";
    });
});