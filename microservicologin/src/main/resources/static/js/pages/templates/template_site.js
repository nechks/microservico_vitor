/**
 * @apiNote Javascrip que gerencia as ações realizadas na página template_site.html
 *  
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
*/

/**
 * @apiNote Função responsável pela navegação do site.
 *  
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
*/
function setPagina(titulo) {
	jQuery('#id_div_pagina').html('');
	if(titulo=='Login') {
		jQuery('#id_div_pagina').load('/pages/site/login.html', function(statusTxt, xhr){
	        if(statusTxt == 'error')
	        	jQuery('#id_div_body').html('Error: ' + xhr.status + ': ' + xhr.statusText, tempoAlertaErro);
	    });
	}
}

/**
 * @apiNote Função responsável por inicializar as operações deste JavaScript
 * @returns
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
 */
jQuery(function() {
	setPagina('Login');
});
