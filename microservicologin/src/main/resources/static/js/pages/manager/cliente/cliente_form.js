/**
 * @apiNote Função responsável por validar os dados do cliente
 * @param Json json
 * @returns String frase
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 03.05.2024
 */
function validarDados(json) {
    let frase='';
    if((json.nome==null) || ((json.nome.trim()).length<2))
        frase +='O campo nome não pode está com menos de 2 caracteres!<br>';
    if((json.sexo==null) ||  ((json.sexo.trim()).length==0))
        frase +='O campo sexo não pode está vazio!<br>';
    if((json.cpf==null) ||  ((json.cpf.trim()).length==0))
        frase +='O campo CPF não pode está vazio!<br>';
    return frase;
}

/**
 * @apiNote Função responsável por salvar os dados do cliente
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 03.05.2024
 */
async function salvar() {
    let json={'id':0, 'idUsuario':0, 'nome':null, 'sexo':null, 'cpf':null};
    json.idUsuario=window.sessionStorage.getItem('idUsuarioCliente');
    json.nome=jQuery('#id_nome').val();
    json.sexo=jQuery('#id_sexo option:selected').val();
    json.cpf=jQuery('#id_cpf').val();
    let frase = validarDados(json);
    if(frase=='') {
        let resposta = await alterarDadosDaTabela('/salvarCliente', json);
        if(resposta.id) {
            alert('Os dados do cliente foram salvos com sucesso!');
            jQuery('#id_div_pagina').html('');
            jQuery('#id_div_pagina').load('/pages/manager/cliente/cliente_listar.html', function(statusTxt, xhr) {
                if(statusTxt == 'error')
                    alert('Error: ' + xhr.status + ': ' + xhr.statusText);
            });
        } else
            alert('Os dados do cliente NÃO foram salvos!');
    } else
        alert(frase);
}

/**
 * @apiNote Função responsável por visualizar os dados do cliente para alteração
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 03.05.2024
 */
function visualizarDados(cliente) {
    jQuery('#id_nome').val(cliente[0].nome);
    jQuery('#id_cpf').val(cliente[0].cpf);
    if(cliente[0].sexo) {
        jQuery('#id_sexo').find('option').each(function() {
            if(jQuery(this).val()==cliente[0].sexo) {
                jQuery(this).prop('selected', true);
            }
        });
    }
}

/**
 * @apiNote Função responsável por listar os clientes cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 03.05.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let cliente = await listarDadosDaTabela('/buscarClientePorId', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(cliente.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((cliente!=null) && (cliente[0].id!=null)) {
		visualizarDados(cliente);
    }
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 28.04.2024
 */
jQuery(function() {
    let id = window.sessionStorage.getItem('idCliente');
    //alert('idCliente: '+window.sessionStorage.getItem('idCliente'));
    jQuery('#id_btn_cancelar').prop("disabled",true);
    if(id!=0) {
        jQuery('#id_btn_cancelar').prop("disabled",false);
	    listarDados(id);
    }
    jQuery('#id_btn_salvar').click(function() {
        salvar();
    });
    jQuery('#id_btn_cancelar').click(function() {
        window.sessionStorage.setItem('idCliente', 0);
        window.sessionStorage.setItem('idUsuarioCliente', 0);
        jQuery('#id_div_pagina').html('');
        jQuery('#id_div_pagina').load('/pages/manager/cliente/cliente_listar.html', function(statusTxt, xhr) {
            if(statusTxt == 'error')
                alert('Error: ' + xhr.status + ': ' + xhr.statusText);
        });
    });
});