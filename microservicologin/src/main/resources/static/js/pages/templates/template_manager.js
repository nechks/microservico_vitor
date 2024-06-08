/**
 * @apiNote Javascrip que gerencia as ações realizadas na página template_site.html
 *  
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 27.04.2024
*/

/**
 * @apiNote Função responsável pela navegação do site.
 *  
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 27.04.2024
*/
function setPagina(titulo) {
	jQuery('#id_div_pagina').html('');
	if(titulo=='Cliente') {
		jQuery('#id_div_pagina').load('/pages/manager/cliente/cliente_listar.html', function(statusTxt, xhr){
		//jQuery('#id_div_pagina').load('/pages/manager/pagina_em_construcao.html', function(statusTxt, xhr){
	        if(statusTxt == 'error')
	        	jQuery('#id_div_body').html('Error: ' + xhr.status + ': ' + xhr.statusText, tempoAlertaErro);
	    });

	} else if(titulo=='Produto') {
		//jQuery('#id_div_pagina').load('/pages/manager/produto/produto_listar.html', function(statusTxt, xhr){
		jQuery('#id_div_pagina').load('/pages/manager/pagina_em_construcao.html', function(statusTxt, xhr){
	        if(statusTxt == 'error')
	        	jQuery('#id_div_body').html('Error: ' + xhr.status + ': ' + xhr.statusText, tempoAlertaErro);
	    });
	} else if(titulo=='Usuário') {
		jQuery('#id_div_pagina').load('/pages/manager/usuario/usuario_listar.html', function(statusTxt, xhr){
	        if(statusTxt == 'error')
	        	jQuery('#id_div_body').html('Error: ' + xhr.status + ': ' + xhr.statusText, tempoAlertaErro);
	    });
	} else if(titulo=='Sair') {
		window.sessionStorage.clear();
		$.ajax({
			type : 'GET',
			url : 'sair'
		});
		window.location.href='/';
	}
}

/**
 * @apiNote Função responsável por inicializar as operações deste JavaScript
 * @returns
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 27.04.2024
 */
jQuery(function() {
	let frase = 'Bem vindo '+window.sessionStorage.getItem('usuarioNome');
	let sexo = window.sessionStorage.getItem('usuarioSexo');
	let pagina='Usuário';
	if(sexo=='F')
		frase = 'Bem vinda '+window.sessionStorage.getItem('usuarioNome');
	jQuery('#id_div_usuario').html(frase);
	setPagina(pagina);
});
