/**
 * @apiNote Função responsável por listar os produtos cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 16.04.2024
 */
async function listarDados() {
	jQuery('#id_div_conteudo').html('');
	let json={'id':0, 'nome':null};
	if(jQuery('#id_nome').val()!='')
		json.nome=jQuery('#id_nome').val();

	let lista = await listarDadosDaTabela('http://localhost:8095/listarProduto', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista); //Função presente no arquivo produto_visualiza_dados.js
}

/**
 * @apiNote Função responsável por visualizar a área de busca do produto
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 16.04.2024
 */
function setComboBox() {
	let grupo = window.sessionStorage.getItem('usuarioGrupo');
	jQuery('#id_form_entidade').css('display', 'none');
	jQuery('#id_form_novo_entidade').css('display', 'none');
	jQuery('#id_div_btn_novo').css('display', 'none');
	if(grupo=='Administrador') {
		jQuery('#id_form_entidade').css('display', 'block');
		jQuery('#id_div_btn_novo').css('display', 'block');
		jQuery('#id_form_novo_entidade').css('display', 'block');
	}
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 16.04.2024
 */
jQuery(function() {
	let frase = 'Bem vindo '+window.sessionStorage.getItem('usuarioNome');
	let sexo = window.sessionStorage.getItem('usuarioSexo');
	if(sexo=='F')
		frase = 'Bem vinda '+window.sessionStorage.getItem('usuarioNome');
	jQuery('#id_div_usuario').html(frase);
	setComboBox();
	listarDados();
    
	jQuery('#id_btn_buscar').click( function() {
		listarDados();
	});

	jQuery('#id_btn_novo').click( function() {
		window.sessionStorage.setItem('idProduto', 0);
		jQuery('#id_form_novo_entidade').submit();
	});

	/*$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);　
	});*/
});