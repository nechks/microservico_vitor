/**
 * @apiNote Função responsável por validar os dados do usuário
 * @param Json json
 * @returns String frase
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 15.04.2024
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
    if((json.senha==null) ||  ((json.senha.trim()).length==0))
        frase +='O campo senha não pode está vazio!<br>';
    return frase;
}

/**
 * @apiNote Função responsável por verificar se a senha é igual a confirma senha
 * @returns boolean
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 15.04.2024
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
 * @Data Criação 15.04.2024
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
        if(frase=='') {
            let resposta = await alterarDadosDaTabela('/salarUsuario', json);
            if(resposta.id) {
                alert('Os dados do usuário foram salvos com sucesso!');
                window.location='/usuario';
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
 * @Data Criação 15.04.2024
 */
function visualizarDados(lista) {
    if(lista.length>0) {
        jQuery('#id_nome').val(lista[0].nome);
        jQuery('#id_email').val(lista[0].email);
        jQuery('#id_senha').val(lista[0].senha);
        jQuery('#id_confirma_senha').val(lista[0].senha);
        if(lista[0].grupo) {
            jQuery('#id_grupo').find('option').each(function() {
                if(jQuery(this).val()==lista[0].grupo) {
                    jQuery(this).prop('selected', true);
                }
            });
        }
        if(lista[0].sexo) {
            jQuery('#id_sexo').find('option').each(function() {
                if(jQuery(this).val()==lista[0].sexo) {
                    jQuery(this).prop('selected', true);
                }
            });
        }
    }
}

/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 12.04.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let lista = await listarDadosDaTabela('/getUsuarioId', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista);
}

/**
 * @apiNote Função responsável por visualizar a área de busca do usuário
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 15.04.2024
 */
function setComboBox() {
	let html='';
	let grupo = window.sessionStorage.getItem('usuarioGrupo');
	jQuery('#id_grupo').html('');
    jQuery('#id_sexo').html('');
	jQuery('#id_form_entidade').css('display', 'none');
	jQuery('#id_div_btn_novo').css('display', 'none');
	if(grupo=='Administrador') {
		html += '<option value="Todos" selected>Todos</option>';
		html += '<option value="Administrador">Administrador</option>';
		html += '<option value="Cliente">Cliente</option>';
	} else
        html += '<option value="Cliente">Cliente</option>';
    jQuery('#id_grupo').html(html);
    html='';
    html += '<option value="F" selected>Feminino</option>';
    html += '<option value="M" selected>Masculino</option>';
    jQuery('#id_sexo').html(html);
    jQuery('#id_form_entidade').css('display', 'block');
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 15.04.2024
 */
jQuery(function() {
	let frase = 'Bem vindo '+window.sessionStorage.getItem('usuarioNome');
	let sexo = window.sessionStorage.getItem('usuarioSexo');
    let id = window.sessionStorage.getItem('idUsuario');
	if(sexo=='F')
		frase = 'Bem vinda '+window.sessionStorage.getItem('usuarioNome');
	jQuery('#id_div_usuario').html(frase);
	setComboBox();
    if(id!=0)
	    listarDados(id);
    jQuery('#id_btn_salvar').click(function() {
        salvar();
    });
    jQuery('#id_btn_voltar').click(function() {
        window.location="/usuario";
    });
	/*$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);　
	});*/
});