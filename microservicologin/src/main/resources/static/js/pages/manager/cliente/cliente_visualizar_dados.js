/**
 * @apiNote Função responsável por inserir os dados na tabela de visualização da listagem dos usuários
 * @param lista
 *
 * @author Vito Rodrigues Franzosi
 * @Data Criação: 12.04.2024
 */
function visualizarDados(lista) {
	let indice=0, html='';
    if(window.sessionStorage.getItem('usuarioGrupo')=='Cliente')
        jQuery('#id_div_pesquisa').css('display', 'nome');
    else
        jQuery('#id_div_pesquisa').css('display', 'block');
    jQuery('#id_div_conteudo').html('');
    html += '<div class="row bg-info py-2 rounded-top-3 mt-1">';
        html += '<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 text-left text-uppercase fw-bold titulo-coluna-medio">Nome</div>';
        html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center text-uppercase fw-bold titulo-coluna-medio">Sexo</div>';
        html += '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center text-uppercase fw-bold titulo-coluna-medio">CPF</div>';
        html += '<div class="col-12 col-sm-12x col-md-1 col-lg-1 col-xl-1 text-center text-uppercase fw-bold titulo-coluna-medio">Editar</div>';
        html += '<div class="col-12 col-sm-12x col-md-1 col-lg-1 col-xl-1 text-center text-uppercase fw-bold titulo-coluna-medio">Excluir</div>';
    html += '</div>';
    html += '<div class="row">';
        html += '<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">';
            while(indice<lista.length) {
                if(indice%2==0)
                    cor='row-background-par';
                else
                    cor='row-background-impar';
                html += '<div class="row '+cor+'" id="id_row_'+indice+'">'
                    html += '<div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 text-left"><span class="align-middle titulo-coluna-medio text-uppercase">'+(lista[indice].nome ? lista[indice].nome : '')+'</span></div>';
                    html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center"><span class="align-middle titulo-coluna-medio">'+(lista[indice].sexo ? lista[indice].sexo : '')+'</span></div>';
                    html += '<div class="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center"><span class="align-middle titulo-coluna-medio">'+(lista[indice].cpf ? lista[indice].cpf : '')+'</span></div>';
                    html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">';
                        html += '<button type="button" class="btn objeto-ativo-inativo btn-editar p-0" id="editar-'+indice+'">';
                        html += '<i class="fa fa-pencil-square btn-icone-edit"></i>';
                        html += '</button>';
                    html += '</div>';
                    if(window.sessionStorage.getItem('usuarioGrupo')=='Cliente') {
                        html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">';
                            html += '<button type="button" class="btn objeto-ativo-inativo p-0">';
                            html += '<i class="fa fa-trash true btn-icone-disabled"></i>';
                            html += '</button>';
                        html += '</div>';
                    } else {
                        html += '<div class="col-sm-12 col-md-1 col-lg-1 col-xl-1 text-center">';
                            html += '<button type="button" class="btn objeto-ativo-inativo btn-excluir p-0" id="excluir-'+indice+'">';
                            html += '<i class="fa fa-trash true btn-icone-del"></i>';
                            html += '</button>';
                        html += '</div>';
                    }
                html += '</div>';
                indice++;
            }
        html += '</div>';
    html += '</div>';
    jQuery('#id_div_conteudo').html(html);
    jQuery('.btn-editar').click(function() {
		let objeto = jQuery(this);
		let indice = objeto.attr('id');
        indice = indice.substring(7, indice.lengtht);
        window.sessionStorage.setItem('idCliente', lista[indice].id);
		jQuery('#id_div_pagina').html('');
		jQuery('#id_div_pagina').load('/pages/manager/cliente/cliente_form.html', function(statusTxt, xhr) {
	        if(statusTxt == 'error')
	        	alert('Error: ' + xhr.status + ': ' + xhr.statusText);
        });
    });
    jQuery('.btn-excluir').click(function() {
		let objeto = jQuery(this);
		let indice = objeto.attr('id');
        indice = indice.substring(8, indice.lengtht);
        let resultado = confirm("Deseja excluir o cliente: " + lista[indice].nome + " ?");
        if(resultado) {
            excluirCliente(lista, indice);
        }
    });
}

async function excluirCliente(lista, indice) {
    let json = {'id':lista[indice].id, 'nome': lista[indice].nome};
    await excluir(json, lista, indice, 'excluirCliente', 'do CLIENTE'); //Função presente no arquivo /js/pages/util/crud_table.js 
}