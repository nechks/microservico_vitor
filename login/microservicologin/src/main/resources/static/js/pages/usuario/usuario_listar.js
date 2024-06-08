/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 12.04.2024
 */
async function listarDados() {
	jQuery('#id_div_conteudo').html('');
	let json={'id':0, 'nome':null, 'email':null, 'grupo':null};
	if(jQuery('#id_nome').val()!='')
		json.nome=jQuery('#id_nome').val();
	if(jQuery('#id_email').val()!='')
		json.email=jQuery('#id_email').val();
	if(jQuery('#id_grupo').val()!='')
		json.grupo=jQuery('#id_grupo').val();

	let lista = await listarDadosDaTabela('/listarUsuario', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista); //Função presente no arquivo usuario_visualiza_dados.js
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
	jQuery('#id_form_entidade').css('display', 'none');
	jQuery('#id_form_novo_entidade').css('display', 'none');
	jQuery('#id_div_btn_novo').css('display', 'none');
	if(grupo=='Administrador') {
		html += '<option value="Todos" selected>Todos</option>';
		html += '<option value="Administrador">Administrador</option>';
		html += '<option value="Cliente">Cliente</option>';
		jQuery('#id_grupo').html(html);
		jQuery('#id_form_entidade').css('display', 'block');
		jQuery('#id_div_btn_novo').css('display', 'block');
		jQuery('#id_form_novo_entidade').css('display', 'block');
	}
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 06.04.2024 / 15.04.2024
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
		window.sessionStorage.setItem('idUsuario', 0);
		jQuery('#id_form_novo_entidade').submit();
	});

	/*$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);　
	});*/
});