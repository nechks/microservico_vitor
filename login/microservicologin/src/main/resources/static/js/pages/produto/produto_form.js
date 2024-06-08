/**
 * @apiNote Função responsável por validar os dados do produto
 * @param Json json
 * @returns String frase
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 16.04.2024
 */
function validarDados(json) {
    let frase='';
    if((json.nome==null) || ((json.nome.trim()).length<2))
        frase +='O campo nome não pode está com menos de 2 caracteres!<br>';
    if((json.preco==null) ||  ((json.preco.trim()).length==0))
        frase +='O campo preço não pode está vazio!<br>';
    return frase;
}

/**
 * @apiNote Função responsável por salvar os dados do produto
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 16.04.2024
 */
async function salvar() {
    let json={'id':null, 'nome':null, 'preco':null};
    let id = window.sessionStorage.getItem('idUsuario');
    json.id=id;
    json.nome=jQuery('#id_nome').val();
    json.sexo=jQuery('#id_preco').val();
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
}

/**
 * @apiNote Função responsável por visualizar os dados do produto para alteração
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 16.04.2024
 */
function visualizarDados(lista) {
    if(lista.length>0) {
        jQuery('#id_nome').val(lista[0].nome);
        jQuery('#id_preco').val(lista[0].preco);
    }
}

/**
 * @apiNote Função responsável por buscar o produto cadastrado
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 16.04.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let lista = await listarDadosDaTabela('/getProdutoId', json); //Função presente no arquivo static/js/pages/util/listarDadosDaTabela.js
	if(lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((lista.length>0) && (lista[0].id!=0))
		visualizarDados(lista);
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
	if(grupo=='Administrador') {
        jQuery('#id_form_entidade').css('display', 'block');
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
    let id = window.sessionStorage.getItem('idProduto');
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
        window.location="/produto";
    });
	/*$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);　
	});*/
});