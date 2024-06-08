/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 12.04.2024
 */
async function listarDados() {
	let json={'nome': null, 'sexo': null, 'cpf': null};
	if(jQuery('#id_nome').val()!='')
		json.nome=jQuery('#id_nome').val();
	if(jQuery('#id_sexo option:selected').val()!='T')
		json.sexo=jQuery('#id_sexo option:selected').val();
	if(jQuery('#id_cpf').val()!='')
		json.cpf=jQuery('#id_cpf').val();
	jQuery('#id_div_conteudo').html('');
	let lista = await listarDadosDaTabela('/listarCliente', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista); //Função presente no arquivo usuario_visualiza_dados.js
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 06.04.2024 / 15.04.2024
 */
jQuery(function() {
	listarDados();
	jQuery('#id_btn_buscar').click( function() {
		listarDados();
	});
});