/**
 * @apiNote Função responsável por inserir, alterar e excluir uma linha da tabela passada.
 * @param url
 * @param json
 * @returns boolean
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 12.04.2024
 */
async function alterarDadosDaTabela(url, json) {
	let resposta = await $.ajax({
							type : 'POST',
							url : url,
							data : json,
							dataType : 'json',
						}).done(function() {
	      					setTimeout(function(){
	        					$("#overlay").fadeOut(300);
	      					},500);
      					});
	if(resposta.id)
		return {'resposta':'sucesso', 'mensagem':'', 'sinal':true, 'id':resposta.id};
	else {
		setTimeout(function(){
        	$("#overlay").fadeOut(300);
      	},500)
		return {'resposta':resposta.resposta, 'mensagem':resposta.mensagem, 'sinal':false};
	}
}

/**
 * @apiNote Função responsável por listar os dados de uma tabela.
 * @param url
 * @param json
 * @returns boolean
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 12.04.2024
 */
async function listarDadosDaTabela(url, json) {
	return await $.ajax({
						type : 'POST',
						url : url,
						data : json,
						dataType : 'json',
						success : function(result) {
							return result;
						},
						error : function(jqXHR) {
							setTimeout(function(){
        						$("#overlay").fadeOut(300);
      						},500);
							return jqXHR;
						}
					}).done(function() {
      					setTimeout(function(){
        					$("#overlay").fadeOut(300);
      					},500);
      				});
}

/**
 * @apiNote Função responsável por deslogar o usuário e sair do sistema.
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 15.04.2024
 */
function sair() {
	$.ajax ({
		type : 'GET',
		url : '/sair',
		success : function(result) {},
		error : function(jqXHR) {}
	});
}

/**
 * @apiNote Função resposável por excluir os dados da entidade
 * @param json
 * @param lista
 * @param indice
 * @param url
 * @param entidade
 * @returns
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 29.04.2024
 */
async function excluir(json, lista, indice, url, entidade) {
	let tamanho = lista.length;
	let resultado = await alterarDadosDaTabela(url, json); //Função presente no arquivo alterar_objeto.js em static/js/pages/util/
	if(resultado.sinal) {
		removeDiv(lista, indice);
		if(tamanho==1)
			jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center text-uppercase fw-bold">A lista está vazia!</div>');
		else
			alert('Os dados '+entidade+' '+json.nome.toUpperCase()+' foram EXCLUÍDOS com sucesso.');
	} else
	alert('Os dados '+entidade+' '+json.nome.toUpperCase()+' NÃO foram excluídos.');
}

/**
 * @apiNote Função resposável por remover a div da listagem e os dados da lista de indice
 * @param lista
 * @param indice
 * @returns
 *
 * @author  Vito Rodrigues Franzosi
 * @Data de Criação 29.04.2024
 */
function removeDiv(lista, indice) {
	jQuery('#id_div_conteudo').find('div').each(function(){
        if($(this).attr('id')=='id_row_'+indice) {
            $(this).remove();
            lista.splice(indice, 1);
        }
    });
}