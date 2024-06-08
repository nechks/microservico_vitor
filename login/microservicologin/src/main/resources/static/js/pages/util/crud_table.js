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
