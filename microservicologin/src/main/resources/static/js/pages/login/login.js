/**
 * @apiNote Função responsável por realizar o login no sistema
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
 */
async function login() {
	if (jQuery('#id_email').val().trim() == '' || jQuery('#id_senha').val().trim() == '') {
		alert('É necessário preencher os campos de E-MAIL e SENHA antes de continuar.');
	} else {
		let json = { 'email': jQuery('#id_email').val(), 'senha': jQuery('#id_senha').val() };
		await $.ajax({
			type: 'POST',
			url: '/login',
			data: json,
			dataType: 'json',
			success: function(result) {
				window.sessionStorage.setItem('usuarioId', result.id);
				window.sessionStorage.setItem('usuarioNome', result.nome);
				window.sessionStorage.setItem('usuarioSexo', result.sexo);
				window.sessionStorage.setItem('usuarioGrupo', result.grupo);
                window.location.href = '/manager';
			},
			error: function() {
				alert('ERRO DE AUTENTICAÇÃO: Usuário e/ou senha incorreta!');
			}
		});
	}
}

/**
 * @apiNote Função responsável por inicialiar esta arquivo
 * @returns
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 25.04.2024
 */
jQuery(function() {
	$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);
	});
});